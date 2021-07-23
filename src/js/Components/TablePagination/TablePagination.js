import React, { useEffect } from "react";

const TablePagination = ({
  pageNumbers,
  handlePageData,
  activePage,
  handlePrev,
  handleNext,
  prevBtnClasses,
  nextBtnClasses,
  paginationAfterSearch,
  searchValue,
  orderColumnId,
}) => {
  //TODO
  useEffect(() => {
    if (!searchValue) {
      return;
    }

    paginationAfterSearch();
    orderColumnId();
    console.log("tablepagination");
  }, [paginationAfterSearch, searchValue]);
  //TODO

  return (
    <nav aria-label="Table pagination">
      <ul className="pagination justify-content-center">
        <li onClick={() => handlePrev()} className={prevBtnClasses}>
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map((num) => {
          return (
            <li
              onClick={() => handlePageData(num)}
              key={num + 1}
              className={num === activePage ? "page-item active" : "page-item"}
            >
              <a className="page-link" href="#">
                {num}
              </a>
            </li>
          );
        })}
        <li onClick={() => handleNext()} className={nextBtnClasses}>
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TablePagination;
