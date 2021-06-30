import React from "react";

const TablePagination = ({ pageNumbers, handlePageData, activePage }) => {
  return (
    <nav aria-label="Table pagination">
      <ul className="pagination justify-content-center">
        <li className="page-item">
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
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TablePagination;
