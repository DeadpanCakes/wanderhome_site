import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext } from "react";
import styles from "../../styles/layouts/accordianLayout.module.css";
import ThemeContext from "../context/ThemeContext";

const Accordian = ({ parent, children }) => {
  const [isExpanded, setExpansion] = useState(false);
  const toggleExpansion = () => setExpansion((prevState) => !prevState);
  const { activeTheme } = useContext(ThemeContext);
  return (
    <div
      className={styles.accordian}
      style={{ color: activeTheme.back, background: activeTheme.fore }}
    >
      <button className={styles.parent} onClick={toggleExpansion}>
        {parent}
        <div className={styles.iconContainer}>
          {isExpanded ? (
            <FontAwesomeIcon icon={faCircleChevronUp} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faCircleChevronDown} size="2x" />
          )}
        </div>
      </button>
      <div
        className={isExpanded ? styles.body : `${styles.body} ${styles.hidden}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordian;
