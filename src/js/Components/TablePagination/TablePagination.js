import React from "react";

const TablePagination = ({ pageNumbers }) => {
  return (
    <nav aria-label="Table pagination">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map((num) => {
          return (
            <li key={num + 1} className="page-item">
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
