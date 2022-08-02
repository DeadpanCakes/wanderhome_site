const ListLayout = ({ header, list }) => {
  return (
    <div>
      {header}
      <ul>
        {list.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default ListLayout;
