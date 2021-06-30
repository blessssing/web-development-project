import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [status, setStatus] = useState({
    data: undefined,
    loading: false,
    error: undefined,
    isLoaded: false,
  });

  const fetchNow = (url, options) => {
    setStatus((state) => ({ ...state, loading: true }));

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data ", data);
        setStatus((state) => ({
          ...state,
          data,
          loading: false,
          isLoaded: true,
        }));
      })
      .catch((error) => {
        console.log("error ", error);
        setStatus((state) => ({
          ...state,
          loading: false,
          error,
        }));
      });
  };

  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  }, [url, options]);

  return { ...status, setStatus, fetchNow };
};

export default useFetch;
