import { useState, useEffect } from "react";

function useGet(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Fetch error");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((e) => {
        console.log(e);
        setStatus("error");
      });
  }, [url]);

  return { data, status };
}

export default useGet;
