import { useState } from "react";
import APIForm from "../../layouts/FormLayout";
import InputField from "../../InputField";

const NatureMoveForm = ({ nature }) => {
  const [text, setText] = useState("");
  return (
    <APIForm
      payload={{ nature: nature.id, text }}
      url="/api/natures/moves"
      method="POST"
    >
      <InputField name="text" value={text} changeHandler={setText} />
    </APIForm>
  );
};

export default NatureMoveForm;
