import React, { useEffect } from "react";
import TableRow from "../TableRow";

const TableListItems = ({ currentPageData, handleRow }) => {
  return (
    <>
      <tbody>
        {(currentPageData &&
          currentPageData.map((row) => {
            return <TableRow handleRow={handleRow} key={row.id} row={row} />;
          })) || (
          <tr>
            <th>not data</th>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default TableListItems;
