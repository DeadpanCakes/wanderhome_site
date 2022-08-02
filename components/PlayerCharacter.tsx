import GenericMoves from "./GenericMoves";
import ListLayout from "./layouts/ListLayout";
import Accordian from "./layouts/Accordian";
import styles from "../styles/PlayerCharacter.module.css";

const PlayerCharacter = () => {
  const character = {
    name: "Ari",
    class: "The Caretaker",
    animal: "Stoat",
    personality: {
      positive: { prompt: "Values", choices: ["Expressive", "Patient"] },
      negative: { prompt: "Exhausted by", choices: ["Alert", "Organized"] },
    },
    looks: [
      "Huge Glasses",
      "Ceremonial Robes",
      "Flowing Dress",
      "Constant Rythmic Tapping",
    ],
    histories: [
      {
        prompt:
          "Choose up to 5 friends that hide in the many shrines you carry with you.",
        choices: [
          "Dulcet, a god of tiny melodies. They are dramatic and/or glamorous.",
          "Furtive, a god of dust bunnies and cobwebs. They are quiet and/or invisible.",
          "Guile, a god of Gateling winds. They are watchful and/or oracular.",
          "Ia, a god of a misplaced kiss. They are caring and/or glamorous",
          "Lilt, a god of a tossed-aside creature. They are nervous and/or dead.",
        ],
      },
      {
        prompt:
          "Choose 1 ceremonial object you still honor and 1 you cannot treasure any longer. Tell the table about them.",
        choices: [
          "Honors: A box of beeswax candles, handmade by your learned mentor as part of their final lesson.",
          "No longer Treasures: A beautiful wooden walking stick adorned with feathers and runes, passed down through generations.",
        ],
      },
    ],
    relationships: [
      "Blank gave me Dulcet",
      "I listen to Cecilia when she feels small and forgotten",
    ],
    signatureMoves: [
      "Pause, tilt your head to the side, and keep going.",
      "Play with one of your gods.",
    ],
    seasonalMoves: [
      "Choose something a playbook can do. One of your gods learns how to do it.",
      "Choose something a place's nature can do. One of your gods learns how to do it.",
    ],
  };
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
          <Accordian parent={<h2>Appearance</h2>}>
            <ul>
              {character.looks.map((look) => {
                return <li>{look}</li>;
              })}
            </ul>
          </Accordian>
          <Accordian parent={<h2>Personality</h2>}>
            <h3>{character.personality.positive.prompt}:</h3>
            <ul>
              {character.personality.positive.choices.map((choice) => (
                <li key={choice}>{choice}</li>
              ))}
            </ul>
            <h3>{character.personality.negative.prompt}:</h3>
            <ul>
              {character.personality.negative.choices.map((choice) => (
                <li key={choice}>{choice}</li>
              ))}
            </ul>
          </Accordian>
        </div>
      </Accordian>
      <GenericMoves />
      <ListLayout
        header={<h2>You Can Always:</h2>}
        list={character.signatureMoves}
      />
      {character.histories.map((history) => {
        return (
          <ListLayout
            header={<h2>{history.prompt}</h2>}
            list={history.choices}
          />
        );
      })}
      <ListLayout
        header={
          <h2>
            During each seasonal holiday, choose 1 you haven't chosen before.
          </h2>
        }
        list={character.seasonalMoves}
      />
    </div>
  );
};

export default PlayerCharacter;
