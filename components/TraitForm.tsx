import { useState } from "react";
import useError from "../hooks/useError";
import Error from "../components/layouts/Error";

const TraitForm = ({ category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { error, setError, clearError } = useError();

  const submitTrait = async (info) => {
    const body = JSON.stringify(info);
    const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
    const response = await fetch("/api/traits/", {
      method: "POST",
      body,
      headers,
    });
    const data = await response.json();
    if (checkIfFailed(data)) {
      setError(data);
    } else {
      //reload page
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitTrait({ name, description, category: category.id });
      }}
    >
      <Error error={error} clearError={clearError} />
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Submit</button>
    </form>
  );
};

const checkIfFailed = (body) => body.detail;
export default TraitForm;
