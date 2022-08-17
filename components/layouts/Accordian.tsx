import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styles from "../../styles/layouts/accordianLayout.module.css";

const Accordian = ({ parent, children }) => {
  const [isExpanded, setExpansion] = useState(false);
  const toggleExpansion = () => setExpansion((prevState) => !prevState);
  return (
    <div className={styles.accordian}>
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
