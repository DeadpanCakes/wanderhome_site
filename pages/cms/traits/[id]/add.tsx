import { useState } from "react";
import OptionInput from "../../../../components/OptionInput";

const Add = (props) => {
  const category = JSON.parse(props.category);
  const [moves, setMoves] = useState([]);
  return (
    <form>
      <h1>New Trait for {category.name}</h1>
      <label htmlFor="name">Name</label>
      <input id="name" name="name"></input>
      <label htmlFor="description">Description</label>
      <input id="description" name="description"></input>
      <OptionInput name="moves" submittedData={moves} setSubmitted={setMoves} />
    </form>
  );
};
export const getStaticPaths = async () => {
  const response = await fetch(process.env.API + "trait-categories/");
  const data = await response.json();
  const paths = data.map((category) => {
    return { params: { id: category.id.toString() } };
  });
  return { paths, fallback: false };
};
export const getStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    process.env.API + `trait-categories/${params.id}/`
  );
  const data = await response.json();
  const category = JSON.stringify(data);
  return { props: { category } };
};

export default Add;
