import { useState } from "react";
import OptionInput from "../../../../components/OptionInput";

const Add = () => {
  const [moves, setMoves] = useState([]);
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" name="name"></input>
      <label htmlFor="description">Description</label>
      <input id="description" name="description"></input>
      <OptionInput name="moves" submittedData={moves} setSubmitted={setMoves} />
    </form>
  );
};

export default Add;
