const traitName = (props) => {
  const trait = JSON.parse(props.trait);
  return (
    <>
      <h1>{trait.name}</h1>
    </>
  );
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
