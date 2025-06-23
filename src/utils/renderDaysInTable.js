const renderDaysInTable = (currentDate, setDaysMatrix) => {
  const lastDayInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const lastDateOfPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const days = [];
  let week = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    week.push({ day: lastDateOfPrevMonth - i, inactive: true });
  }

  for (let i = 1; i <= lastDayInMonth; i++) {
    week.push({ day: i, today: i === currentDate.getDate() });

    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    days.push(week);
  }
  if (week.length < 7) {
    const lastDaysNum = 7 - week.length;
    for (let i = 1; i <= lastDaysNum; i++) {
      week.push({ day: i, inactive: true });
    }
  }

  setDaysMatrix(days);
};

export default renderDaysInTable;
