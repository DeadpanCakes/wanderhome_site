import React from "react";
import ListLayout from "./layouts/ListLayout";
import styles from "../styles/playbook.module.css";

const Playbook = ({ playbook }) => {
  const {
    name,
    description,
    animals,
    personality,
    looks,
    histories,
    relationships,
    signatureMoves,
    seasonalMoves,
  } = playbookInterfacer(playbook);
  console.log(playbook);
  return (
    <div className={styles.playbook}>
      <div className={styles.header}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <ListLayout
        header={<h2>Choose an animal</h2>}
        list={animals.map((animal) => animal.text)}
      />
      <ListLayout
        header={<h2>{personality.prompt}</h2>}
        list={personality.options.map((option) => option.text)}
      />
      <ListLayout
        header={<h2>Choose 3-4 to describe your look</h2>}
        list={looks.map((option) => option.text)}
      />
      {histories.map((history) => {
        return (
          <ListLayout
            header={<h2>{history.prompt}</h2>}
            list={history.options.map((option) => option.text)}
          />
        );
      })}
      <ListLayout
        header={<h2>Ask 1 to the left and 1 to the right.</h2>}
        list={relationships.map((relationship) => relationship.text)}
      />
      <ListLayout
        header={<h2>Some things you can always do:</h2>}
        list={signatureMoves.map((move) => move.text)}
      />
      <ListLayout
        header={
          <h2>During each holiday, choose 1 you haven't chosen before.</h2>
        }
        list={seasonalMoves.map((move) => move.text)}
      />
    </div>
  );
};

const playbookInterfacer = (playbookAPI) => {
  return {
    ...playbookAPI,
    animals: playbookAPI.animal_set,
    looks: playbookAPI.appearance_set,
    histories: playbookAPI.history_set.map((history) => {
      return {
        prompt: history.prompt,
        options: history.option_set,
      };
    }),
    personality: {
      prompt: playbookAPI.personality.prompt,
      options: playbookAPI.personality.option_set,
    },
    relationships: playbookAPI.relationship_set,
    seasonalMoves: playbookAPI.seasonal_move_set,
    signatureMoves: playbookAPI.signature_move_set,
  };
};

export default Playbook;
