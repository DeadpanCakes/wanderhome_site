import React from "react";
import styles from "../../styles/layouts/PopupLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const PopupLayout = ({ children, isVisible, closePopup }) => {
  return (
    <div
      className={
        isVisible ? styles.container : styles.container + " " + styles.hidden
      }
    >
      <button onClick={closePopup} className={styles.btn}>
        <FontAwesomeIcon icon={faX} />
      </button>
      {children}
    </div>
  );
};

export default PopupLayout;
