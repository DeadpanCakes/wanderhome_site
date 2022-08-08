import React from "react";
import GenericMoves from "./GenericMoves";
import ListLayout from "./layouts/ListLayout";
import Accordian from "./layouts/Accordian";
import styles from "../styles/PlayerCharacter.module.css";

const PlayerCharacter = ({ character }) => {
  return (
    <div>
      <Accordian
        parent={
          <h1>
            {character.name}, {character.animal}. {character.class.name}
          </h1>
        }
      >
        <div className={styles.characterDetail}>
          <Accordian parent={<h2>Appearance</h2>}>
            <ul>
              {character.looks.map((look) => {
                return <li key={look.id}>{look.text}</li>;
              })}
            </ul>
          </Accordian>
          <Accordian parent={<h2>Personality</h2>}>
            <h3>{character.personality.positive.prompt}:</h3>
            <ul>
              {character.personality.positive.choices.map((choice) => (
                <li key={choice.text}>{choice.text}</li>
              ))}
            </ul>
            <h3>{character.personality.negative.prompt}:</h3>
            <ul>
              {character.personality.negative.choices.map((choice) => (
                <li key={choice.text}>{choice.text}</li>
              ))}
            </ul>
          </Accordian>
        </div>
      </Accordian>
      <GenericMoves />
      <ListLayout
        header={<h2>You Can Always:</h2>}
        list={character.signatureMoves.map((move) => move.text)}
      />
      {character.histories.map((history) => {
        return (
          <ListLayout
            header={<h2>{history.prompt}</h2>}
            list={history.choices.map((choice) => choice.text)}
          />
        );
      })}
      <ListLayout
        header={
          <h2>
            During each seasonal holiday, choose 1 you haven't chosen before.
          </h2>
        }
        list={character.seasonalMoves.map((move) => move.text)}
      />
    </div>
  );
};

export default PlayerCharacter;
