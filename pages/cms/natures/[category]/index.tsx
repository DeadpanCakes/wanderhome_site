import React from "react";
import Link from "next/link";
import ChildList from "../../../../components/ChildList";
import NatureForm from "../../../../components/forms/natures/NatureForm";

const Nature = (props) => {
  const category = JSON.parse(props.category);
  return (
    <>
      <h1>{category.name}</h1>
      <NatureForm category={category} />
      <ChildList
        childArray={category.nature_set}
        category="Natures"
        baseURL={`/cms/natures/${category.name}`}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { category: target } = context.params;
  const url = process.env.API + "nature-categories/";
  const response = await fetch(url);
  const data = await response.json();
  const targetCategory = data.find((category) => category.name === target);
  return { props: { category: JSON.stringify(targetCategory) } };
};

export default Nature;
