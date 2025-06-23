function SchoolExpenseStatus({ status }) {
  const statusColor =
    status === "Complete"
      ? "#4CBC9A"
      : status === "Pending"
      ? "#A098AE"
      : status === "Reject" && "#FF4550";
  return (
    <>
      <div
        className="font-semibold text-sm md:text-base text-center"
        style={{ color: statusColor }}
      >
        {status}
      </div>
    </>
  );
}

export default SchoolExpenseStatus;
