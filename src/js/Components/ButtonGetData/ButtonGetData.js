import React, { useEffect } from "react";
import useFetch from "@hooks/useFetch";

const ButtonGetData = ({ fetchNow, url }) => {
  return (
    <div>
      <button onClick={() => fetchNow(url)} className="btn btn-success">
        Get Data
      </button>
    </div>
  );
};

export default ButtonGetData;
