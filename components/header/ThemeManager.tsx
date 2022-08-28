import ThemeContext from "../context/ThemeContext";
import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import ToggleablePopup from "../layouts/ToggleablePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/header/ThemeManager.module.css";

const ThemeManager = () => {
  const { themes, activeTheme, setActiveTheme } = useContext(ThemeContext);
  return (
    <ToggleablePopup buttonContent={<FontAwesomeIcon icon={faPalette} />}>
      <h1>Theme Manager</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <ul className={styles.themeList}>
          {themes.map((t) => {
            return (
              <li
                key={t.id}
                style={{
                  color: t.fore,
                  background: t.backGradient,
                  border: `3px solid ${t.fore}`,
                }}
                className={styles.themes}
              >
                <input
                  onChange={() => {
                    setActiveTheme(t);
                  }}
                  type="checkbox"
                  id={t.name}
                  checked={activeTheme.id === t.id}
                  className={styles.inputs}
                />
                <label htmlFor={t.name} className={styles.labels}>
                  {t.name}
                </label>
              </li>
            );
          })}
        </ul>
      </form>
    </ToggleablePopup>
  );
};

export default ThemeManager;
