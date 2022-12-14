import React, { useState } from "react";
import OptionInput from "../../../components/OptionInput";

const Playbooks = () => {
  const [animals, setAnimals] = useState([]);
  const [personality, setPersonality] = useState([]);
  const [appearance, setAppearance] = useState([]);
  const [history, setHistory] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [signatureMoves, setSignatureMoves] = useState([]);
  const [seasonalMoves, setSeasonalMoves] = useState([]);

  return (
    <form method="POST" action={"/api/playbooks"}>
      <label htmlFor="name">Playbook Name</label>
      <input id="name" name="name"></input>
      <label htmlFor="description">Description</label>
      <input id="description" name="description"></input>
      <OptionInput
        name="animal"
        submittedData={animals}
        setSubmitted={setAnimals}
      />
      <OptionInput
        name="personality"
        submittedData={personality}
        setSubmitted={setPersonality}
      />
      <OptionInput
        name="appearance"
        submittedData={appearance}
        setSubmitted={setAppearance}
      />
      <OptionInput
        name="history"
        submittedData={history}
        setSubmitted={setHistory}
      />
      <OptionInput
        name="relationships"
        submittedData={relationships}
        setSubmitted={setRelationships}
      />
      <OptionInput
        name="signatureMoves"
        submittedData={signatureMoves}
        setSubmitted={setSignatureMoves}
      />
      <OptionInput
        name="seasonalMoves"
        submittedData={seasonalMoves}
        setSubmitted={setSeasonalMoves}
      />
      <button>Submit</button>
    </form>
  );
};

export default Playbooks;
