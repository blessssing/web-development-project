import React from "react";
import "./Table.scss";
import useFetch from "@hooks/useFetch";
import useInput from "@hooks/useInput";
import TableListItems from "../TableListItems";
import Loader from "../Loader";

const Table = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data, loading, error } = useFetch(url);
  const firstname = useInput("firstname");

  const handleSortData = (orderColumn) => {
    console.log(orderColumn);
  };

  if (loading) return <Loader />;

  if (error) {
    console.log("error ", error);
    return null;
  }

  return (
    <>
      <section className="section-outer">
        <section className="section-inner">
          <input {...firstname} placeholder="firstname" type="text" />

          <table className="table caption-top table-bordered table-striped table-hover align-middle">
            <caption>List of posts</caption>
            <thead className="table-light">
              <tr>
                <th onClick={handleSortData.bind(null, "id")} scope="col">
                  # id
                </th>
                <th onClick={handleSortData.bind(null, "name")} scope="col">
                  Name
                </th>
                <th onClick={handleSortData.bind(null, "body")} scope="col">
                  Body
                </th>
                <th onClick={handleSortData.bind(null, "email")} scope="col">
                  Email
                </th>
                <th onClick={handleSortData.bind(null, "postId")} scope="col">
                  PostId
                </th>
              </tr>
            </thead>

            <TableListItems data={data} handleSortData={handleSortData} />
          </table>
        </section>
      </section>
    </>
  );
};

export default Table;
