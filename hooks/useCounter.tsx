import { useState } from "react";

const useCounter = (init) => {
  const [count, setCount] = useState(init);
  const increment = () => setCount((prevState) => prevState + 1);
  const decrement = () => setCount((prevState) => prevState - 1);
  return [count, increment, decrement];
};

export default useCounter;
