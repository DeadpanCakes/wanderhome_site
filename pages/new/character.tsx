import React, { useEffect, useContext } from "react";
import PCForm from "../../components/forms/PCForm";
import GameContext from "../../components/context/GameContext";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import styles from "../../styles/NewCharacter.module.css";

const character = (props) => {
  const playbooks = JSON.parse(props.playbooks);
  const { characters, setCharacters, fetchCharacters, setActiveChar } =
    useContext(GameContext);
  useEffect(() => {
    if (!characters) {
      fetchCharacters();
    }
  }, []);
  const addCharacter = (newCharacter) => {
    setCharacters((prevState) => {
      if (prevState) {
        return prevState.concat(newCharacter);
      }
      return [newCharacter];
    });
    setActiveChar(newCharacter.id);
  };
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <PCForm playbooks={playbooks} submitHandler={addCharacter} />
      </main>
    </DefaultLayout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.API + "playbooks/");
  const playbooks = await res.json();
  return { props: { playbooks: JSON.stringify(playbooks) } };
};

export default character;
