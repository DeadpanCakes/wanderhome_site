import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import styles from "../../styles/PCForm.module.css";
import PageLayout from "../layouts/PageLayout";
import PlaybookSelection from "./PlaybookSelection";
import PCDetailForm from "./PCDetail";

const PCForm = ({ playbooks }) => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [animal, setAnimal] = useState("");
  const [personality, setPersonality] = useState({
    positive: {
      prompt: "",
      choices: [],
    },
    negative: {
      prompt: "",
      choices: [],
    },
  });
  const [looks, setLooks] = useState([]);
  const [histories, setHistories] = useState([]);
  const [relationship1, setRelationship1] = useState("");
  const [relationship2, setRelationship2] = useState("");
  const [chosenPlaybook, setChosenPlaybook] = useState({
    id: null,
    name: "",
    animal_set: [],
    personality: {
      prompt: { text: "", positive: "", negative: "" },
      option_set: [],
    },
    appearance_set: [],
    history_set: [],
    relationship_set: [],
    signature_move_set: [],
    seasonal_move_set: [],
  });
  const [pageOneValid, setPageOneValid] = useState(false);
  const [pageTwoValid, setPageTwoValid] = useState(false);
  const checkPageOneIsValid = () => setPageOneValid(!!chosenPlaybook.id);
  const personalityIsValid = () =>
    personality.positive.choices.length === 2 &&
    personality.negative.choices.length === 2;
  const lookIsValid = () => 4 >= looks.length && looks.length >= 3;
  const checkPageTwoIsValid = () =>
    setPageTwoValid(!!animal && !!personalityIsValid() && lookIsValid());
  const submitHandler = console.log;
  useEffect(() => {
    checkPageOneIsValid();
  }, [chosenPlaybook]);
  useEffect(() => {
    checkPageTwoIsValid();
  }, [personality, animal, looks]);

  const PageThree = (
    <div className={styles.pageThree}>
      {chosenPlaybook.history_set.map((history) => {
        return (
          <div>
            <h2>{history.prompt}</h2>
            <ul>
              {history.option_set.map((option) => {
                return (
                  <li key={option.id}>
                    <input type="checkbox" id={option.id} />
                    <label htmlFor={option.id}>{option.text}</label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div>
        <h2>Ask 1 to the left and 1 to the right</h2>
        <InputField
          name="relationship1"
          value={relationship1}
          changeHandler={setRelationship1}
        />
        <InputField
          name="relationship2"
          value={relationship2}
          changeHandler={setRelationship2}
        />
        <ul>
          {chosenPlaybook.relationship_set.map((relationship) => {
            return (
              <li>
                <p>{relationship.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => {
          submitHandler({
            name,
            class: chosenPlaybook.name,
            pronouns,
            animal,
            personality,
            looks,
            histories,
            relationships: [relationship1, relationship2],
            signatureMoves: chosenPlaybook.signature_move_set,
            seasonalMoves: chosenPlaybook.seasonal_move_set,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button onClick={() => console.log(personality)}>Check</button>
      <div className={styles.basic}>
        <InputField name="name" value={name} changeHandler={setName} />
        <p>{chosenPlaybook.name.toUpperCase()}</p>
        <InputField
          name="pronouns"
          value={pronouns}
          changeHandler={setPronouns}
        />
      </div>
      <PageLayout
        pages={[
          <PlaybookSelection
            playbooks={playbooks}
            chosenPlaybook={chosenPlaybook}
            setChosenPlaybook={setChosenPlaybook}
          />,
          <PCDetailForm
            animal={animal}
            setAnimal={setAnimal}
            chosenPlaybook={chosenPlaybook}
            personality={personality}
            setPersonality={setPersonality}
            looks={looks}
            setLooks={setLooks}
          />,
          PageThree,
        ]}
        pageValidity={[pageOneValid, pageTwoValid]}
      />
    </form>
  );
};

export default PCForm;
