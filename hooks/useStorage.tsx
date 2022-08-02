import { useState, useEffect } from "react";

const useStorage = (key, init) => {
  const [data, setData] = useState(init);
  const { stringify, parse } = JSON;
  const fetchData = () => {
    const data = parse(localStorage.getItem(key));
    return setData(data);
  };
  useEffect(() => {
    if (data) {
      localStorage.setItem(key, stringify(data));
    }
  }, [data]);
  return [data, setData, fetchData];
};

export default useStorage;
