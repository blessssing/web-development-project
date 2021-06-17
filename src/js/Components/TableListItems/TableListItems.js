import React from "react";
import TableRow from "../TableRow";

const TableListItems = ({ data }) => {
  console.log("data ", data);

  return (
    <>
      <tbody>
        {(data &&
          data.map((row) => {
            return <TableRow key={row.id} row={row} />;
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
