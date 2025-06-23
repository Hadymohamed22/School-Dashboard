export const handleNextPage = (currentPage, setCurrentPage, totalPages) => {
  if (currentPage === totalPages) {
    setCurrentPage(1);
  } else {
    setCurrentPage((prev) => prev + 1);
  }
};
