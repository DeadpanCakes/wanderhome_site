import ChildList from "../../../../../components/ChildList";

const NatureDetail = (props) => {
  const nature = JSON.parse(props.nature);
  return (
    <>
      <h1>{nature.name}</h1>
      <ChildList
        childArray={nature.move_set}
        category="Moves"
        baseURL="/cms/natures/Comfortable/Farm"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { nature: target } = context.params;
  const url = process.env.API + `natures/`;
  const response = await fetch(url);
  const data = await response.json();
  const nature = data.find((nature) => nature.name === target);
  return { props: { nature: JSON.stringify(nature) } };
};

export default NatureDetail;
