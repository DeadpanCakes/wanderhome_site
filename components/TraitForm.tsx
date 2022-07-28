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
  const router = useRouter();

  const submitTrait = async (info) => {
    const body = JSON.stringify(info);
    const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
    const response = await fetch("/api/traits/", {
      method: "POST",
      body,
      headers,
    });
    if (await checkIfFailed(response)) {
      setError(await response.json());
    } else {
      const data = await response.json();
      if (data.detail) {
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

const checkIfFailed = async (res) => {
  if (res.status === 400) {
    return await res.json();
  }
  return false;
};
export default TraitForm;
