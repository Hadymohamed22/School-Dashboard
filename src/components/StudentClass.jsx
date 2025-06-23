function StudentClass({ classGrade, grade }) {
  const gradeBg =
    grade == "1"
      ? "#FB7D5B"
      : grade == "2"
      ? "#FCC43E"
      : grade == "3" && "#4D44B5";
  return (
    <>
      <div
        className="class mx-auto w-16 h-8 md:w-20 md:h-10 flex justify-center items-center rounded-[40px] text-white pt-1 px-2 text-sm md:text-base"
        style={{ backgroundColor: gradeBg }}
      >
        {classGrade}
      </div>
    </>
  );
}
export default StudentClass;
