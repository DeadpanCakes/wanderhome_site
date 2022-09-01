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
          <Accordian
            parent={<h2>{category.name}</h2>}
            key={"category" + category.id}
          >
            <ul>
              {category.nature_set.map((nature) => {
                return (
                  <li key={"nature" + nature.id}>
                    <input
                      className="natures"
                      type="checkbox"
                      value={nature.name}
                      id={nature.id}
                      onChange={() => {
                        setChosenNatures((prevState) => {
                          if (prevState.find((n) => n.id === nature.id)) {
                            return prevState.filter((n) => n.id !== nature.id);
                          }
                          return prevState.concat(nature);
                        });
                      }}
                      checked={
                        !!chosenNatures.find(
                          (choice) => choice.id === nature.id
                        )
                      }
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
