import { FaPlus } from "react-icons/fa";
import SearchBox from "../components/SearchBox";
import HeaderLayout from "../layouts/HeaderLayout";
import TeacherBox from "../components/TeacherBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addTeacher,
  fetchTeachers,
  updateTeacher,
} from "../store/slices/teachersSlice";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { handlePrevPage } from "../utils/handlePrevPage";
import { handleNextPage } from "../utils/handleNextPage";
import { handleSubmitStudentForm } from "../utils/handleSubmitStudentForm";
import { IoCloseCircle } from "react-icons/io5";

function Teachers() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [editingTeacherID, setEditingTeacherID] = useState(null);
  const { teachers, status } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const [currentTeachersPages, setCurrentTeachersPages] = useState(1);
  const [teacherData, setTeacherData] = useState({
    name: "",
    image: "",
    phone: "",
    email: "",
    "job-title": "",
  });

  const teachersPerPage = 12;
  const lastTeacherIndex = currentTeachersPages * teachersPerPage;
  const firstTeacherIndex = lastTeacherIndex - teachersPerPage;
  const displayedTeachers = filteredTeachers.slice(
    firstTeacherIndex,
    lastTeacherIndex
  );

  const totalTeachersPage = Math.ceil(
    filteredTeachers.length / teachersPerPage
  );
  const teacherPageNumbers = Array.from(
    { length: totalTeachersPage },
    (_, i) => i + 1
  );

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (status === "idle") {
      console.log("dispatch Fetch Teachers....");
      dispatch(fetchTeachers());
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (teachers.length) {
      setFilteredTeachers(teachers);
    }
  }, [teachers]);
  return (
    <div className="teachers-page relative">
      <HeaderLayout title="Teachers" />
      <div className="search-addTeacher my-2 md:my-8 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between">
        <SearchBox data={teachers} setFilteredData={setFilteredTeachers} />
        <div
          className="add-new-teacher py-2 md:py-3 px-5 md:px-6 rounded-full flex items-center gap-2 bg-main text-white text-sm md:text-base transition duration-300 hover:bg-mainHover hover:shadow-lg"
          role="button"
          aria-label="add new teacher button"
          onClick={() => {
            setIsFormOpen(true);
            setTeacherData({
              name: "",
              image: "",
              phone: "",
              email: "",
              "job-title": "",
            });
            setIsEditMode(false);
          }}
        >
          <FaPlus />
          <span>New Teacher</span>
        </div>
      </div>
      <div className="teachers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-7">
        {status === "loading" && (
          <h3 className="text-main text-2xl md:text-3xl lg:text-4xl p-3 font-bold animate-pulse">
            Loading
          </h3>
        )}
        {displayedTeachers.map((e) => {
          return (
            <TeacherBox
              key={e.id}
              teacher={e}
              setIsFormOpen={setIsFormOpen}
              setIsEditMode={setIsEditMode}
              setTeacherData={setTeacherData}
              setEditingTeacherID={setEditingTeacherID}
            />
          );
        })}
      </div>
      <div className="teachers-pages-num-container flex justify-end items-center my-7">
        <div className="nums-arrows flex items-center gap-1">
          <div
            className="left-arrow cursor-pointer transition duration-300 hover:scale-150"
            onClick={() => {
              handlePrevPage(
                currentTeachersPages,
                setCurrentTeachersPages,
                totalTeachersPage
              );
            }}
          >
            <IoMdArrowDropleft className="text-base md:text-lg lg:text-xl" />
          </div>
          <div className="num-boxs flex gap-2 items-center">
            {teacherPageNumbers.map((num) => {
              return (
                <div
                  className={`num-box flex justify-center items-center w-7 h-7 md:w-8 md:h-8 text-sm md:text-base rounded-full border-2 border-[#A098AE] text-[#A098AE] transition duration-300 hover:bg-main/30 hover:border-main/30 hover:text-white ${
                    num == currentTeachersPages ? "active" : ""
                  }`}
                  key={num}
                  onClick={() => {
                    setCurrentTeachersPages(num);
                  }}
                >
                  {num}
                </div>
              );
            })}
          </div>
          <div
            className="right-arrow cursor-pointer transition duration-300 hover:scale-150"
            onClick={() => {
              handleNextPage(
                currentTeachersPages,
                setCurrentTeachersPages,
                totalTeachersPage
              );
            }}
          >
            <IoMdArrowDropright className="text-base md:text-lg lg:text-xl" />
          </div>
        </div>
      </div>
      <div
        className={`${
          isFormOpen ? "open" : ""
        } add-student-form fixed top-0 left-0 w-full h-screen elements-center-center bg-black/10 backdrop-blur-sm z-50`}
      >
        <div
          className="close-form-icon absolute top-4 right-4 cursor-pointer"
          onClick={() => {
            setIsFormOpen(false);
          }}
        >
          <IoCloseCircle className="text-main text-3xl md:text-4xl transition duration-300 hover:text-mainHover" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isEditMode) {
              dispatch(
                updateTeacher({
                  updatedData: teacherData,
                  id: editingTeacherID,
                })
              );
              setIsEditMode(false);
              setIsFormOpen(false);
            } else {
              handleSubmitStudentForm(
                teacherData,
                setIsFormOpen,
                addTeacher,
                dispatch
              );
            }
          }}
          className="w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-2"
        >
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="teacher name"
            placeholder="Teacher Name"
            name="name"
            value={teacherData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="job title"
            placeholder="Job Title"
            name="job-title"
            value={teacherData["job-title"]}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="teacher image"
            placeholder="Teacher Image"
            name="image"
            value={teacherData.image}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="teacher phone number"
            placeholder="Teacher Phone Number"
            name="phone"
            value={teacherData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="teacher email"
            placeholder="Teacher Email"
            name="email"
            value={teacherData.email}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-full focus:outline-none bg-main text-white mt-3 transition duration-300 hover:bg-mainHover"
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Teachers;
