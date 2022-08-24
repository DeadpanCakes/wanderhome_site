import React, { useState, useContext } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import GameContext from "../../components/context/GameContext";
import NPC from "../../components/NPC";
import PopupLayout from "../../components/layouts/PopupLayout";

const Kith = () => {
  const { kith, setKith, activeKith, setActiveKith } = useContext(GameContext);
  const [deleteTarget, setDeleteTarget] = useState(null);
  return (
    <DefaultLayout>
      <main>
        <h1>Manage Kith</h1>
        <h2>
          Here, you can decide which Kith to display on your dashboard by
          checking their box, or delete them by clicking on the X.
        </h2>
        <PopupLayout
          isVisible={deleteTarget}
          setVisibility={() => setDeleteTarget(null)}
        >
          {deleteTarget ? (
            <>
              <h2>
                Are you sure you want to delete{" "}
                {kith.find((k) => k.id === deleteTarget).name}?
              </h2>
              <button
                onClick={() => {
                  setKith((prevState) =>
                    prevState.filter((p) => p.id !== deleteTarget)
                  );
                  setActiveKith((prevState) =>
                    prevState.filter((p) => p !== deleteTarget)
                  );
                  setDeleteTarget(null);
                }}
              >
                Yes
              </button>
              <button onClick={() => setDeleteTarget(null)}>No</button>
            </>
          ) : null}
        </PopupLayout>
        <ul>
          {kith && activeKith
            ? kith.map((k) => {
                return (
                  <li key={k.id}>
                    <div>
                      <button>Edit</button>
                      <button
                        onClick={() => {
                          setDeleteTarget(k.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeKith.includes(k.id)}
                      onChange={() => {
                        setActiveKith((prevState) => {
                          if (prevState.includes(k.id)) {
                            return prevState.filter((p) => p !== k.id);
                          }
                          return prevState.concat(k.id);
                        });
                      }}
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
