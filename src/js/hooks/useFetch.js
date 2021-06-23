import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [status, setStatus] = useState({
    data: undefined,
    loading: false,
    error: undefined,
    isLoaded: false,
  });

  const fetchNow = (url, options) => {
    setStatus({ loading: true });

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data ", data);
        setStatus({ loading: false, isLoaded: true, data });
      })
      .catch((error) => {
        console.log("error ", error);
        setStatus({ loading: false, error });
      });
  };

  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  }, []);

  return { ...status, setStatus, fetchNow };
};

export default useFetch;
