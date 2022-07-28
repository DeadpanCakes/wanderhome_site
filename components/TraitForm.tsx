import { useState } from "react";
import { useRouter } from "next/router";
import useError from "../hooks/useError";
import Error from "../components/layouts/Error";
import InputField from "./InputField";

const TraitForm = ({ category }) => {
  const [isMagic, setIsMagic] = useState(false);
  const toggleIsMagic = () => setIsMagic((prevState) => !prevState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { error, setError, clearError } = useError();
  const handleErrors = (error) => setError(error);
  const router = useRouter();

  const submitTrait = async (info) => {
    const url = "/api/traits";
    const options = {
      body: JSON.stringify(info),
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      method: "POST",
    };
    const response = await fetch(url, options);
    if (networkFailure(response)) {
      const error = await response.json();
      handleErrors(error);
    } else {
      return response.json().then((data) => {
        if (authFailure(data)) {
          return handleErrors(data);
        }
        return router.reload();
      });
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
      <InputField name="name" value={name} changeHandler={setName} />
      <InputField
        name="description"
        value={description}
        changeHandler={setDescription}
      />
      <button>Submit</button>
    </form>
  );
};

const networkFailure = (res) => res.status === 400;
const authFailure = (data) => data.detail;

export default TraitForm;
