import Link from "next/link";

const ChildList = ({ category, childArray, baseURL }) => {
  const getText = (child) => (child.name ? child.name : child.text);
  return (
    <>
      <h2>{category}</h2>
      <ul>
        {childArray.map((child) => {
          return (
            <li key={child.id}>
              <Link href={`${baseURL}/${child.id}`}>
                <a>{getText(child)}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChildList;
