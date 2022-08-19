import React, { useEffect } from "react";
import PCForm from "../../components/forms/PCForm";
import useStorage from "../../hooks/useStorage";
import DefaultLayout from "../../components/layouts/DefaultLayout";

const character = (props) => {
  const playbooks = JSON.parse(props.playbooks);
  const [characters, setCharacter, fetchCharacter] = useStorage(
    "characters",
    null
  );
  useEffect(() => {
    if (!character) {
      fetchCharacter();
    }
  }, []);
  const addCharacter = (newCharacter) => {
    setCharacter((prevState) => {
      if (prevState) {
        return prevState.concat(newCharacter);
      }
      return [newCharacter];
    });
  };
  return (
    <DefaultLayout>
      <main>
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
