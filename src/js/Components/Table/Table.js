import React, { useState } from "react";
import "./Table.scss";
import useFetch from "@hooks/useFetch";
import useInput from "@hooks/useInput";
import TableListItems from "../TableListItems";
import Loader from "../Loader";
import ArrowDown from "../ArrowDown";
import ArrowUp from "../ArrowUp";

const Table = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data, loading, error, setStatus } = useFetch(url);
  const [directionSort, setDirectionSort] = useState(true);
  const [field, setField] = useState("");

  const firstname = useInput("firstname");

  const Arrow = () => {
    return directionSort ? <ArrowDown /> : <ArrowUp />;
  };

  const handleSortData = (orderColumn) => {
    console.log(orderColumn);
    console.log("directionSort ", directionSort);

    let sortedData = [...data];

    // if (directionSort) {
    //   sortedData = sortedData.sort((a, b) => {
    //     console.log(a[orderColumn], b[orderColumn]);

    //     return a[orderColumn] > b[orderColumn] ? 1 : -1;
    //   });
    // } else {
    //   sortedData = sortedData.sort((a, b) => {
    //     return a[orderColumn] < b[orderColumn] ? 1 : -1;
    //   });
    // }

    sortedData = sortedData.sort((a, b) => {
      if (directionSort) {
        return a[orderColumn] > b[orderColumn] ? 1 : -1;
      }
      return a[orderColumn] < b[orderColumn] ? 1 : -1;
    });

    setStatus({ data: sortedData });
    setDirectionSort((prev) => !prev);
    setField(orderColumn);
  };

  if (loading) return <Loader />;

  if (error) {
    console.log("error ", error);
    return null;
  }

  return (
    <>
      <section>
        <section>
          <input {...firstname} placeholder="firstname" type="text" />

          <table className="table caption-top table-striped table-hover align-middle text-center">
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

            <TableListItems data={data} handleSortData={handleSortData} />
          </table>
        </section>
      </section>
    </>
  );
};

export default Table;
