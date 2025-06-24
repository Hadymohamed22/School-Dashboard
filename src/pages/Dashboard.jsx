import StatisticBox from "../components/StatisticBox";
import HeaderLayout from "../layouts/HeaderLayout";
import Chart from "react-apexcharts";
import "apexcharts/dist/apexcharts.css";
import BoxTitle from "../components/BoxTitle";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";
import StudentNamePhoto from "../components/StudentNamePhoto";
import renderDaysInTable from "../utils/renderDaysInTable";
import getPrevMonth from "../utils/getPrevMonth";
import getNextMonth from "../utils/getNextMonth";
import {
  performanceChartOptions,
  performanceChartSeries,
} from "../constants/preformanceChart";
import {
  financeChartOptions,
  financeChartSeries,
} from "../constants/financeChart";
import printStudentInfo from "../utils/printStudentInfo";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import StudentClass from "../components/StudentClass";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../store/slices/studentsSlice";
import { handlePrevPage } from "../utils/handlePrevPage";
import { handleNextPage } from "../utils/handleNextPage";

function Dashboard() {
  const [daysMatrix, setDaysMatrix] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentStudentsPage, setCurrentStudentsPage] = useState(1);
  const dispatch = useDispatch();
  const { students, status } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const monthAndYear = useRef(null);
  const prevMonth = useRef(null);
  const nextMonth = useRef(null);

  const studentsPerPage = 5;
  const lastStudentIndex = currentStudentsPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;
  const currentStudents = students.slice(firstStudentIndex, lastStudentIndex);

  const totalStudentsPage = Math.ceil(students.length / studentsPerPage);
  const studentsPageNumbers = Array.from(
    { length: totalStudentsPage },
    (_, i) => i + 1
  );
  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = currentDate.getFullYear(),
      month = months[currentDate.getMonth()];
    monthAndYear.current.innerHTML = `${month + " " + year}`;
    renderDaysInTable(currentDate, setDaysMatrix);
  }, [currentDate]);

  useEffect(() => {
    if (status === "idle") {
      console.log("dispatch FetchStudents....");
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  return (
    <div className="dashboard-page">
      <HeaderLayout title="Dashboard" />
      <div className="statistics bg-white rounded-xl md:rounded-3xl p-7 md:p-8 lg:p-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5">
        <StatisticBox
          iconText="student"
          title="Students"
          num={students.length}
        />
        <StatisticBox
          iconText="teacher"
          title="Teachers"
          num={teachers.length}
        />
        <StatisticBox iconText="calendar" title="Events" num="40" />
        <StatisticBox iconText="eat" title="Foods" num="32K" />
      </div>
      <div className="school-performance px-0 py-7 md:p-8 lg:p-9 bg-white rounded-xl md:rounded-3xl my-8">
        <header className="flex flex-col md:flex-row gap-y-3 justify-between items-center">
          <BoxTitle title="School Performance" />
          <div className="info flex items-center gap-5 md:gap-6 lg:gap-7">
            <div className="this-week flex flex-col justify-center gap-2">
              <div className="title flex items-center gap-2">
                <span className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center bg-[#FCC43E] rounded-full">
                  <span className="block w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full"></span>
                </span>
                <p className="text-xs md:text-sm text-[#A098AE]">This week</p>
              </div>
              <p className="num text-[#303972] font-bold text-sm md:text-base text-center">
                1.245
              </p>
            </div>
            <div className="last-week flex flex-col justify-center gap-2">
              <div className="title flex items-center gap-2">
                <span className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center bg-[#FB7D5B] rounded-full">
                  <span className="block w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full"></span>
                </span>
                <p className="text-xs md:text-sm text-[#A098AE]">Last week</p>
              </div>
              <p className="num text-[#303972] font-bold text-sm md:text-base text-center">
                1.356
              </p>
            </div>
          </div>
        </header>
        <div
          className="mt-3"
          id="school-performance-chart"
          aria-label="school performance chart"
        >
          <Chart
            type="area"
            options={performanceChartOptions}
            series={performanceChartSeries}
            height={400}
          />
        </div>
      </div>
      <div className="row grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-8 my-8">
        <div className="school-calendar p-7 md:p-8 lg:p-9 bg-white rounded-xl md:rounded-3xl">
          <header className="flex flex-col md:flex-row gap-y-3 justify-between items-center">
            <BoxTitle title="School Calendar" />
            <div className="date text-[#303972] flex gap-2 items-center">
              <p ref={monthAndYear}>March 2021</p>
              <div className="transform flex gap-1 items-center">
                <div
                  className="back w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center bg-slate-300 transition duration-300 hover:bg-slate-400 cursor-pointer text-xl md:text-2xl lg:text-3xl"
                  ref={prevMonth}
                  onClick={() => {
                    getPrevMonth(currentDate, setCurrentDate);
                  }}
                >
                  <BiChevronLeft />
                </div>
                <div
                  className="forward w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center bg-slate-300 transition duration-300 hover:bg-slate-400 cursor-pointer text-xl md:text-2xl lg:text-3xl"
                  ref={nextMonth}
                  onClick={() => {
                    getNextMonth(currentDate, setCurrentDate);
                  }}
                >
                  <BiChevronRight />
                </div>
              </div>
            </div>
          </header>
          <div className="table-container overflow-x-auto w-full h-full">
            <table className="calendar w-full h-[80%] md:h-[85%] lg:h-[90%] mt-3 min-w-[300px]">
              <thead>
                <tr className="text-[#A098AE]">
                  <td>Sun</td>
                  <td>Mon</td>
                  <td>Tue</td>
                  <td>Wed</td>
                  <td>Thu</td>
                  <td>Fri</td>
                  <td>Sat</td>
                </tr>
              </thead>
              <tbody>
                {daysMatrix.map((week, i) => (
                  <tr key={i}>
                    {week.map((dayObj, j) => (
                      <td
                        key={j}
                        className={`${dayObj.today ? "today" : ""} ${
                          dayObj.inactive ? "text-gray-400" : ""
                        }`}
                      >
                        <span>{dayObj.day}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="school-finance p-7 md:p-8 lg:p-9 bg-white rounded-xl md:rounded-3xl">
          <header className="flex flex-col lg:flex-row gap-y-3 justify-between items-center">
            <BoxTitle title="School Finance" />
            <div className="info flex items-center gap-5 md:gap-6 lg:gap-7">
              <div className="this-week flex flex-col justify-center gap-2">
                <div className="title flex items-center gap-2">
                  <span className="w-3 h-3 lg:w-4 lg:h-4 flex items-center justify-center bg-[#FCC43E] rounded-full">
                    <span className="block w-1 h-1 lg:w-2 lg:h-2 bg-white rounded-full"></span>
                  </span>
                  <p className="text-xs text-[#A098AE]">This week</p>
                </div>
                <p className="num text-[#303972] font-bold text-xs md:text-sm text-center">
                  1.245
                </p>
              </div>
              <div className="last-week flex flex-col justify-center gap-2">
                <div className="title flex items-center gap-2">
                  <span className="w-3 h-3 lg:w-4 lg:h-4 flex items-center justify-center bg-[#FB7D5B] rounded-full">
                    <span className="block w-1 h-1 lg:w-2 lg:h-2 bg-white rounded-full"></span>
                  </span>
                  <p className="text-xs text-[#A098AE]">Last week</p>
                </div>
                <p className="num text-[#303972] font-bold text-xs md:text-sm text-center">
                  1.356
                </p>
              </div>
            </div>
          </header>
          <div
            className="finance-chart mt-3"
            id="school-finance-chart"
            aria-label="school finance chart"
          >
            <Chart
              type="bar"
              options={financeChartOptions}
              series={financeChartSeries}
              height={300}
            />
          </div>
        </div>
      </div>
      <div
        className="unpaid-students p-7 md:p-8 lg:p-9 bg-white rounded-xl md:rounded-3xl my-8"
        id="unpaidStudents"
      >
        <BoxTitle title="Unpaid Student" />
        <div className="overflow-x-auto mt-7 w-full">
          <table className="min-w-[700px] w-full">
            <thead>
              <tr className="">
                <th className="px-4 py-2 text-sm md:text-base lg:text-lg text-start">
                  Student
                </th>
                <th className="px-4 py-2 text-sm md:text-base lg:text-lg">
                  ID
                </th>
                <th className="px-4 py-2 text-sm md:text-base lg:text-lg">
                  Amount
                </th>
                <th className="px-4 py-2 text-sm md:text-base lg:text-lg">
                  Grade
                </th>
                <th className="px-4 py-2 text-sm md:text-base lg:text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((e) => {
                return (
                  <tr className="student-row" key={e.id}>
                    <td>
                      <StudentNamePhoto
                        studentName={e.name}
                        studentImage={e.image}
                      />
                    </td>
                    <td className="font-semibold text-sm md:text-base lg:text-lg text-center">
                      {e.studentID}
                    </td>
                    <td className="text-center text-sm md:text-base lg:text-lg font-semibold">
                      $ {e["owes-amount"]}
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
    </div>
  );
}

export default Dashboard;
