import React, { useContext } from "react";
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
import ThemeContext from "../context/ThemeContext";

const Header = () => {
  const { activeTheme } = useContext(ThemeContext);
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
            <h1
              className={styles.title}
              style={{
                fontSize: "72px",
                color: activeTheme.fore,
              }}
            >
              Wanderhome
            </h1>
          </a>
        </Link>
        <ThemeManager />
      </header>
    </div>
  );
};

export default Header;
