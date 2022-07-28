import { useState } from "react";
import { useRouter } from "next/router";
import useError from "../hooks/useError";
import Error from "../components/layouts/Error";
import InputField from "./InputField";
import APIForm from "./APIForm";

const TraitForm = ({ category }) => {
  const [isMagic, setIsMagic] = useState(false);
  const toggleIsMagic = () => setIsMagic((prevState) => !prevState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <APIForm
      payload={{
        is_magic: isMagic,
        name,
        description,
        category: category.id,
      }}
      url="/api/traits/trait"
      method="POST"
    >
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
    </APIForm>
  );
};

export default TraitForm;
