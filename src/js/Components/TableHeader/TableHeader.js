import React from "react";

const TableHeader = ({ field, handleSortData, Arrow }) => {
  return (
    <>
      <caption>List of posts</caption>
      <thead className="table-light align-middle">
        <tr>
          <th onClick={handleSortData.bind(null, "id")}>
            id {field === "id" ? <Arrow /> : null}
          </th>
          <th onClick={handleSortData.bind(null, "name")}>
            Name {field === "name" ? <Arrow /> : null}
          </th>
          <th onClick={handleSortData.bind(null, "body")}>
            Body {field === "body" ? <Arrow /> : null}
          </th>
          <th onClick={handleSortData.bind(null, "email")}>
            Email {field === "email" ? <Arrow /> : null}
          </th>
          <th onClick={handleSortData.bind(null, "postId")}>
            PostId {field === "postId" ? <Arrow /> : null}
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
