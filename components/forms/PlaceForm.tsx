import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import InputField from "../InputField";
import PageLayout from "../layouts/PageLayout";
import useValidation from "../../hooks/useValidation";
import NatureList from "../NatureList";
import useRandomIndex from "../../hooks/useRandomIndex";

const PlaceForm = ({ natureCategories, submitHandler }) => {
  const natures = natureCategories.map((cat) => cat.nature_set).flat();
  const [name, setName] = useState("");
  const [resident, setResident] = useState("");
  const [residents, setResidents] = useState([]);
  const addResident = (newResident) => {
    setResidents((prevState) => prevState.concat(newResident));
  };
  const [god, setGod] = useState("");
  const [gods, setGods] = useState([]);
  const addGod = (newGod) => {
    setGods((prevState) => prevState.concat(newGod));
  };
  const [chosenNatures, setChosenNatures] = useState([]);
  const [chosenAesthetics, setChosenAesthetics] = useState([]);
  const [chosenLore, setChosenLore] = useState([]);
  const pageOneValid = useValidation(
    name.length > 0,
    residents.length > 0,
    gods.length > 0,
    chosenNatures.length === 3
  );
  const pageTwoValid = useValidation(
    chosenAesthetics.length === 6,
    chosenLore.length === 3
  );
  const genTraits = () => {
    return chosenNatures.map((nature) => {
      return {
        id: nature.id,
        name: nature.name,
        description: nature.description,
        moves: nature.move_set,
        aesthetics: chosenAesthetics.filter(
          (aesthetic) => aesthetic.nature === nature.id
        ),
        lore: chosenLore.find((lore) => lore.nature === nature.id),
      };
    });
  };
  const randomizePlace = () => {
    const randomNatures = [];
    const randomAesthetics = [];
    const randomLore = [];
    while (randomNatures.length < 3) {
      const random = useRandomIndex(natures);
      if (!randomNatures.find((nature) => nature.id === random.id)) {
        randomNatures.push(random);
      }
    }
    randomNatures.forEach((nature) => {
      const currAesthetics = [];
      while (currAesthetics.length < 2) {
        const random = useRandomIndex(
          nature.aesthetic_set.filter(
            (aesthetic) =>
              aesthetic.text !== "Something Else Of Your Own Invention"
          )
        );
        if (!currAesthetics.find((aesthetic) => aesthetic.id === random.id)) {
          currAesthetics.push(random);
        }
      }
      randomAesthetics.push(currAesthetics);
      randomLore.push(
        useRandomIndex(
          nature.lore_set.filter(
            (nature) => nature.text !== "Something Else Of Your Own Invention"
          )
        )
      );
    });
    setChosenNatures(randomNatures);
    setChosenAesthetics(randomAesthetics.flat());
    setChosenLore(randomLore);
  };
  const PageOne = (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputField name="name" value={name} changeHandler={setName} />
      <ul>
        {residents.map((resident) => (
          <li key={resident} id={resident}>
            <p>{resident}</p>
            <button
              onClick={() => {
                const target = document.getElementById(resident);
                target.remove();
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <InputField
          name="resident"
          value={resident}
          changeHandler={setResident}
        />
        <button
          onClick={() => {
            if (resident.length > 0) {
              addResident(resident);
              setResident("");
            }
          }}
        >
          Add Resident
        </button>
      </div>
      <ul>
        {gods.map((god) => (
          <li key={god} id={god}>
            <p>{god}</p>
            <button
              onClick={() => {
                const target = document.getElementById(god);
                target.remove();
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <InputField name="god" value={god} changeHandler={setGod} />
        <button
          onClick={() => {
            if (god.length > 0) {
              addGod(god);
              setGod("");
            }
          }}
        >
          Add God
        </button>
      </div>
      <NatureList
        categories={natureCategories}
        chosenNatures={chosenNatures}
        setChosenNatures={setChosenNatures}
        natures={natures}
      />
    </form>
  );
  const PageTwo = (
    <form onSubmit={(e) => e.preventDefault()}>
      {chosenNatures.map((nature) => {
        return (
          <>
            <h2>{nature.name}</h2>
            <h3>Choose 2 aesthetic elements</h3>
            <ul>
              {natures
                .find(
                  (currNature) =>
                    nature.id.toString() === currNature.id.toString()
                )
                .aesthetic_set.map((aesthetic) => (
                  <li
                    onChange={() => {
                      const aestheticElements =
                        document.querySelectorAll(".aesthetics");
                      const checkedAesthetics = Array.from(
                        aestheticElements
                      ).filter((e: HTMLInputElement) => e.checked);
                      const allAesthetics = natures
                        .map((nature) => nature.aesthetic_set)
                        .flat();
                      const chosenAesthetics = allAesthetics.filter(
                        (aesthetic) =>
                          checkedAesthetics.find(
                            (checked) => checked.id === aesthetic.id.toString()
                          )
                      );
                      setChosenAesthetics(chosenAesthetics);
                    }}
                  >
                    <input
                      id={aesthetic.text}
                      className="aesthetics"
                      type="checkbox"
                      checked={chosenAesthetics.find(
                        (choice) => choice.text === aesthetic.text
                      )}
                    />
                    <label htmlFor={aesthetic.id}>{aesthetic.text}</label>
                  </li>
                ))}
            </ul>
            <h3>Choose 1 Folklore about this place</h3>
            <ul>
              {natures
                .find(
                  (currNature) =>
                    nature.id.toString() === currNature.id.toString()
                )
                .lore_set.map((lore) => (
                  <li
                    onChange={() => {
                      const lore = document.querySelectorAll(".lores");
                      const checkedLore = Array.from(lore).filter(
                        (lore: HTMLInputElement) => lore.checked
                      );
                      const allLore = natures
                        .map((nature) => nature.lore_set)
                        .flat();
                      setChosenLore(
                        allLore.filter((lore) =>
                          checkedLore.find(
                            (checked) =>
                              checked.id.toString() === lore.id.toString()
                          )
                        )
                      );
                    }}
                  >
                    <input
                      id={lore.text}
                      name={"lores" + lore.nature}
                      className={"lores"}
                      type="radio"
                      checked={chosenLore.find(
                        (choice) => choice.text === lore.text
                      )}
                    />
                    <label htmlFor={lore.text}>{lore.text}</label>
                  </li>
                ))}
            </ul>
          </>
        );
      })}
      <button
        disabled={pageTwoValid}
        onClick={() =>
          submitHandler({
            id: uuid(),
            name,
            residents,
            gods,
            traits: genTraits(),
          })
        }
      >
        Submit
      </button>
    </form>
  );
  return (
    <>
      <button onClick={randomizePlace}>Randomize</button>
      <PageLayout pages={[PageOne, PageTwo]} pageValidity={[pageOneValid]} />
    </>
  );
};
export default PlaceForm;
