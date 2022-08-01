import TraitMoveForm from "../../../../../components/forms/traits/TraitMoveForm";

const traitName = (props) => {
  const trait = JSON.parse(props.trait);
  return (
    <>
      <button
        onClick={() => {
          deleteTrait(trait.id);
        }}
      >
        DELETE
      </button>
      <h1>{trait.name}</h1>
      <div>
        <p>{trait.is_magic ? "Is Magical" : "Is Not Magical"}</p>
        <button>Toggle</button>
      </div>
      <h2>Moves</h2>
      <TraitMoveForm trait={trait} />
      <ul>
        {trait.move_set.map((move) => {
          return <li>{move.text}</li>;
        })}
      </ul>
    </>
  );
};

const deleteTrait = async (id) => {
  const body = JSON.stringify({ id });
  const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
  const response = await fetch("/api/traits", {
    method: "DELETE",
    headers,
    body,
  });
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const trait = await fetchTrait(params.traitName);
  const props = { trait: JSON.stringify(trait) };
  return { props };
};

const fetchTrait = async (traitName) => {
  const url = process.env.API + "traits/";
  const response = await fetch(url);
  const data = await response.json();
  return data.find((trait) => trait.name === traitName);
};

export default traitName;
