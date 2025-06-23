const getPrevMonth = (currentDate, setCurrentDate) => {
  setCurrentDate(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    )
  );
};

export default getPrevMonth;
