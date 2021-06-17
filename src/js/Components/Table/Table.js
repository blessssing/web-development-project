import React from "react";
import "./Table.scss";
import useFetch from "@hooks/useFetch";
import useInput from "@hooks/useInput";
import TableListItems from "../TableListItems";

const Table = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data, loading, error } = useFetch(url);
  const firstname = useInput("firstname");

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log("error ", error);
    return null;
  }

  return (
    <>
      <section className="section-outer">
        <section className="section-inner">
          <h2 style={{ color: "hotpink" }}>Table</h2>
          <input {...firstname} placeholder="firstname" type="text" />
          <TableListItems data={data} />
        </section>
      </section>
    </>
  );
};

export default Table;
