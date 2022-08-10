import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import InputField from "../InputField";
import Accordian from "../layouts/Accordian";
import { v4 as uuid } from "uuid";
import PageLayout from "../layouts/PageLayout";

const NPCForm = ({ traitCategories, submitHandler }) => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [pronouns, setPronouns] = useState("");
  const [pronounIsValid, setPronounIsValid] = useState(false);
  const [form, setForm] = useState("");
  const [FormIsValid, setFormIsValid] = useState(false);
  const [relationship, setRelationship] = useState("");
  const [relationIsValid, setRelationIsValid] = useState(false);
  const [detail, setDetail] = useState("");
  const [detailIsValid, setDetailIsValid] = useState(false);
  const [traits, setTraits] = useState([]);
  const [traitIsValid, setTraitIsValid] = useState(false);
  const [choices, setChoices] = useState([]);
  const [choiceIsValid, setChoiceIsValid] = useState(false);
  const allTraits = traitCategories
    .map((currCategory) => {
      return currCategory.trait_set;
    })
    .flat();

  useEffect(() => {
    if (name.length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
    if (pronouns.length > 0) {
      setPronounIsValid(true);
    } else {
      setPronounIsValid(false);
    }
    if (form.length > 0) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    if (relationship.length > 0) {
      setRelationIsValid(true);
    } else {
      setRelationIsValid(false);
    }
    if (detail.length > 0) {
      setDetailIsValid(true);
    } else {
      setDetailIsValid(false);
    }
    if (traits.length > 1) {
      setTraitIsValid(true);
    } else {
      setTraitIsValid(false);
    }
    if (choices.length > 2) {
      setChoiceIsValid(true);
    } else {
      setChoiceIsValid(false);
    }
  }, [
    nameIsValid,
    pronounIsValid,
    FormIsValid,
    relationIsValid,
    detailIsValid,
    traitIsValid,
    choiceIsValid,
  ]);

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
                <ul
                  onChange={() => {
                    const moves = document.querySelectorAll(".moves");
                    const checkedMoves = Array.from(moves).filter(
                      (move: HTMLInputElement) => move.checked
                    );
                    setChoices(
                      checkedMoves.map((move: HTMLInputElement) => move.value)
                    );
                  }}
                >
                  {trait.move_set.map((move) => {
                    return (
                      <li>
                        <input
                          id={move.id}
                          className="moves"
                          value={move.text}
                          checked={choices.includes(move.text)}
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
                <ul
                  onChange={() => {
                    const traits = document.querySelectorAll(".traits");
                    const checked = Array.from(traits).filter(
                      (trait: HTMLInputElement) => trait.checked
                    );
                    setTraits(
                      checked.map((checkedTrait) =>
                        allTraits.find(
                          (trait) =>
                            trait.id.toString() === checkedTrait.id.toString()
                        )
                      )
                    );
                  }}
                >
                  {category.trait_set.map((trait) => {
                    return (
                      <li>
                        <input
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
      <PageLayout
        pages={[FirstPage, SecondPage]}
        pageValidity={[
          nameIsValid &&
            pronounIsValid &&
            FormIsValid &&
            relationIsValid &&
            detailIsValid &&
            traitIsValid,
        ]}
      />
      <button
        disabled={!choiceIsValid}
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
                choices: trait.move_set
                  .filter((move) => choices.includes(move.text))
                  .map((move) => move.text),
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
