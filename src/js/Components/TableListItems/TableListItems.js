import React from "react";
import TableRow from "../TableRow";

const TableListItems = ({ data }) => {
  console.log("data ", data);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"># id</th>
            <th scope="col">Name</th>
            <th scope="col">Body</th>
            <th scope="col">Email</th>
            <th scope="col">PostId</th>
          </tr>
        </thead>
        <tbody>
          {(data && data.map((row) => <TableRow key={row.id} row={row} />)) || (
            <tr>
              <th>not data</th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableListItems;
