import React from "react";
import styles from "../styles/InputField.module.css";

const InputField = ({ name, value, changeHandler }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{name.toUpperCase()}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default InputField;
