import React from "react";

const DetailRow = ({ detailRowData }) => {
  const { id, name, body, email, postId } = detailRowData;

  return (
    <div>
      <h4>DetailRow</h4>
      <div>
        Id: <b>{id}</b>
      </div>
      <div>
        Name: <b>{name}</b>
      </div>
      <div>
        Body: <b>{body}</b>
      </div>
      <div>
        Email: <b>{email}</b>
      </div>
      <div>
        PostId: <b>{postId}</b>
      </div>
    </div>
  );
};

export default DetailRow;
