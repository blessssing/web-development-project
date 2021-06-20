import React from "react";

const DetailRow = ({ detailRowData }) => {
  const { id, name, body, email, postId } = detailRowData;

  return (
    <div>
      <h4>DetailRow</h4>
      <div>Id: {id}</div>
      <div>Name: {name}</div>
      <div>Body: {body}</div>
      <div>Email: {email}</div>
      <div>PostId: {postId}</div>
    </div>
  );
};

export default DetailRow;
