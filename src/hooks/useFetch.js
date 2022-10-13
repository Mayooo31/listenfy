import React, { useState } from "react";
import { useCtx } from "../context/context";

const useFetch = () => {
  const { userLoggedToken, setSection, setError } = useCtx();
  const [loading, setLoading] = useState(false);
  // const [dataAll, setDataAll] = useState();

  const fetchData = async (url, method = "GET", body = null, checkRes = false) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
        body,
      });
      if (checkRes) {
        if (!res.ok) throw "Something went wrong...";
      }

      setLoading(false);
      if (method !== "DELETE" && method !== "PUT") {
        const data = await res.json();
        if (data.error) throw data.error;
        return { data };
      }
    } catch (err) {
      setLoading(false);
      setError(err);
      setSection("error");
    }
  };

  const fetchPromiseAllData = async (url, body = null, checkRes = false) => {
    try {
      setLoading(true);
      const values = await Promise.all(url);
      // if (checkRes) {
      //   if (!values.ok) throw "Something went wrong...";
      // }
      setLoading(false);
      const data = await Promise.all(values.map(r => r.json()));
      data.map(item => {
        if (item.error) throw item.error;
      });

      return { data };
    } catch (err) {
      setLoading(false);
      setError(err);
      setSection("error");
    }
  };

  return { fetchData, fetchPromiseAllData, loading };
};

export default useFetch;
