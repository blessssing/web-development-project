import React, { useState, useEffect } from "react";
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
import ButtonGetData from "../ButtonGetData";

const Table = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data, loading, error, isLoaded, setStatus, fetchNow } = useFetch();
  const firstname = useInput("firstname");
  const [directionSort, setDirectionSort] = useState(true);
  const [field, setField] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(undefined);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [calculatePages, setCalculatePages] = useState(0);
  const [totalCountRows, setTotalCountRows] = useState(0);
  const stepOnePage = 50;

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    setTotalCountRows(data.length);
    setCalculatePages(totalCountRows / stepOnePage);

    console.log("stepOnePage ", stepOnePage);
    console.log("totalCountRows ", totalCountRows);
    console.log("calculatePages ", calculatePages);

    const pages = [];
    for (let i = 0; i < calculatePages; i++) {
      pages[i] = i + 1;
    }
    setPageNumbers(pages);
  }, [data, error, calculatePages, totalCountRows]);

  const currentPageData = (numPage) => {
    const pageData = data.slice(
      (numPage - 1) * stepOnePage,
      numPage * stepOnePage
    );

    console.log("pageData ", pageData);
  };

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

          {!data && <ButtonGetData fetchNow={fetchNow} url={url} />}

          {(selectedRowData && <DetailRow detailRowData={selectedRowData} />) ||
            null}

          {(data && (
            <>
              <TablePagination
                pageNumbers={pageNumbers}
                currentPageData={currentPageData}
              />

              <TableFull
                field={field}
                handleSortData={handleSortData}
                Arrow={Arrow}
                data={data}
                handleSortData={handleSortData}
                handleRow={handleRow}
              />
            </>
          )) || <div>No data yet</div>}
        </section>
      </section>
    </>
  );
};

const TableFull = ({ field, handleSortData, Arrow, data, handleRow }) => {
  useEffect(() => {
    console.log("data ", data);
  }, [data]);

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
