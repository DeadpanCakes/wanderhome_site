import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import styles from "../../styles/PCForm.module.css";
import PageLayout from "../layouts/PageLayout";
import usePlaybookInterfacer from "../../hooks/usePlaybookInterfacer";

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
                  setChosenPlaybook(usePlaybookInterfacer(choice));
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
                <label
                  className={styles.personalityOptionLabels}
                  htmlFor={"positive" + option.text}
                >{`Positive ${option.text}`}</label>
                <input
                  type="checkbox"
                  id={"positive" + option.text}
                  checked={personality.positive.choices.find(
                    (choice) => option.id == choice.id
                  )}
                  onChange={() => {
                    if (
                      personality.positive.choices.find(
                        (trait) => trait.id == option.id
                      )
                    ) {
                      return setPersonality((prevState) => {
                        return {
                          ...prevState,
                          positive: {
                            ...personality.positive,
                            choices: prevState.positive.choices.filter(
                              (trait) => trait.id != option.id
                            ),
                          },
                        };
                      });
                    }
                    const newTrait = chosenPlaybook.personality.option_set.find(
                      (trait) => option.id == trait.id
                    );
                    if (
                      personality.negative.choices.find(
                        (trait) => trait.id == option.id
                      )
                    ) {
                      return setPersonality((prevState) => {
                        return {
                          ...prevState,
                          negative: {
                            ...personality.negative,
                            choices: prevState.negative.choices.filter(
                              (trait) => trait.id !== option.id
                            ),
                          },
                          positive: {
                            ...personality.positive,
                            choices:
                              prevState.positive.choices.concat(newTrait),
                          },
                        };
                      });
                    }
                    return setPersonality((prevState) => {
                      return {
                        ...prevState,
                        positive: {
                          ...personality.positive,
                          choices: prevState.positive.choices.concat(newTrait),
                        },
                      };
                    });
                  }}
                />
                <p>{option.text}</p>
                <label
                  className={styles.personalityOptionLabels}
                  htmlFor={"negative" + option.text}
                >{`Negative ${option.text}`}</label>
                <input
                  type="checkbox"
                  id={"negative" + option.text}
                  checked={personality.negative.choices.find(
                    (choice) => option.id == choice.id
                  )}
                  onChange={() => {
                    if (
                      personality.negative.choices.find(
                        (trait) => trait.id == option.id
                      )
                    ) {
                      return setPersonality((prevState) => {
                        return {
                          ...prevState,
                          negative: {
                            ...personality.negative,
                            choices: prevState.negative.choices.filter(
                              (trait) => trait.id !== option.id
                            ),
                          },
                        };
                      });
                    }
                    const newTrait = chosenPlaybook.personality.option_set.find(
                      (trait) => option.id == trait.id
                    );
                    if (
                      personality.positive.choices.find(
                        (trait) => trait.id == option.id
                      )
                    ) {
                      return setPersonality((prevState) => {
                        return {
                          ...prevState,
                          positive: {
                            ...personality.positive,
                            choices: prevState.positive.choices.filter(
                              (trait) => trait.id !== option.id
                            ),
                          },
                          negative: {
                            ...personality.negative,
                            choices:
                              prevState.negative.choices.concat(newTrait),
                          },
                        };
                      });
                    }
                    return setPersonality((prevState) => {
                      return {
                        ...prevState,
                        negative: {
                          ...personality.negative,
                          choices: prevState.negative.choices.concat(newTrait),
                        },
                      };
                    });
                  }}
                />
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
              <li
                onChange={() => {
                  setLooks((prevState) => {
                    const lookAlreadyAdded = prevState.find(
                      (addedLooks) => addedLooks.id === look.id
                    );
                    if (lookAlreadyAdded) {
                      return prevState.filter(
                        (addedLooks) => addedLooks.id !== look.id
                      );
                    }
                    const newLook = chosenPlaybook.appearance_set.find(
                      (appearance) => appearance.id === look.id
                    );
                    return prevState.concat(newLook);
                  });
                }}
              >
                <input
                  type="checkbox"
                  id={look.id}
                  checked={looks.find(
                    (addedLooks) => addedLooks.id === look.id
                  )}
                />
                <label htmlFor={look.id}>{look.text}</label>
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
        pages={[PageOne, PageTwo, PageThree]}
        pageValidity={[pageOneValid, pageTwoValid]}
      />
    </form>
  );
};

export default PCForm;
