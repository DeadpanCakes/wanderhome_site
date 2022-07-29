import Link from "next/link";
import TraitCategoryForm from "../../../components/TraitCategoryForm";

const Traits = (props) => {
  const categories = JSON.parse(props.categories);
  return (
    <>
      <h1>Trait Categories</h1>
      <TraitCategoryForm />
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <Link href={`/cms/traits/${category.name}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(process.env.API + "trait-categories/");
  const data = await response.json();
  return {
    props: {
      categories: JSON.stringify(data),
    },
  };
};

export default Traits;
