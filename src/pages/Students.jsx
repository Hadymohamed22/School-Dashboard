import { FaPlus } from "react-icons/fa";
import SearchBox from "../components/SearchBox";
import HeaderLayout from "../layouts/HeaderLayout";
import StudentNamePhoto from "../components/StudentNamePhoto";
import { HiOutlinePhone } from "react-icons/hi";
import StudentClass from "../components/StudentClass";
import printStudentInfo from "../utils/printStudentInfo";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addStudent,
  deleteStudent,
  fetchStudents,
} from "../store/slices/studentsSlice";
import { handleNextPage } from "../utils/handleNextPage";
import { handlePrevPage } from "../utils/handlePrevPage";
import { IoCloseCircle } from "react-icons/io5";
import { handleSubmitStudentForm } from "../utils/handleSubmitStudentForm";

function Students() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStudentsPage, setCurrentStudentsPage] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { students, status } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState({
    name: "",
    image: "",
    studentID: "",
    parent: "",
    city: "",
    phone: "",
    email: "",
    grade: "",
    "owes-amount": "",
  });
  const monthNumbers = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const studentsPerPage = 10;
  const lastStudentIndex = currentStudentsPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;
  const displayedData = filteredStudents.slice(
    firstStudentIndex,
    lastStudentIndex
  );
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };
  const totalStudentsPage = Math.ceil(
    filteredStudents.length / studentsPerPage
  );
  const studentsPageNumbers = Array.from(
    { length: totalStudentsPage },
    (_, i) => i + 1
  );

  useEffect(() => {
    if (status === "idle") {
      console.log("Dispatch Fetch Students....");
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (students.length) {
      setFilteredStudents(students);
    }
  }, [students]);
  return (
    <div className="students-page relative">
      <HeaderLayout title="Students" />
      <div className="search-addStudent my-2 md:my-8 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between">
        <SearchBox data={students} setFilteredData={setFilteredStudents} />
        <div
          className="add-new-student py-2 md:py-3 px-5 md:px-6 rounded-full flex items-center gap-2 bg-main text-white text-sm md:text-base transition duration-300 hover:bg-mainHover hover:shadow-lg"
          role="button"
          aria-label="add new student button"
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          <FaPlus />
          <span>New Student</span>
        </div>
      </div>
      <div className="students-content bg-white rounded-xl md:rounded-3xl my-8 pb-5">
        <div className="students-container overflow-x-auto w-full max-w-full">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr>
                <th className="text-start">Name</th>
                <th>ID</th>
                <th>Date</th>
                <th>Parent Name</th>
                <th>City</th>
                <th>Contact</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((e) => {
                return (
                  <tr className="student-row" key={e.id}>
                    <td>
                      <StudentNamePhoto
                        studentName={e.name}
                        studentImage={e.image}
                      />
                    </td>
                    <td className="text-sm md:text-base">{e.studentID}</td>
                    <td className="text-[#A098AE] text-xs md:text-sm">
                      {`${monthNumbers[e["join-date"].slice(5, 7)]} ${e[
                        "join-date"
                      ].slice(8, e["join-date"].indexOf("T"))}, ${e[
                        "join-date"
                      ].slice(0, 4)}`}
                    </td>
                    <td className="text-xs md:text-sm">{e.parent}</td>
                    <td className="text-xs md:text-sm ">{e.city}</td>
                    <td>
                      <div className="contact-info flex gap-1 justify-center items-center">
                        <a
                          className="telephone w-8 h-8 md:w-9 md:h-9 rounded-full bg-main/20 flex items-center justify-center text-main text-lg md:text-xl cursor-pointer transition duration-300 hover:bg-main/100 hover:text-white"
                          href={`https://wa.me/${e.phone}`}
                          target="_blank"
                        >
                          <HiOutlinePhone />
                        </a>
                        <a
                          className="email w-8 h-8 md:w-9 md:h-9 rounded-full bg-main/20 flex items-center justify-center text-main text-lg md:text-xl cursor-pointer transition duration-300 hover:bg-main/100 hover:text-white"
                          href={`mailto:${e.email}`}
                          target="_blank"
                        >
                          <HiOutlineEnvelope />
                        </a>
                      </div>
                    </td>
                    <td>
                      <StudentClass
                        classGrade={
                          e.grade == "1"
                            ? "VI"
                            : e.grade == "2"
                            ? "VII"
                            : e.grade == "3" && "VIII"
                        }
                        grade={e.grade}
                      />
                    </td>
                    <td>
                      <div className="actions flex gap-3 items-center justify-center">
                        <div
                          className="print"
                          onClick={(e) => {
                            printStudentInfo(e.currentTarget);
                          }}
                        >
                          <BsPrinter className="text-[#A098AE] transition duration-300 hover:text-main text-lg md:text-2xl cursor-pointer" />
                        </div>
                        <div
                          className="trash"
                          onClick={() => {
                            dispatch(deleteStudent(e.id));
                          }}
                        >
                          <FaRegTrashCan className="text-[#A098AE] transition duration-300 hover:text-red-600 text-lg md:text-2xl cursor-pointer" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="students-pages-num-container flex justify-end items-center mt-5">
          <div className="nums-arrows flex items-center gap-1">
            <div
              className="left-arrow cursor-pointer transition duration-300 hover:scale-150"
              onClick={() => {
                handlePrevPage(
                  currentStudentsPage,
                  setCurrentStudentsPage,
                  totalStudentsPage
                );
              }}
            >
              <IoMdArrowDropleft className="text-base md:text-lg lg:text-xl" />
            </div>
            <div className="num-boxs flex gap-2 items-center">
              {studentsPageNumbers.map((e) => {
                return (
                  <div
                    className={`num-box flex justify-center items-center w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-xs md:text-sm lg:text-base rounded-full border-2 border-[#A098AE] text-[#A098AE] transition duration-300 hover:bg-main/30 hover:border-main/30 hover:text-white ${
                      e == currentStudentsPage ? "active" : ""
                    }`}
                    key={e}
                    onClick={() => {
                      setCurrentStudentsPage(e);
                    }}
                  >
                    {e}
                  </div>
                );
              })}
            </div>
            <div
              className="right-arrow cursor-pointer transition duration-300 hover:scale-150"
              onClick={() => {
                handleNextPage(
                  currentStudentsPage,
                  setCurrentStudentsPage,
                  totalStudentsPage
                );
              }}
            >
              <IoMdArrowDropright className="text-base md:text-lg lg:text-xl" />
            </div>
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
            handleSubmitStudentForm(
              studentData,
              setIsFormOpen,
              addStudent,
              dispatch
            );
          }}
          className="w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-2"
        >
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student name"
            placeholder="Student Name"
            name="name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student image"
            placeholder="Student Image"
            name="image"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student ID"
            placeholder="Student ID"
            name="studentID"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student parent name"
            placeholder="Student Parent Name"
            name="parent"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student city name"
            placeholder="Student City Name"
            name="city"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student phone number"
            placeholder="Student Phone Number"
            name="phone"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="student email"
            placeholder="Student Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            min="1"
            max="3"
            aria-label="student grade"
            placeholder="Student Grade : 1 to 3"
            name="grade"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-lg focus:outline-none bg-white/20 text-main placeholder:text-main/65 backdrop-blur"
            aria-label="owes amount"
            placeholder="Owes Amount"
            name="owes-amount"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 border-2 border-[#4d44b5] rounded-full focus:outline-none bg-main text-white mt-3 transition duration-300 hover:bg-mainHover"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Students;
