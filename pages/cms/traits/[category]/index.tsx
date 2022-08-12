import Link from "next/link";
import TraitForm from "../../../../components/forms/traits/TraitForm";
import React from "react";
const id = (props) => {
  const category = JSON.parse(props.category);
  return (
    <>
      <h1>{category.name}</h1>
      <div>
        <h2>Traits</h2>
        <TraitForm category={category} />
      </div>
      <ul>
        {category.trait_set.map((trait) => {
          return (
            <li key={trait.id}>
              <Link href={`/cms/traits/${category.name + "/" + trait.name}`}>
                <a>
                  <h2>{trait.name}</h2>
                </a>
              </Link>
              <p>{trait.description}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const categories = await fetch(process.env.API + "trait-categories/").then(
    (data) => data.json()
  );
  const category = categories.find(
    (cat) => cat.name === context.params.category
  );
  return { props: { category: JSON.stringify(category) } };
};

export default id;
