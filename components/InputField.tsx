const InputField = ({ name, value, changeHandler }) => {
  return (
    <>
      <label htmlFor={name}>{name.toUpperCase()}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
      ></input>
    </>
  );
};

export default InputField;
