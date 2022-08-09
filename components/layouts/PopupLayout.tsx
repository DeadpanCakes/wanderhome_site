import React from "react";
import styles from "../../styles/layouts/PopupLayout.module.css";

const PopupLayout = ({ children, isVisible, closePopup }) => {
  return (
    <div
      className={
        isVisible ? styles.container : styles.container + " " + styles.hidden
      }
    >
      <button onClick={closePopup} className={styles.btn}>
        X
      </button>
      {children}
    </div>
  );
};

export default PopupLayout;
