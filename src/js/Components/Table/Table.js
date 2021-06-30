import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const { data, loading, error, isLoaded, fetchNow } = useFetch();
  const [currentPageData, setCurrentPageData] = useState(undefined);
  const firstname = useInput("firstname");
  const [directionSort, setDirectionSort] = useState(true);
  const [field, setField] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(undefined);
  const [activePage, setActivePage] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([]);
  const stepOnePage = 50;
  const sortedData = useRef([]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    sortedData.current = [...data];
    console.log("sortedData ", sortedData);

    console.log(sortedData.current);

    firstPage();
  }, [data, isLoaded, firstPage]);

  const firstPage = useCallback(() => {
    console.log("data.length ", data.length);

    let totalCountRows = data.length;
    let calculatePages = Math.ceil(totalCountRows / stepOnePage);

    const pageData = data.slice(0, stepOnePage);
    console.log("pageData ", pageData);
    setCurrentPageData(pageData);
    setActivePage(1);

    console.log("totalCountRows ", totalCountRows);
    console.log("calculatePages ", calculatePages);

    const pages = [];
    for (let i = 0; i < calculatePages; i++) {
      pages[i] = i + 1;
    }

    console.log("pages ", pages);
    setPageNumbers(pages);
  }, [data]);

  const handlePageData = (numPage = 1) => {
    const pageData = sortedData.current.slice(
      (numPage - 1) * stepOnePage,
      numPage * stepOnePage
    );

    console.log("pageData ", pageData);
    setCurrentPageData(pageData);
    setActivePage(numPage);
  };

  const handleSortData = (orderColumn = "id") => {
    let copyData = [...data];

    let cloneDataSorted = copyData.sort((a, b) => {
      if (directionSort) {
        return a[orderColumn] > b[orderColumn] ? 1 : -1;
      }
      return a[orderColumn] < b[orderColumn] ? 1 : -1;
    });

    const pageData = cloneDataSorted.slice(0, stepOnePage);
    console.log("pageData ", pageData);
    setCurrentPageData(pageData);
    setActivePage(1);

    setDirectionSort((prev) => !prev);
    setField(orderColumn);
  };

  const Arrow = () => {
    return directionSort ? <ArrowDown /> : <ArrowUp />;
  };

  const handleRow = (rowData) => {
    setSelectedRowData(rowData);
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

          {!currentPageData && <ButtonGetData fetchNow={fetchNow} url={url} />}

          {(selectedRowData && <DetailRow detailRowData={selectedRowData} />) ||
            null}

          {(currentPageData && (
            <>
              <TablePagination
                pageNumbers={pageNumbers}
                handlePageData={handlePageData}
                activePage={activePage}
              />

              <TableFull
                field={field}
                handleSortData={handleSortData}
                Arrow={Arrow}
                currentPageData={currentPageData}
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

const TableFull = ({
  field,
  handleSortData,
  Arrow,
  currentPageData,
  handleRow,
}) => {
  return (
    <table className="table caption-top table-striped table-hover align-middle text-center">
      <TableHeader
        field={field}
        handleSortData={handleSortData}
        Arrow={Arrow}
      />

      <TableListItems
        currentPageData={currentPageData}
        handleSortData={handleSortData}
        handleRow={handleRow}
      />
    </table>
  );
};

export default Table;
