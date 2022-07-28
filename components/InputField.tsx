const InputField = ({ name, value, changeHandler }) => {
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={changeHandler}
      ></input>
    </>
  );
};

export default InputField;
