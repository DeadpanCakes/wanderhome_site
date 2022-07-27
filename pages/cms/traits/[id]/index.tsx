import Link from "next/link";

const id = (props) => {
  const category = JSON.parse(props.category);
  return (
    <>
      <h1>{category.name}</h1>
      <div>
        <h2>Traits</h2>
        <Link href={`/cms/traits/${category.id}/add`}>
          <a>
            <button>+</button>
          </a>
        </Link>
      </div>
      <ul>
        {category.trait_set.map((trait) => {
          return <li key={trait.id}></li>;
        })}
      </ul>
    </>
  );
};

export const getStaticPaths = async (context) => {
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

export default id;
