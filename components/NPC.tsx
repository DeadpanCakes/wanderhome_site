import Accordian from "./layouts/Accordian";
import ListLayout from "./layouts/ListLayout";
import React from "react";

const NPC = ({ npc }) => {
  const moves = npc.traits.map((trait) => trait.choices).flat();
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
          header={<h3>{npc.name} can always:</h3>}
          list={moves.map((move) => move.text)}
        />
      </Accordian>
    </div>
  );
};

export default NPC;
