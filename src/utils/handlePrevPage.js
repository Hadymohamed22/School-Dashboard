export const handlePrevPage = (currentPages, setCurrentPages, totalPages) => {
  if (currentPages === 1) {
    setCurrentPages(totalPages);
  } else {
    setCurrentPages((prev) => prev - 1);
  }
};
