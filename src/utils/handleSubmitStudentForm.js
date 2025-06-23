export const handleSubmitStudentForm = (data, setIsFormOpen, add, dispatch) => {
  const values = Object.values(data);
  const allFilled = values.every((val) => val.trim() !== "");

  if (allFilled) {
    console.log("Student Data:", data);
    setIsFormOpen(false);
    dispatch(add({ ...data, "join-date": new Date().toISOString() }));
  }
};
