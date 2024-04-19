import { useState, useEffect } from "react";
export function useFetch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    // callback?.();

    //const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        // const res = await fetch(`http://127.0.0.1:3000/api/v1/article`, {
        //   signal: controller.signal,
        // });

        const res = await fetch(`http://127.0.0.1:3000/api/v1/article`);

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        //        if (data.Response === "False") throw new Error("Movie not found");
        console.log(data);
        setData(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    // return function () {
    //   controller.abort();
    // };
  }, []);

  return { data, isLoading, error };
}
