import React, { useState } from "react";
import APIForm from "../../layouts/FormLayout";
import BooleanField from "../../BooleanField";
import InputField from "../../InputField";

const TraitCategoryForm = () => {
  const [name, setName] = useState("");
  const [isTraumatized, setIsTraumatized] = useState(false);
  const toggleIsTraumatized = () => setIsTraumatized((prevState) => !prevState);
  return (
    <APIForm payload={{ name }} url="/api/traits/categories" method="POST">
      <BooleanField
        name="isTraumatized"
        boolean={isTraumatized}
        toggler={toggleIsTraumatized}
      />
      <InputField name="name" value={name} changeHandler={setName} />
    </APIForm>
  );
};

export default TraitCategoryForm;
