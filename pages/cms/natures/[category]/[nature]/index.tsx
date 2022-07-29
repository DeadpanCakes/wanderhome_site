import ChildList from "../../../../../components/ChildList";
import NatureMoveForm from "../../../../../components/forms/natures/NatureMoveForm";
import NatureAestheticForm from "../../../../../components/forms/natures/NatureAestheticForm";
import NatureLoreForm from "../../../../../components/forms/natures/NatureLoreForm";

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
      <NatureMoveForm nature={nature} />
      <ChildList
        childArray={nature.aesthetic_set}
        category="Aesthetics"
        baseURL="/cms/natures/Comfortabele/Farm"
      />
      <NatureAestheticForm nature={nature} />
      <ChildList
        childArray={nature.lore_set}
        category="Lore"
        baseURL="/cms/natures/Comfortable/Farm"
      />
      <NatureLoreForm nature={nature} />
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
