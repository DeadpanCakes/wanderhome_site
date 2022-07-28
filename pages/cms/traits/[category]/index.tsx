import Link from "next/link";
import TraitForm from "../../../../components/TraitForm";

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

export const getStaticPaths = async (context) => {
  const response = await fetch(process.env.API + "trait-categories/");
  const data = await response.json();
  const paths = data.map((category) => {
    return { params: { category: category.name } };
  });
  return { paths, fallback: false };
};
export const getStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(process.env.API + "trait-categories/");
  const data = await response.json();
  const category = data.find((category) => category.name === params.category);
  const props = { category: JSON.stringify(category) };
  return { props };
};

export default id;
