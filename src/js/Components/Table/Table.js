import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Table.scss";
import useFetch from "@hooks/useFetch";
import TableListItems from "../TableListItems";
import Loader from "../Loader";
import ArrowDown from "../ArrowDown";
import ArrowUp from "../ArrowUp";
import DetailRow from "../DetailRow";
import TableHeader from "../TableHeader";
import TablePagination from "../TablePagination";
import ButtonGetData from "../ButtonGetData";
import SearchRow from "../SearchRow";

const Table = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data, loading, error, isLoaded, fetchNow } = useFetch();
  const [currentPageData, setCurrentPageData] = useState([]);
  const [directionSort, setDirectionSort] = useState(true);
  const [field, setField] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(undefined);
  const [activePage, setActivePage] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [prevBtnClasses, setPrevBtnClasses] = useState("page-item");
  const [nextBtnClasses, setNextBtnClasses] = useState("page-item");
  const [searchValue, setSearchValue] = useState("");

  const stepOnePage = 50;
  const sortedData = useRef([]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    sortedData.current = [...data];
    console.log("sortedData ", sortedData);

    console.log(sortedData.current);

    paginationAfterDataReceived();
  }, [data, isLoaded, paginationAfterDataReceived]);

  const handlePrev = () => {
    if (activePage !== 1) {
      const pageData = sortedData.current.slice(
        (activePage - 2) * stepOnePage,
        (activePage - 1) * stepOnePage
      );

      console.log("pageData ", pageData);
      setCurrentPageData(pageData);
      setActivePage(activePage - 1);
    }

    activePage <= 2
      ? setPrevBtnClasses("page-item disabled")
      : setPrevBtnClasses("page-item");

    setNextBtnClasses("page-item");
  };

  const handleNext = () => {
    if (activePage !== pageNumbers.length) {
      const pageData = sortedData.current.slice(
        activePage * stepOnePage,
        (activePage + 1) * stepOnePage
      );

      console.log("pageData ", pageData);
      setCurrentPageData(pageData);
      setActivePage(activePage + 1);
    }

    activePage >= pageNumbers.length - 1
      ? setNextBtnClasses("page-item disabled")
      : setNextBtnClasses("page-item");

    setPrevBtnClasses("page-item");
  };

  const paginationAfterDataReceived = useCallback(() => {
    let totalCountRows = data.length;
    let calculatePages = Math.ceil(totalCountRows / stepOnePage);

    const pageData = data.slice(0, stepOnePage);
    setCurrentPageData(pageData);
    setActivePage(1);

    const pages = [];
    for (let i = 0; i < calculatePages; i++) {
      pages[i] = i + 1;
    }

    setPageNumbers(pages);
    orderColumnId();
  }, [data, orderColumnId]);

  const paginationAfterSearch = useCallback(() => {
    let totalCountRows = sortedData.current.length;
    let calculatePages = Math.ceil(totalCountRows / stepOnePage);

    const pages = [];
    for (let i = 0; i < calculatePages; i++) {
      pages[i] = i + 1;
    }

    setPageNumbers(pages);
    setActivePage(1);
  }, [setActivePage, setPageNumbers]);

  const orderColumnId = useCallback(() => {
    setField("id");
    setDirectionSort(false);
  }, [setField, setDirectionSort]);

  const handlePageData = (numPage = 1) => {
    const pageData = sortedData.current.slice(
      (numPage - 1) * stepOnePage,
      numPage * stepOnePage
    );

    numPage === 1
      ? setPrevBtnClasses("page-item disabled")
      : setPrevBtnClasses("page-item");

    numPage === pageNumbers.length
      ? setNextBtnClasses("page-item disabled")
      : setNextBtnClasses("page-item");

    console.log("pageData ", pageData);
    setCurrentPageData(pageData);
    setActivePage(numPage);
  };

  const handleSortData = (orderColumn = "id") => {
    let copyData = [...sortedData.current];

    let cloneDataSorted = copyData.sort((a, b) => {
      if (directionSort) {
        return a[orderColumn] > b[orderColumn] ? 1 : -1;
      }
      return a[orderColumn] < b[orderColumn] ? 1 : -1;
    });

    sortedData.current = [...cloneDataSorted];

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
          {!isLoaded && <ButtonGetData fetchNow={fetchNow} url={url} />}

          {(selectedRowData && <DetailRow detailRowData={selectedRowData} />) ||
            null}

          {isLoaded && (
            <SearchRow
              data={data}
              setCurrentPageData={setCurrentPageData}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              sortedData={sortedData}
              stepOnePage={stepOnePage}
            />
          )}

          {(currentPageData.length && (
            <>
              <TablePagination
                pageNumbers={pageNumbers}
                handlePageData={handlePageData}
                activePage={activePage}
                handlePrev={handlePrev}
                handleNext={handleNext}
                prevBtnClasses={prevBtnClasses}
                nextBtnClasses={nextBtnClasses}
                paginationAfterSearch={paginationAfterSearch}
                searchValue={searchValue}
                orderColumnId={orderColumnId}
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
          )) ||
            (!currentPageData.length && isLoaded && (
              <div>The row is not found</div>
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
