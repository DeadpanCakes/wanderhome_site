import { HTMLInputTypeAttribute, useState } from "react";
import InputField from "../InputField";
import Accordian from "../layouts/Accordian";
import { v4 as uuid } from "uuid";
import PageLayout from "../layouts/PageLayout";

const NPCForm = ({ traitCategories, submitHandler }) => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [form, setForm] = useState("");
  const [relationship, setRelationship] = useState("");
  const [detail, setDetail] = useState("");
  const [traits, setTraits] = useState([]);
  const [choices, setChoices] = useState([]);
  const allTraits = traitCategories
    .map((currCategory) => {
      return currCategory.trait_set;
    })
    .flat();

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
      <PageLayout pages={[FirstPage, SecondPage]} />
      <button
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
