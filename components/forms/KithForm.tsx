import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import Accordian from "../layouts/Accordian";
import { v4 as uuid } from "uuid";
import PageLayout from "../layouts/PageLayout";
import useValidation from "../../hooks/useValidation";

const NPCForm = ({ traitCategories, submitHandler }) => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [form, setForm] = useState("");
  const [relationship, setRelationship] = useState("");
  const [detail, setDetail] = useState("");
  const [traits, setTraits] = useState([]);
  const [choices, setChoices] = useState([]);
  const pageOneValid = useValidation(
    name.length > 0,
    pronouns.length > 0,
    form.length > 0,
    relationship.length > 0,
    detail.length > 0,
    traits.length > 1
  );
  const pageTwoValid = useValidation(choices.length > 1);
  const allTraits = traitCategories
    .map((currCategory) => {
      return currCategory.trait_set;
    })
    .flat();
  const randomizeTraits = () => {
    const traits = [];
    const choices = [];
    while (traits.length < 2) {
      let random = allTraits[Math.floor(allTraits.length * Math.random())];
      if (!traits.find((trait) => trait.id === random.id)) {
        traits.push(random);
      }
    }
    traits.forEach((trait) => {
      const currTraitChoices = [];
      const quantity = Math.round(Math.random() * 1) + 1;
      while (currTraitChoices.length < quantity) {
        const random =
          trait.move_set[Math.floor(Math.random() * trait.move_set.length)];
        if (!currTraitChoices.find((choice) => choice.id === random.id)) {
          currTraitChoices.push(random);
        }
      }
      choices.push(currTraitChoices);
    });
    setTraits(traits);
    setChoices(choices.flat());
  };

  const SecondPage = (
    <>
      <h2>From each trait, choose 1-2 they can always do:</h2>
      <ul>
        {allTraits
          .filter((trait) => {
            return traits.map((trait) => trait.id).includes(trait.id);
          })
          .map((trait) => {
            return (
              <li>
                <h2>{trait.name}</h2>
                <ul>
                  {trait.move_set.map((move) => {
                    return (
                      <li>
                        <input
                          onChange={() => {
                            setChoices((prevState) => {
                              if (prevState.find((m) => m.id === move.id)) {
                                return prevState.filter(
                                  (m) => m.id !== move.id
                                );
                              }
                              return prevState.concat(
                                trait.move_set.find((m) => m.id === move.id)
                              );
                            });
                          }}
                          id={move.id}
                          className="moves"
                          value={move.text}
                          checked={choices.find(
                            (choice) => choice.id === move.id
                          )}
                          type="checkbox"
                        />
                        <label htmlFor={move.id}>{move.text}</label>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </>
  );
  const FirstPage = (
    <>
      <InputField name="name" value={name} changeHandler={setName} />
      <InputField
        name="pronouns"
        value={pronouns}
        changeHandler={setPronouns}
      />
      <InputField name="form" value={form} changeHandler={setForm} />
      <InputField
        name="relationship"
        value={relationship}
        changeHandler={setRelationship}
      />
      <InputField name="detail" value={detail} changeHandler={setDetail} />
      <ul>
        {traitCategories.map((category) => {
          return (
            <li>
              <Accordian parent={<h2>{category.name}</h2>}>
                <ul>
                  {category.trait_set.map((trait) => {
                    return (
                      <li>
                        <input
                          onChange={() => {
                            setTraits((prevState) => {
                              if (prevState.find((t) => t.id === trait.id)) {
                                return prevState.filter(
                                  (t) => t.id === trait.id
                                );
                              }
                              return prevState.concat(
                                category.trait_set.find(
                                  (t) => t.id === trait.id
                                )
                              );
                            });
                          }}
                          className="traits"
                          value={trait.name}
                          id={trait.id}
                          type="checkbox"
                          checked={traits
                            .map((trait) => trait.id)
                            .includes(trait.id)}
                        />
                        <label htmlFor={trait.id}>{trait.name}</label>
                      </li>
                    );
                    ("");
                  })}
                </ul>
              </Accordian>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button onClick={randomizeTraits}>Randomize</button>
      <PageLayout
        pages={[FirstPage, SecondPage]}
        pageValidity={[pageOneValid]}
      />
      <button
        disabled={!pageTwoValid}
        onClick={() =>
          submitHandler({
            id: uuid(),
            name,
            pronouns,
            form,
            relationship,
            detail,
            traits: traits.map((trait) => {
              return {
                id: trait.id,
                name: trait.name,
                choices: choices.filter((choice) => {
                  return choice.trait === trait.id;
                }),
              };
            }),
          })
        }
      >
        Submit
      </button>
    </form>
  );
};

export default NPCForm;
