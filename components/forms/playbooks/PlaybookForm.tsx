import React, { useState } from "react";
import InputField from "../../InputField";
import APIForm from "../../layouts/FormLayout";

const PlaybookForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <APIForm
      payload={{ name, description }}
      method="POST"
      url="/api/playbooks/playbook"
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

export default PlaybookForm;
