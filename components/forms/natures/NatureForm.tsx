import { useState } from "react";
import APIForm from "../../layouts/APIForm";
import InputField from "../../InputField";

const NatureCategoryForm = ({ category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <APIForm
      payload={{ name, description, category: category.id }}
      url="/api/natures/nature"
      method="POST"
    >
      <InputField name="name" value={name} changeHandler={setName} />
      <InputField
        name="description"
        value={description}
        changeHandler={setDescription}
      />
    </APIForm>
  );
};

export default NatureCategoryForm;
