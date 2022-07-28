const BooleanField = ({ name, boolean, toggler }) => {
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={boolean}
        onChange={toggler}
      ></input>
    </>
  );
};

export default BooleanField;
