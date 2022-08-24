import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import NPCForm from "../../components/forms/KithForm";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import GameContext from "../../components/context/GameContext";

const kith = (props) => {
  const traits = JSON.parse(props.traits);
  const router = useRouter();
  const { kith, setKith, fetchKith, setActiveKith } = useContext(GameContext);
  useEffect(() => {
    if (!kith) {
      fetchKith();
    }
  }, []);
  const addKith = (newNpc) => {
    setKith((prevState) => {
      if (kith) {
        return prevState.concat(newNpc);
      } else {
        return [newNpc];
      }
    });
    setActiveKith((prevState) => prevState.concat(newNpc.id));
  };
  return (
    <DefaultLayout>
      <main>
        <h1>Create A New Kith</h1>
        <NPCForm
          traitCategories={traits}
          submitHandler={(newKith) => {
            addKith(newKith);
            router.push("/");
          }}
        />
      </main>
    </DefaultLayout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.API + "trait-categories/");
  const traits = await res.json();
  return { props: { traits: JSON.stringify(traits) } };
};

export default kith;
