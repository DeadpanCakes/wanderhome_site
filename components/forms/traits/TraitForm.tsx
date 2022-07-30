import { useState } from "react";
import InputField from "../../InputField";
import APIForm from "../../layouts/FormLayout";
import BooleanField from "../../BooleanField";

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
      <p>{isMagic.toString()}</p>
      <BooleanField name="isMagic" boolean={isMagic} toggler={toggleIsMagic} />
      <InputField name="name" value={name} changeHandler={setName} />
      <InputField
        name="description"
        value={description}
        changeHandler={setDescription}
      />
    </APIForm>
  );
};

export default TraitForm;
