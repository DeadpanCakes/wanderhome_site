import React, { useState, useRef } from "react";
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
import useOutsideChecker from "../../hooks/useOutsideChecker";

const Header = () => {
  const infoRef = useRef(null);
  const aboutRef = useRef(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  useOutsideChecker(infoRef, setInfoVisible);
  useOutsideChecker(aboutRef, setAboutVisible);
  const toggleInfo = () => setInfoVisible((prevState) => !prevState);
  const toggleVisible = () => setAboutVisible((prevState) => !prevState);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.btnContainer}>
          <div ref={infoRef}>
            <button onClick={toggleInfo}>
              <FontAwesomeIcon icon={faCircleInfo} size="lg" />
            </button>
            <PopupLayout isVisible={infoVisible} setVisibility={setInfoVisible}>
              <Info />
            </PopupLayout>
          </div>
          <div ref={aboutRef}>
            <button onClick={toggleVisible}>
              <FontAwesomeIcon icon={faScrewdriverWrench} size="lg" />
            </button>
            <PopupLayout
              isVisible={aboutVisible}
              setVisibility={setAboutVisible}
            >
              <Tools />
            </PopupLayout>
          </div>
        </div>
        <Link href="/">
          <a>
            <h1 className={styles.title}>Wanderhome</h1>
          </a>
        </Link>
      </header>
    </div>
  );
};

export default Header;
