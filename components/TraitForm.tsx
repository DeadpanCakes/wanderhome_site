import { useState } from "react";
import { useRouter } from "next/router";
import useError from "../hooks/useError";
import Error from "../components/layouts/Error";

const TraitForm = ({ category }) => {
  const [isMagic, setIsMagic] = useState(false);
  const toggleIsMagic = () => setIsMagic((prevState) => !prevState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { error, setError, clearError } = useError();
  const router = useRouter();

  const submitTrait = async (info) => {
    const body = JSON.stringify(info);
    const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
    const response = await fetch("/api/traits/", {
      method: "POST",
      body,
      headers,
    });
    if (checkIfFailed(response)) {
      setError(await response.json());
    } else {
      const data = await response.json();
      if (data.detal) {
        return setError(data);
      }
      router.reload();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitTrait({
          name,
          description,
          category: category.id,
          is_magic: isMagic,
        });
      }}
    >
      <Error error={error} clearError={clearError} />
      <label htmlFor="isMagic">Is Magical</label>
      <input
        id="isMagic"
        name="isMagic"
        type="checkbox"
        defaultChecked={isMagic}
        onChange={toggleIsMagic}
      ></input>
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

const checkIfFailed = async (res) => {
  if (res.status === 400) {
    return await res.json();
  }
};
export default TraitForm;
