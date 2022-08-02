import Accordian from "./layouts/Accordian";
import ListLayout from "./layouts/ListLayout";

const NPC = () => {
  const npc = {
    name: "Anthony",
    form: "Mouse",
    relationship: "Friends with Ari",
    detail: "Guitarist",
    traits: [
      {
        name: "Caring",
        choices: ["Focus on an irrelevant detail", 'Ask: "What\'s this?"'],
      },
      {
        name: "Inquisitive",
        choices: [
          "Protect someone else from the world",
          "Inconvenience yourself to help someone else.",
        ],
      },
    ],
  };
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
            {npc.name}, {npc.form}
          </h2>
        }
      >
        <i>{traitStr}.</i>
        <p>
          {npc.detail}, {npc.relationship}.
        </p>
        <ListLayout header={<h3>{npc.name} can always:</h3>} list={moves} />
      </Accordian>
    </div>
  );
};

export default NPC;
