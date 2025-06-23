export const handleExpenseDate = (date) => {
  const currentDate = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = currentDate.toLocaleString("en-GB", options);
  return formattedDate;
};
