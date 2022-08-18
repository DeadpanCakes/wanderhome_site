import { useRouter } from "next/router";
import React, { useEffect } from "react";
import NPCForm from "../../components/forms/KithForm";
import useStorage from "../../hooks/useStorage";
import DefaultLayout from "../../components/layouts/DefaultLayout";

const kith = (props) => {
  const traits = JSON.parse(props.traits);
  const router = useRouter();
  const [npcs, setNpcs, fetchNpcs] = useStorage("npcs", null);
  useEffect(() => {
    if (!npcs) {
      fetchNpcs();
    }
  }, []);
  const addNpc = (newNpc) => {
    setNpcs((prevState) => {
      if (npcs) {
        return prevState.concat(newNpc);
      } else {
        return [newNpc];
      }
    });
  };
  return (
    <DefaultLayout>
      <main>
        <h1>Create A New Kith</h1>
        <NPCForm
          traitCategories={traits}
          submitHandler={(newNpc) => {
            addNpc(newNpc);
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
