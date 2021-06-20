import React from "react";

const TableRow = ({ row, handleRow }) => {
  const { id, name, body, email, postId } = row;

  return (
    <tr key={id} onClick={() => handleRow(row)}>
      <th>{id}</th>
      <td>{name}</td>
      <td>{body}</td>
      <td>{email}</td>
      <td>{postId}</td>
    </tr>
  );
};

export default TableRow;
