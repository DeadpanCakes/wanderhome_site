import { useState } from "react";

const useError = () => {
  const [error, setError] = useState({});
  const clearError = () => setError({});
  return { error, setError, clearError };
};

export default useError;
