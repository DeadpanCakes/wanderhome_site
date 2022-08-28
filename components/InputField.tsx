import React, { useContext } from "react";
import styles from "../styles/InputField.module.css";
import ThemeContext from "./context/ThemeContext";

const InputField = ({ name, value, changeHandler }) => {
  const { activeTheme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {name.toUpperCase()}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
        style={{ color: activeTheme.back, background: activeTheme.fore }}
      ></input>
    </div>
  );
};

export default InputField;
