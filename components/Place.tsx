import Accordian from "./layouts/Accordian";
import ListLayout from "./layouts/ListLayout";

const Place = ({ month, place }) => {
  const natures = place.traits.map(
    (trait) => `${trait.name}- ${trait.description}`
  );
  const lore = place.traits.map((trait) => trait.lore.text);
  const aesthetics = place.traits
    .map((trait) => trait.aesthetics)
    .flat()
    .map((aesthetic) => aesthetic.text);
  const aestheticStr = aesthetics.join(". ") + ".";
  const residentStr = place.residents.join(", ");
  const godStr = place.gods.join(", ");
  const moves = place.traits
    .map((trait) => trait.moves)
    .flat()
    .map((move) => move.text);
  return (
    <div>
      <button onClick={() => console.log(month)}>Month in here</button>
      <Accordian
        parent={
          <h1>
            {place.name}, {month.name}
          </h1>
        }
      >
        <p>Residents: {residentStr}</p>
        <p>Gods: {godStr}</p>
        <ListLayout header={<h3>Lore</h3>} list={lore} />
      </Accordian>
      <p>
        <b>"{aestheticStr}"</b>
      </p>
      {natures.map((nature) => (
        <>
          <p key={nature}>
            <i>{nature}</i>
          </p>
        </>
      ))}
      <ListLayout header={<h2>This Place Can Always: </h2>} list={moves} />
    </div>
  );
};

export default Place;
