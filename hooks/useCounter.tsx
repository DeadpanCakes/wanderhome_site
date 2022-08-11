import { useState } from "react";

const useCounter = (init) => {
  const [count, setCount] = useState(init);
  const increment = () => setCount((prevState) => prevState + 1);
  const decrement = () => setCount((prevState) => prevState - 1);
  const resetCount = () => setCount(0);
  return [count, increment, decrement, setCount, resetCount];
};

export default useCounter;
