function StudentNamePhoto({ studentImage, studentName }) {
  return (
    <>
      <div className="student-name-photo flex gap-3 md:gap-4 items-center">
        <div className="student-photo">
          <img
            src={studentImage}
            alt="student profile image"
            className="rounded-full border-2 border-main shadow min-w-10 w-10 min-h-10 h-10 md:min-w-11 md:min-h-11 md:w-11 md:h-11"
          />
        </div>
        <span className="student-name text-sm md:text-base lg:text-lg font-semibold">
          {studentName}
        </span>
      </div>
    </>
  );
}
export default StudentNamePhoto;
