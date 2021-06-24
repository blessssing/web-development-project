import React, { useEffect } from "react";
import TableRow from "../TableRow";

const TableListItems = ({ sortedData, handleRow }) => {
  return (
    <>
      <tbody>
        {(sortedData &&
          sortedData.map((row) => {
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
