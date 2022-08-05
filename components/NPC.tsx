import Accordian from "./layouts/Accordian";
import ListLayout from "./layouts/ListLayout";
import React from "react";

const NPC = ({ npc }) => {
  const moves = npc.traits.reduce((arr, trait) => {
    return [...arr, ...trait.choices];
  }, []);
  const traitArr = npc.traits.map((trait) => trait.name);
  const traitStr = traitArr.join(". ");
  return (
    <div>
      <Accordian
        parent={
          <h2>
            {npc.name} ({npc.pronouns}), {npc.form}
          </h2>
        }
      >
        <i>{traitStr}.</i>
        <p>
          {npc.detail}, {npc.relationship}.
        </p>
        <ListLayout
          header={<h3>As {npc.name}, you can always:</h3>}
          list={moves}
        />
      </Accordian>
    </div>
  );
};

export default NPC;
