import React, { useContext } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import GameContext from "../../components/context/GameContext";
import NPC from "../../components/NPC";

const Kith = () => {
  const { kith, activeKith, setActiveKith } = useContext(GameContext);
  console.log(kith);
  return (
    <DefaultLayout>
      <main>
        <h1>Manage Kith</h1>
        <h2>
          Here, you can decide which Kith to display on your dashboard by
          checking their box, or delete them by clicking on the X.
        </h2>
        <ul>
          {kith && activeKith
            ? kith.map((k) => {
                return (
                  <li key={k.id}>
                    <div>
                      <button>Edit</button>
                      <button>X</button>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeKith.includes(k.id)}
                    />
                    <NPC npc={k} />
                  </li>
                );
              })
            : null}
        </ul>
      </main>
    </DefaultLayout>
  );
};

export default Kith;
