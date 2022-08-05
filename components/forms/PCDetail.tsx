import React from "react";
import styles from "../../styles/PCForm.module.css";
import InputField from "../InputField";

const PCDetailForm = ({
  animal,
  setAnimal,
  chosenPlaybook,
  personality,
  setPersonality,
  looks,
  setLooks,
}) => {
  return (
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
};

export default PCDetailForm;
