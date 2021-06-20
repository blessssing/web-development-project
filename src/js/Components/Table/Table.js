import React, { useState } from "react";
import "./Table.scss";
import useFetch from "@hooks/useFetch";
import useInput from "@hooks/useInput";
import TableListItems from "../TableListItems";
import Loader from "../Loader";
import ArrowDown from "../ArrowDown";
import ArrowUp from "../ArrowUp";
import DetailRow from "../DetailRow";
import TableHeader from "../TableHeader";
import TablePagination from "../TablePagination";

const Table = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data, loading, error, setStatus } = useFetch(url);
  const [directionSort, setDirectionSort] = useState(true);
  const [field, setField] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(undefined);
  const firstname = useInput("firstname");

  const Arrow = () => {
    return directionSort ? <ArrowDown /> : <ArrowUp />;
  };

  const handleRow = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleSortData = (orderColumn) => {
    let sortedData = [...data];

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
      <section className="section-outer">
        <section className="section-inner">
          <input {...firstname} placeholder="firstname" type="text" />

          {(selectedRowData && <DetailRow detailRowData={selectedRowData} />) ||
            null}

          <TablePagination />
          <TableFull
            field={field}
            handleSortData={handleSortData}
            Arrow={Arrow}
            data={data}
            handleSortData={handleSortData}
            handleRow={handleRow}
          />
        </section>
      </section>
    </>
  );
};

const TableFull = ({ field, handleSortData, Arrow, data, handleRow }) => {
  return (
    <table className="table caption-top table-striped table-hover align-middle text-center">
      <TableHeader
        field={field}
        handleSortData={handleSortData}
        Arrow={Arrow}
      />

      <TableListItems
        data={data}
        handleSortData={handleSortData}
        handleRow={handleRow}
      />
    </table>
  );
};

export default Table;
