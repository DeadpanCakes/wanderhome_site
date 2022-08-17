import React, { useState } from "react";
import Link from "next/link";
import PopupLayout from "../layouts/PopupLayout";
import Tools from "./Tools";
import Info from "./Info";
import styles from "../../styles/header/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleInfo = () => setInfoVisible((prevState) => !prevState);
  const toggleVisible = () => setVisible((prevState) => !prevState);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.btnContainer}>
          <button onClick={toggleInfo}>
            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
          </button>
          <button onClick={toggleVisible}>
            <FontAwesomeIcon icon={faScrewdriverWrench} size="lg" />
          </button>
        </div>
        <Link href="/">
          <a>
            <h1 className={styles.title}>Wanderhome</h1>
          </a>
        </Link>
      </header>
      <PopupLayout isVisible={infoVisible} closePopup={toggleInfo}>
        <Info />
      </PopupLayout>
      <PopupLayout isVisible={visible} closePopup={toggleVisible}>
        <Tools />
      </PopupLayout>
    </div>
  );
};

export default Header;
