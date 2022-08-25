import ThemeContext from "../context/ThemeContext";
import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";

const ThemeManager = () => {
  const { themes, activeTheme, setActiveTheme } = useContext(ThemeContext);
  return (
    <select
      onChange={(e) => {
        const target = e.target.value;
        const newTheme = themes.find((theme) => theme.id === target);
        setActiveTheme(newTheme);
      }}
    >
      {themes.map((theme) => (
        <option value={theme.id} key={theme.id}>
          {theme.name} test
        </option>
      ))}
    </select>
  );
};

export default ThemeManager;
