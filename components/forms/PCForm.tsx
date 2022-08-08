import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import styles from "../../styles/PCForm.module.css";
import PageLayout from "../layouts/PageLayout";
import PlaybookSelection from "./PlaybookSelection";
import PCDetailForm from "./PCDetail";
import useValidation from "../../hooks/useValidation";

const PCForm = ({ playbooks, submitHandler }) => {
  const router = useRouter();
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
  const [relationships, setRelationships] = useState([]);
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
  const personalityIsValid =
    personality.positive.choices.length === 2 &&
    personality.negative.choices.length === 2;
  const lookIsValid = 4 >= looks.length && looks.length >= 3;
  const historyIsValid = histories.length === chosenPlaybook.history_set.length;
  const relationshipIsValid = relationships.length === 2;
  const pageOneValid = useValidation(chosenPlaybook.id);
  const pageTwoValid = useValidation(animal, personalityIsValid, lookIsValid);
  const pageThreeValid = useValidation(
    historyIsValid,
    relationshipIsValid,
    name,
    pronouns
  );

  useEffect(() => {
    if (chosenPlaybook.id) {
      setPersonality((prevState) => {
        return {
          positive: {
            prompt: chosenPlaybook.personality.prompt.positive,
            choices: [],
          },
          negative: {
            prompt: chosenPlaybook.personality.prompt.negative,
            choices: [],
          },
        };
      });
    }
  }, [chosenPlaybook]);

  const PageThree = (
    <div className={styles.pageThree}>
      {chosenPlaybook.history_set.map((history) => {
        return (
          <div key={history.id}>
            <h2>{history.prompt}</h2>
            <ul>
              {history.option_set.map((option) => {
                return (
                  <li key={option.id}>
                    <input
                      type="checkbox"
                      id={option.id}
                      onChange={() => {
                        const chosenHistory = chosenPlaybook.history_set.find(
                          (h) => h.id == history.id
                        );
                        const chosenOption = chosenHistory.option_set.find(
                          (o) => o.id == option.id
                        );
                        const existingProp = histories.find(
                          (h) => h.id == history.id
                        );
                        if (existingProp) {
                          return setHistories((prevState) => {
                            return prevState.map((h) => {
                              if (h.id == existingProp.id) {
                                if (
                                  existingProp.choices.some(
                                    (choice) => choice.id == option.id
                                  )
                                ) {
                                  return {
                                    ...h,
                                    choices: h.choices.filter((o) => {
                                      o.id != option.id;
                                    }),
                                  };
                                }
                                return {
                                  ...h,
                                  choices: h.choices.concat(chosenOption),
                                };
                              }
                              return { ...h };
                            });
                          });
                        }
                        return setHistories((prevState) => {
                          return prevState.concat({
                            id: chosenHistory.id,
                            prompt: chosenHistory.prompt,
                            choices: [chosenOption],
                          });
                        });
                        /*
                        if you click on an option that belongs to a cat that already exists
                          check if cat already exists
                        
                          Return identical state except that cat
                          that cat will change one of two ways
                            if that option already exists in that cat instance
                              then filter it out
                            else
                              concatenate it
                        else if it does no exist
                          return identical state, but concat new instance
                        */
                      }}
                    />
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
        <ul>
          {chosenPlaybook.relationship_set.map((relationship) => {
            return (
              <li key={relationship.id}>
                <input
                  type="checkbox"
                  id={relationship.id}
                  onChange={() => {
                    setRelationships((prevState) => {
                      if (
                        prevState.find((choice) => relationship.id == choice.id)
                      ) {
                        return prevState.filter(
                          (choice) => choice.id == relationship.id
                        );
                      }
                      return prevState.concat(
                        chosenPlaybook.relationship_set.find(
                          (option) => option.id == relationship.id
                        )
                      );
                    });
                  }}
                />
                <label htmlFor={relationship.id}>{relationship.text}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        disabled={!pageThreeValid}
        onClick={() => {
          submitHandler({
            name,
            class: chosenPlaybook.name,
            pronouns,
            animal,
            personality,
            looks,
            histories,
            relationships,
            signatureMoves: chosenPlaybook.signature_move_set,
            seasonalMoves: chosenPlaybook.seasonal_move_set,
          });
          router.push("/");
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
      <button onClick={() => console.log(histories, relationshipIsValid)}>
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
