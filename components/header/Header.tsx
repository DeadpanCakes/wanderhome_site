import React, { useState } from "react";
import Link from "next/link";
import Tools from "./Tools";
import Info from "./Info";
import styles from "../../styles/header/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import ToggleablePopup from "../layouts/ToggleablePopup";
import ThemeManager from "./ThemeManager";

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.btnContainer}>
          <ToggleablePopup
            buttonContent={<FontAwesomeIcon icon={faCircleInfo} size="lg" />}
          >
            <Info />
          </ToggleablePopup>
          <ToggleablePopup
            buttonContent={
              <FontAwesomeIcon icon={faScrewdriverWrench} size="lg" />
            }
          >
            <Tools />
          </ToggleablePopup>
        </div>
        <Link href="/">
          <a>
            <h1 className={styles.title}>Wanderhome</h1>
          </a>
        </Link>
        <ThemeManager />
      </header>
    </div>
  );
};

export default Header;
