import { useState } from "react";
import InputField from "../../InputField";
import BooleanField from "../../BooleanField";
import APIForm from "../../layouts/FormLayout";

const NatureLoreForm = ({ nature }) => {
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
      payload={{
        text,
        nature: nature.id,
        is_magic: isMagic,
        is_traumatized: isTraumatized,
        non_magic_text: nonMagicText,
        non_traumatized_text: nonTraumatizedText,
        non_traumatized_or_magic_text: nonTraumaNonMagicText,
      }}
      method="POST"
      url="/api/natures/lore"
    >
      <InputField name="text" value={text} changeHandler={setText} />
      <BooleanField name="isMagic" boolean={isMagic} toggler={toggleIsMagic} />
      <BooleanField
        name="isTraumatized"
        boolean={isTraumatized}
        toggler={toggleIsTraumatized}
      />
      <InputField
        name="nonMagicText"
        value={nonMagicText}
        changeHandler={setNonMagicText}
      />
      <InputField
        name="nonTraumatizedText"
        value={nonTraumatizedText}
        changeHandler={setNonTraumatizedText}
      />
      <InputField
        name="nonTraumaNonMagicText"
        value={nonTraumaNonMagicText}
        changeHandler={setNonTraumaNonMagicText}
      />
    </APIForm>
  );
};

export default NatureLoreForm;
