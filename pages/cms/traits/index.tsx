import Link from "next/link";

const Traits = (props) => {
  const categories = JSON.parse(props.categories);
  console.log(categories);
  return (
    <>
      <h1>Trait Categories</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" name="name"></input>
        <button>Submit</button>
      </form>
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
