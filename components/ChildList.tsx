import Link from "next/link";

const ChildList = ({ category, childArray, baseURL }) => {
  return (
    <>
      <h2>{category}</h2>
      <ul>
        {childArray.map((child) => {
          return (
            <li>
              <Link href={`${baseURL}/${child.name}`}>
                <a>{child.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChildList;
