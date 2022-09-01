import React from "react";
import GenericMoves from "./GenericMoves";
import ListLayout from "./layouts/ListLayout";
import Accordian from "./layouts/Accordian";
import styles from "../styles/PlayerCharacter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Tracker from "./Tracker";
import { v4 as uuid } from "uuid";
import { ChildProcess } from "child_process";

const PlayerCharacter = ({ character }) => {
  return (
    <div>
      <Accordian
        parent={
          <h1>
            {character.name}, {character.animal}. {character.class}
          </h1>
        }
      >
        <div className={styles.characterDetail}>
          <div className={styles.firstLine}>
            <Accordian parent={<h2>Appearance</h2>}>
              <ul className={styles.appearance}>
                {character.looks.map((look) => {
                  return (
                    <li key={"look" + look.id}>
                      <FontAwesomeIcon icon={faSeedling} />
                      {look.text}
                    </li>
                  );
                })}
              </ul>
            </Accordian>
            <Accordian parent={<h2>Personality</h2>}>
              <div className={styles.personality}>
                <div>
                  <h3>{character.personality.positive.prompt}:</h3>
                  <ul>
                    {character.personality.positive.choices.map((choice) => (
                      <li key={"positive" + choice.id}>
                        <FontAwesomeIcon icon={faSeedling} />
                        {choice.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{character.personality.negative.prompt}:</h3>
                  <ul>
                    {character.personality.negative.choices.map((choice) => (
                      <li key={"negative" + choice.id}>
                        <FontAwesomeIcon icon={faSeedling} />
                        {uuid()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Accordian>
          </div>
          <Accordian parent={<h2>Background</h2>}>
            <div className={styles.history}>
              {character.histories
                .sort((a, b) => a.id - b.id)
                .map((history) => {
                  return (
                    <div key={"background" + history.id}>
                      <h2>{history.prompt}</h2>
                      <ul>
                        {history.choices.map((choice) => (
                          <li
                            className={styles.choice}
                            key={"history" + choice.id}
                          >
                            <FontAwesomeIcon icon={faSeedling} />
                            <p>{choice.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </Accordian>
        </div>
      </Accordian>
      <GenericMoves />
      <ListLayout
        header={<h2>You Can Always:</h2>}
        list={character.signatureMoves.map((move) => move.text)}
      />
      <ListLayout
        header={
          <h2>
            During each seasonal holiday, choose 1 you haven't chosen before.
          </h2>
        }
        list={character.seasonalMoves.map((move) => move.text)}
      />
      <Tracker tokenName={"Token"} />
    </div>
  );
};

export default PlayerCharacter;
