import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import InputField from "../InputField";
import Accordian from "../layouts/Accordian";
import PageLayout from "../layouts/PageLayout";
import styles from "../../styles/PlaceForm.module.css";

const PlaceForm = ({ natureCategories, submitHandler }) => {
  const natures = natureCategories.map((cat) => cat.nature_set).flat();
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [resident, setResident] = useState("");
  const [residents, setResidents] = useState([]);
  const [residentIsValid, setResidentIsValid] = useState(false);
  const addResident = (newResident) => {
    setResidents((prevState) => prevState.concat(newResident));
  };
  const [god, setGod] = useState("");
  const [gods, setGods] = useState([]);
  const [godIsValid, setGodIsValid] = useState(false);
  const addGod = (newGod) => {
    setGods((prevState) => prevState.concat(newGod));
  };
  const [chosenNatures, setChosenNatures] = useState([]);
  const [natureIsValid, setNatureIsValid] = useState(false);
  const [chosenAesthetics, setChosenAesthetics] = useState([]);
  const [aestheticIsValid, setAestheticIsValid] = useState(false);
  const [chosenLore, setChosenLore] = useState([]);
  const [loreIsValid, setLoreIsValid] = useState(false);
  useEffect(() => {
    if (name.length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
    if (residents.length > 0) {
      setResidentIsValid(true);
    } else {
      setResidentIsValid(false);
    }
    if (gods.length > 0) {
      setGodIsValid(true);
    } else {
      setGodIsValid(false);
    }
    if (chosenNatures.length === 3) {
      setNatureIsValid(true);
    } else {
      setNatureIsValid(false);
    }
    if (chosenAesthetics.length === 6) {
      setAestheticIsValid(true);
    } else {
      setAestheticIsValid(false);
    }
    if (chosenLore.length === 3) {
      setLoreIsValid(true);
    } else {
      setLoreIsValid(false);
    }
  }, [name, residents, gods, chosenNatures, chosenAesthetics, chosenLore]);
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
  const PageOne = (
    <form onSubmit={(e) => e.preventDefault()}>
      <button
        onClick={() =>
          console.log(residents, residentIsValid, godIsValid, gods)
        }
      >
        Check
      </button>
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
                      id={aesthetic.id}
                      className="aesthetics"
                      type="checkbox"
                      checked={chosenAesthetics.find(
                        (choice) => choice.id === aesthetic.id
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
                      id={lore.id}
                      name={"lores" + lore.nature}
                      className={"lores"}
                      type="radio"
                      checked={chosenLore.find(
                        (choice) => choice.id === lore.id
                      )}
                    />
                    <label htmlFor={lore.id}>{lore.text}</label>
                  </li>
                ))}
            </ul>
          </>
        );
      })}
      <button
        disabled={!aestheticIsValid || !loreIsValid}
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
    <PageLayout
      pages={[PageOne, PageTwo]}
      pageValidity={[
        nameIsValid && residentIsValid && godIsValid && natureIsValid,
      ]}
    />
  );
};

const NatureList = ({
  categories,
  chosenNatures,
  setChosenNatures,
  natures,
}) => {
  return (
    <ul className={styles.natureList}>
      {categories.map((category) => {
        return (
          <Accordian parent={<h2>{category.name}</h2>}>
            <ul>
              {category.nature_set.map((nature) => {
                return (
                  <li
                    onChange={() => {
                      const natureElements =
                        document.querySelectorAll(".natures");
                      const checkedNatures = Array.from(natureElements).filter(
                        (nature: HTMLInputElement) => nature.checked
                      );
                      setChosenNatures(
                        natures.filter((nature) => {
                          return checkedNatures.find(
                            (checked) => checked.id === nature.id.toString()
                          );
                        })
                      );
                    }}
                  >
                    <input
                      className="natures"
                      type="checkbox"
                      value={nature.name}
                      id={nature.id}
                      checked={chosenNatures.find(
                        (choice) => choice.id === nature.id
                      )}
                    />
                    <label htmlFor={nature.id}>{nature.name}</label>
                  </li>
                );
              })}
            </ul>
          </Accordian>
        );
      })}
    </ul>
  );
};

export default PlaceForm;
