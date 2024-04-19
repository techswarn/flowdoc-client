import { useState, useEffect } from "react";
import axios from "axios";

let baseURL = "http://127.0.0.1:3000/api/v1/";

const makeRequest = axios.create({
  baseURL: baseURL,
});

const useAxios = (url, req) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await makeRequest({
          url: url,
          method: req.method,
          data: req.payload,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: req?.token,
          },
        });
        setData(response?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useAxios;
