import React, { useState, useCallback } from "react";

const SearchRow = ({ data, setCurrentPageData, setSearchValue }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    let searchString = e.target.value.toLowerCase();
    setValue(e.target.value);
    setSearchValue(e.target.value);

    const cloneData = [...data];
    const filteredData = cloneData.filter((item) => {
      if (
        item.name.toLowerCase().includes(searchString) ||
        item.id.toString().includes(e.target.value)
      ) {
        return item;
      }
    });

    console.log(e.target.value);

    console.log("filteredData ", filteredData);

    setCurrentPageData(filteredData);
  };

  return (
    <div>
      <label htmlFor="search-row">
        <input
          onChange={onChange}
          value={value}
          id="search-row"
          placeholder="search name or id"
          type="text"
        />
      </label>
    </div>
  );
};

export default SearchRow;
