import React from "react";

const TableRow = ({ row }) => {
  const { id, name, body, email, postId } = row;

  return (
    <tr key={id}>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{body}</td>
      <td>{email}</td>
      <td>{postId}</td>
    </tr>
  );
};

export default TableRow;
