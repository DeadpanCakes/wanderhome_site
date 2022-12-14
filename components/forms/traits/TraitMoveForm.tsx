import React, { useState } from "react";
import APIForm from "../../layouts/FormLayout";
import BooleanField from "../../BooleanField";
import InputField from "../../InputField";

const TraitMoveForm = ({ trait }) => {
  const [text, setText] = useState("");
  const [isMagic, setIsMagic] = useState(false);
  const toggleIsMagic = () => setIsMagic((prevState) => !prevState);
  const [isTraumatized, setIsTraumatized] = useState(false);
  const toggleIsTraumatized = () => setIsTraumatized((prevState) => !prevState);
  const [nonMagicText, setNonMagicText] = useState("");
  const [nonTraumatizedText, setNonTraumatizedText] = useState("");
  const [nonTraumaNonMagicText, setNonTraumaNonMagicText] = useState("");

  return (
    <APIForm
      url="/api/traits/moves"
      method="POST"
      payload={{
        text,
        trait: trait.id,
        is_magic: isMagic,
        is_traumatized: isTraumatized,
        non_magic_text: nonMagicText,
        non_traumatized_text: nonTraumatizedText,
        non_traumatized_or_magic_text: nonTraumaNonMagicText,
      }}
    >
      <BooleanField name="isMagic" boolean={isMagic} toggler={toggleIsMagic} />
      <BooleanField
        name="isTraumatized"
        boolean={isTraumatized}
        toggler={toggleIsTraumatized}
      />
      <InputField name="text" value={text} changeHandler={setText} />
      {isMagic ? (
        <InputField
          name="nonMagicText"
          value={nonMagicText}
          changeHandler={setNonMagicText}
        />
      ) : null}
      {isTraumatized ? (
        <InputField
          name="nonTraumaText"
          value={nonTraumatizedText}
          changeHandler={setNonTraumatizedText}
        />
      ) : null}
      {isMagic && isTraumatized ? (
        <InputField
          name="nonMagicText"
          value={nonTraumaNonMagicText}
          changeHandler={setNonTraumaNonMagicText}
        />
      ) : null}
    </APIForm>
  );
};

export default TraitMoveForm;
