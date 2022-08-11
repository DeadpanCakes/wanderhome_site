import React from "react";
import Accordian from "./layouts/Accordian";
import styles from "../styles/PlaceForm.module.css";

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

export default NatureList;
