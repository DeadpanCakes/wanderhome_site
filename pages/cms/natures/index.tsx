import Link from "next/link";
import NatureCategoryForm from "../../../components/forms/natures/NatureCategoryForm";

const Natures = (props) => {
  const categories = JSON.parse(props.categories);
  return (
    <>
      <h1>Nature Categories</h1>
      <NatureCategoryForm />
      <h2>Natures</h2>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <Link href={`/cms/natures/${category.name}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getServerSideProps = async () => {
  const url = process.env.API + "nature-categories/";
  const response = await fetch(url);
  const data = await response.json();
  const categories = JSON.stringify(data);
  return { props: { categories } };
};

export default Natures;
