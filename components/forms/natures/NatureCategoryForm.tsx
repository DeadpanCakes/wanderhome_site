import React, { useState } from "react";
import APIForm from "../../layouts/FormLayout";
import InputField from "../../InputField";

const NatureCategoryForm = () => {
  const [name, setName] = useState("");
  return (
    <APIForm payload={{ name }} url="/api/natures/categories" method="POST">
      <InputField name="name" value={name} changeHandler={setName} />
    </APIForm>
  );
};

export default NatureCategoryForm;
