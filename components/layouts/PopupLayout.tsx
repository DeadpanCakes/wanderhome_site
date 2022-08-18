import React from "react";
import styles from "../../styles/layouts/PopupLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const PopupLayout = ({ children, isVisible, setVisibility }) => {
  return (
    <div
      className={
        isVisible ? styles.container : styles.container + " " + styles.hidden
      }
    >
      <button onClick={() => setVisibility(false)} className={styles.btn}>
        <FontAwesomeIcon icon={faX} />
      </button>
      {children}
    </div>
  );
};

export default PopupLayout;
