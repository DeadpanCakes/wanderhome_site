import React from "react";
import { useRouter } from "next/router";
import useError from "../../hooks/useError";
import Error from "./Error";

const APIForm = ({ payload, url, method, children }) => {
  const { error, setError: handleError, clearError } = useError();
  const router = useRouter();

  const handleSubmission = async () => {
    const options = {
      method,
      body: JSON.stringify(payload),
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    };
    const response = await fetch(url, options);
    if (networkFailure(response)) {
      const error = await response.json();
      handleError(error);
    } else {
      return response.json().then((data) => {
        if (authFailure(data)) {
          return handleError(data);
        }
        return router.reload();
      });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmission();
      }}
    >
      <Error error={error} clearError={clearError} />
      {children}
      <button>Submit</button>
    </form>
  );
};

const networkFailure = (res) => res.status === 400;
const authFailure = (data) => data.detail;

export default APIForm;
