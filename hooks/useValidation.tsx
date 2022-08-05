import { useState, useEffect } from "react";
const useValidation = (...conditions) => {
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    setValid(
      conditions.every((condition) => {
        return condition;
      })
    );
  }, [conditions]);
  return isValid;
};

export default useValidation;
