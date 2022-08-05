import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import styles from "../../styles/PCForm.module.css";
import PageLayout from "../layouts/PageLayout";

const PCForm = ({ playbooks }) => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [animal, setAnimal] = useState("");
  const [personality, setPersonality] = useState({});
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
  const submitHandler = console.log;

  useEffect(() => {
    checkPageOneIsValid();
  }, [chosenPlaybook]);

  const PageOne = (
    <div>
      <ul className={styles.playbookList}>
        {playbooks.map((playbook) => {
          return (
            <li className={styles.playbookListing} key={playbook.id}>
              <input
                type="checkbox"
                id={playbook.id}
                onChange={() => {
                  const target = playbook;
                  const choice = playbooks.find(
                    (playbook) => playbook.id === target.id
                  );
                  setChosenPlaybook({
                    ...choice,
                    personality: {
                      ...choice.personality,
                      prompt: {
                        text: choice.personality.prompt,
                        ...getPersonalityText(choice.name),
                      },
                    },
                  });
                }}
                checked={playbook.id === chosenPlaybook.id}
              />
              <label htmlFor={playbook.id}>
                <h2>{playbook.name}</h2>
                <p>{playbook.description}</p>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const PageTwo = (
    <div className={styles.pageTwo}>
      <div>
        <h2>Choose an animal</h2>
        <InputField name="animal" value={animal} changeHandler={setAnimal} />
        <ul>
          {chosenPlaybook.animal_set.map((animal) => (
            <li key={animal.id}>
              <p>{animal.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>{chosenPlaybook.personality.prompt.text}</h2>
        <div className={styles.indicator}>
          <p className="firstIndicator">
            {chosenPlaybook.personality.prompt.positive}
          </p>
          <p className="secondIndicator">
            {chosenPlaybook.personality.prompt.negative}
          </p>
        </div>
        <ul>
          {chosenPlaybook.personality.option_set.map((option) => {
            return (
              <li className={styles.personalityOption}>
                <input type="checkbox" />
                <p>{option.text}</p>
                <input type="checkbox" />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>Choose 3-4 to describe your look</h2>
        <ul className={styles.lookList}>
          {chosenPlaybook.appearance_set.map((look) => {
            return (
              <li>
                <input type="checkbox" />
                <label>{look.text}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

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
      <button
        onClick={() => console.log(getPersonalityText(chosenPlaybook.name))}
      >
        Check
      </button>
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
        pages={[PageOne, PageTwo, PageThree]}
        pageValidity={[pageOneValid]}
      />
    </form>
  );
};

const getPersonalityText = (playbook) => {
  //   personality: {
  //     positive: { prompt: "Values", choices: ["Expressive", "Patient"] },
  //     negative: { prompt: "Exhausted by", choices: ["Alert", "Organized"] },
  //   },
  switch (playbook) {
    case "The Caretaker":
      console.log("reached");
      return {
        positive: "You value being",
        negative: "You find it exhausting to be",
      };
    case "The Dancer":
      return {
        positive: "You are",
        negative: "You wish you were better at being",
      };
    case "The Exile":
      return {
        positive: "You are",
        negative: "You try not to be",
      };
    case "The Firelight":
      return {
        positive: "You try to be",
        negative: "You know you can't be",
      };
    case "The Fool":
      return {
        positive: "You are",
        negative: "You're worride you're not actually",
      };
    case "The Guardian":
      return {
        positive: "You generally are",
        negative: "People assume you always are",
      };
    case "The Moth Tender":
      return {
        positive: "Your job asks you to be",
        negative: "You actually are",
      };
    case "The Peddler":
      return {
        positive: "You are",
        negative: "You feel you need to be",
      };
    case "The Pilgrim":
      return {
        positive: "You try to be",
        negative: "You've given up on being",
      };
    case "The Poet":
      return {
        positive: "Based on your writing, people assume you are",
        negative: "You actuall are",
      };
    case "The Ragamuffin":
      return {
        positive: "You are",
        negative: "You refuse to be",
      };
    case "The Shepherd":
      return {
        positive: "These days, you still are",
        negative: "Now, you're just not",
      };
    case "The Teacher":
      return {
        positive: "You are",
        negative: "But now, you can't be",
      };
    case "The Vagabond":
      return {
        positive: "You call yourself",
        negative: "You staunchly insist you're not",
      };
    case "The Veteran":
      return {
        positive: "Sometimes you are",
        negative: "Yoe refuse to be",
      };
  }
};

export default PCForm;
