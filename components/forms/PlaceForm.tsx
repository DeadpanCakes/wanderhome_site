import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import InputField from "../InputField";
import PageLayout from "../layouts/PageLayout";
import useValidation from "../../hooks/useValidation";
import NatureList from "../NatureList";

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
      const random = getRandomIndex(natures);
      if (!randomNatures.find((nature) => nature.id === random.id)) {
        randomNatures.push(random);
      }
    }
    randomNatures.forEach((nature) => {
      const currAesthetics = [];
      while (currAesthetics.length < 2) {
        const random = getRandomIndex(
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
        getRandomIndex(
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
                  <li>
                    <input
                      onChange={() => {
                        setChosenAesthetics((prevState) => {
                          if (prevState.find((a) => a.id == aesthetic.id)) {
                            return prevState.filter(
                              (a) => a.id !== aesthetic.id
                            );
                          }
                          const currAesthetic = nature.aesthetic_set.find(
                            (a) => a.id == aesthetic.id
                          );
                          return prevState.concat(currAesthetic);
                        });
                      }}
                      id={"aesthetic" + aesthetic.id}
                      className="aesthetics"
                      type="checkbox"
                      checked={chosenAesthetics.some(
                        (choice) => choice.id === aesthetic.id
                      )}
                    />
                    <label htmlFor={"aesthetic" + aesthetic.id}>
                      {aesthetic.text}
                    </label>
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
                  <li>
                    <input
                      onChange={() => {
                        setChosenLore((prevState) => {
                          if (prevState.some((l) => l.id === lore.id)) {
                            return prevState.filter((l) => l.id !== lore.id);
                          }
                          return prevState
                            .filter((l) => l.nature !== lore.nature)
                            .concat(
                              nature.lore_set.find((l) => l.id === lore.id)
                            );
                        });
                      }}
                      id={"lore" + lore.id}
                      name={"lores" + lore.nature}
                      className={"lores"}
                      type="checkbox"
                      checked={chosenLore.some(
                        (choice) => choice.id === lore.id
                      )}
                    />
                    <label htmlFor={"lore" + lore.id}>{lore.text}</label>
                  </li>
                ))}
            </ul>
          </>
        );
      })}
      <button
        disabled={!pageTwoValid}
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
      <button onClick={() => console.log(chosenAesthetics, chosenLore)}>
        Check
      </button>
      <button onClick={randomizePlace}>Randomize</button>
      <PageLayout pages={[PageOne, PageTwo]} pageValidity={[pageOneValid]} />
    </>
  );
};

const getRandomIndex = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default PlaceForm;
