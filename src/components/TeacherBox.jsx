import { useState } from "react";
import { HiOutlinePhone, HiOutlineTrash } from "react-icons/hi";
import { SlEnvolope } from "react-icons/sl";
import { BsPencilSquare } from "react-icons/bs";
import { deleteTeacher } from "../store/slices/teachersSlice";
import { useDispatch } from "react-redux";

function TeacherBox({
  teacher,
  setIsFormOpen,
  setIsEditMode,
  setTeacherData,
  setEditingTeacherID,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="teacher-box rounded-3xl py-4 md:p-5 bg-white shadow-md flex flex-col items-center relative transition duration-300 hover:translate-y-[-6px]">
      <img
        src={teacher.image}
        alt="teacher profile photo"
        className="w-24 lg:w-20 h-24 lg:h-20 rounded-full border-2 border-main"
      />
      <h4 className="teacher-name text-base md:text-lg lg:text-xl font-bold my-3 text-center">
        {teacher.name}
      </h4>
      <p className="teacher-jobTitle text-secondary text-xs md:text-sm text-center">
        {teacher["job-title"]}
      </p>
      <div className="contact-info flex gap-1 justify-center items-center mt-4">
        <a
          className="telephone w-8 h-8 md:w-9 md:h-9 rounded-full bg-main flex items-center justify-center text-white text-lg md:text-xl transition duration-300 hover:bg-white hover:text-main border border-main"
          href={`https://wa.me/${teacher.phone}`}
          target="_blank"
        >
          <HiOutlinePhone />
        </a>
        <a
          className="email w-8 h-8 md:w-9 md:h-9 rounded-full bg-main flex items-center justify-center text-white text-lg md:text-xl transition duration-300 hover:bg-white hover:text-main border border-main"
          href={`mailto:${teacher.email}`}
          target="_blank"
        >
          <SlEnvolope />
        </a>
        <div className="teacher-actions absolute top-4 right-5 cursor-pointer">
          <div
            className="gap-1 items-center open-icon"
            style={{ display: isOpen ? "none" : "flex" }}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <span className="block w-1 h-1 rounded-full bg-secondary"></span>
            <span className="block w-1 h-1 rounded-full bg-secondary"></span>
            <span className="block w-1 h-1 rounded-full bg-secondary"></span>
          </div>
          <div
            className="close-icon hidden"
            style={{ display: isOpen ? "block" : "none" }}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <span className="block w-5 h-[2px] bg-secondary rotate-[47deg] translate-x-[2px] translate-y-[1px]"></span>
            <span className="block w-5 h-[2px] bg-secondary rotate-[-44deg] translate-x-[1px] translate-y-[-1px]"></span>
          </div>
          <ul
            className={`${
              isOpen ? "appear" : ""
            } actions rounded-xl bg-main border overflow-hidden absolute z-50 right-[-10px] top-4 text-white`}
          >
            <li
              className="flex items-center gap-1 transition duration-300 hover:bg-white hover:text-main py-1 px-3"
              onClick={() => {
                setIsFormOpen(true);
                setTeacherData({
                  name: teacher.name,
                  image: teacher.image,
                  phone: teacher.phone,
                  email: teacher.email,
                  "job-title": teacher["job-title"],
                });
                setIsEditMode(true);
                setEditingTeacherID(teacher.id);
              }}
            >
              <span className="text-sm">
                <BsPencilSquare />
              </span>
              <span className="text-xs md:text-sm">Edit</span>
            </li>
            <li
              className="flex items-center gap-1 transition duration-300 hover:bg-red-500 hover:text-white py-1 px-3"
              onClick={() => {
                dispatch(deleteTeacher(teacher.id));
              }}
            >
              <span>
                <HiOutlineTrash />
              </span>
              <span className="text-xs md:text-sm">Delete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeacherBox;
