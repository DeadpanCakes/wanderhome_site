import React, { useState, useContext, useRef } from "react";
import AddBtn from "../AddBtn";
import styles from "../../styles/sidebar/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import useOutsideChecker from "../../hooks/useOutsideChecker";
import ThemeContext from "../context/ThemeContext";

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const lastClick = useRef(null);
  useOutsideChecker(lastClick, setVisible);
  const toggleSidebar = () => setVisible((prevState) => !prevState);
  const router = useRouter();
  const { activeTheme } = useContext(ThemeContext);
  return (
    <div
      className={
        !visible ? styles.sidebar + " " + styles.hidden : styles.sidebar
      }
      ref={lastClick}
      style={{ color: activeTheme.back, background: activeTheme.fore }}
    >
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={!visible ? faBars : faX} size="lg" />
      </button>
      <div className={styles.content}>
        {router.pathname === "/" ? null : (
          <Link href="/">
            <a className={styles.homeLink}>
              <FontAwesomeIcon icon={faAngleLeft} /> Back To Game
            </a>
          </Link>
        )}
        <AddBtn text="Make New Character" href="/new/character" />
        <AddBtn text="Make New Place" href="/new/place" />
        <AddBtn text="Make New Kith" href="/new/kith" />
        <Link href="/manage">
          <a>
            <button style={{ color: activeTheme.back }}>Manage Game</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
