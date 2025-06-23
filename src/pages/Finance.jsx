import HeaderLayout from "../layouts/HeaderLayout";
import StatisticBox from "../components/StatistcBox";
import Chart from "react-apexcharts";
import "apexcharts/dist/apexcharts.css";
import {
  balanceAnalyticsOptions,
  balanceAnalyticsSeries,
} from "../constants/balanceAnalyticsChart";
import BoxTitle from "../components/BoxTitle";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";
import printStudentInfo from "../utils/printStudentInfo";
import StudentNamePhoto from "../components/StudentNamePhoto";
import SchoolExpenseRow from "../components/SchoolExpenseRow";
import { useEffect, useState } from "react";
import { deleteStudent, fetchStudents } from "../store/slices/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { handlePrevPage } from "../utils/handlePrevPage";
import { handleNextPage } from "../utils/handleNextPage";
import { handleExpenseDate } from "../utils/handleExpenseDate";

function Finance() {
  const [currentStudentsPage, setCurrentStudentsPage] = useState(1);
  const [currentExpensePage, setCurrentExpensePage] = useState(1);
  const [expenseData, setExpenseData] = useState([]);
  const { students, status } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  const studentsPerPage = 5;
  const lastStudentIndex = currentStudentsPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;
  const currentStudents = students.slice(firstStudentIndex, lastStudentIndex);

  const totalStudentsPage = Math.ceil(students.length / studentsPerPage);
  const studentsPageNumbers = Array.from(
    { length: totalStudentsPage },
    (_, i) => i + 1
  );
  const expensesPerPage = 5;
  const lastExpenseIndex = currentExpensePage * expensesPerPage;
  const firstExpenseIndex = lastExpenseIndex - expensesPerPage;
  const currentExpenses = expenseData.slice(
    firstExpenseIndex,
    lastExpenseIndex
  );

  const totalExpensesPage = Math.ceil(expenseData.length / expensesPerPage);
  const expensePageNumbers = Array.from(
    { length: totalExpensesPage },
    (_, i) => i + 1
  );

  useEffect(() => {
    if (status === "idle") {
      console.log("dispatch FetchStudents....");
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const res = await fetch(
          "https://685904a4138a18086dfcaa73.mockapi.io/akadimi-dashboard/school-expense"
        );
        const data = await res.json();
        setExpenseData(data);
      } catch (err) {
        console.log(`Failed To Fetch Expense Data : ${err}`);
      }
    };
    fetchExpenseData();
  }, []);
  return (
    <div className="finance-page">
      <HeaderLayout title="Finance" />
      <div className="financeContent my-8">
        <div className="statistics grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 my-8">
          <StatisticBox
            statisticTitle="Total Students"
            icon="student"
            percentage="+10%"
            StatisticP="than last month"
            num={students.length}
          />
          <StatisticBox
            statisticTitle="Total Teachers"
            icon="teacher"
            percentage="-5%"
            StatisticP="than last month"
            num={teachers.length}
          />
          <StatisticBox
            statisticTitle="School Balance"
            icon="money"
            percentage="+23%"
            StatisticP="than last month"
            num="$123,456"
          />
        </div>
        <div
          className="balance-analytics mt-3 p-5 md:p-6 lg:p-7 bg-white rounded-2xl md:rounded-3xl my-8"
          id="balance-analytics-chart"
          aria-label="balance analytics chart"
        >
          <header className="flex flex-col md:flex-row gap-y-3 justify-between items-center mb-3">
            <BoxTitle title="Balance Analytics" />
            <div className="info flex items-center gap-5 md:gap-6 lg:gap-7">
              <div className="this-week flex flex-col justify-center gap-2">
                <div className="title flex items-center gap-2">
                  <span className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center bg-[#FCC43E] rounded-full">
                    <span className="block w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full"></span>
                  </span>
                  <p className="text-xs md:text-sm text-[#A098AE]">Income</p>
                </div>
                <p className="num text-[#303972] font-bold text-sm md:text-base text-center">
                  1.356
                </p>
              </div>
              <div className="last-week flex flex-col justify-center gap-2">
                <div className="title flex items-center gap-2">
                  <span className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center bg-[#FB7D5B] rounded-full">
                    <span className="block w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full"></span>
                  </span>
                  <p className="text-xs md:text-sm text-[#A098AE]">Expense</p>
                </div>
                <p className="num text-[#303972] font-bold text-sm md:text-base text-center">
                  1.245
                </p>
              </div>
            </div>
          </header>
          <Chart
            type="area"
            options={balanceAnalyticsOptions}
            series={balanceAnalyticsSeries}
            height={400}
          />
        </div>
        <div className="unpaidStudents-schoolExpense grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          <div
            className="unpaid-students p-5 md:p-6 lg:p-7 bg-white rounded-xl md:rounded-3xl col-span-1 md:col-span-1 lg:col-span-2"
            id="unpaidStudents"
          >
            <BoxTitle title="Unpaid Student" />
            <div className="overflow-x-auto mt-7 w-full">
              <table className="min-w-[500px] w-full">
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
          <div className="school-expense col-span-1 p-5 md:p-6 lg:p-7 bg-white rounded-2xl md:rounded-3xl">
            <BoxTitle title="School Expense" />
            <div className="school-expense-container overflow-x-auto mt-7 w-full md:h-[80%]">
              <table className="w-full min-w-[400px] h-full">
                <thead>
                  <tr>
                    <th className="text-start">Data</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExpenses.map((e) => {
                    return (
                      <SchoolExpenseRow
                        key={e.id}
                        processDate={handleExpenseDate(e.date)}
                        processID={`#${e.expenseID}`}
                        status={e.status}
                        amount={`$${e.amount}`}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="school-expense-pages-num-container flex justify-end items-center mt-5">
              <div className="nums-arrows flex items-center gap-1">
                <div
                  className="left-arrow cursor-pointer transition duration-300 hover:scale-150"
                  onClick={() => {
                    handlePrevPage(
                      currentExpensePage,
                      setCurrentExpensePage,
                      totalExpensesPage
                    );
                  }}
                >
                  <IoMdArrowDropleft className="text-base md:text-lg lg:text-xl" />
                </div>
                <div className="num-boxs flex gap-2 items-center">
                  {expensePageNumbers.map((e) => {
                    return (
                      <div
                        className={`num-box flex justify-center items-center w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-xs md:text-sm lg:text-base rounded-full border-2 border-[#A098AE] text-[#A098AE] transition duration-300 hover:bg-main/30 hover:border-main/30 hover:text-white ${
                          e == currentExpensePage ? "active" : ""
                        }`}
                        key={e}
                        onClick={() => {
                          setCurrentExpensePage(e);
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
                      currentExpensePage,
                      setCurrentExpensePage,
                      totalExpensesPage
                    );
                  }}
                >
                  <IoMdArrowDropright className="text-base md:text-lg lg:text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
