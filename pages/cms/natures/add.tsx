import React, { useState } from "react";
import OptionInput from "../../../components/OptionInput";

const Add = () => {
  const [moves, setMoves] = useState([]);
  const [aesthetics, setAesthetics] = useState([]);
  const [folklore, setFolklore] = useState([]);
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" name="name"></input>
      <label htmlFor="description">Description</label>
      <input id="description" name="description"></input>
      <OptionInput name="moves" submittedData={moves} setSubmitted={setMoves} />
      <OptionInput
        name="aethetics"
        submittedData={aesthetics}
        setSubmitted={setAesthetics}
      />
      <OptionInput
        name="folklore"
        submittedData={folklore}
        setSubmitted={setFolklore}
      />
    </form>
  );
};

export default Add;
