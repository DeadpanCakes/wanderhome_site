import React, { useState, useEffect, useRef } from "react";
import AddBtn from "../AddBtn";
import styles from "../../styles/sidebar/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import useOutsideChecker from "../../hooks/useOutsideChecker";

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const lastClick = useRef(null);
  useOutsideChecker(lastClick, setVisible);
  const toggleSidebar = () => setVisible((prevState) => !prevState);
  const router = useRouter();
  return (
    <div
      className={
        !visible ? styles.sidebar + " " + styles.hidden : styles.sidebar
      }
      ref={lastClick}
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
      </div>
    </div>
  );
};

export default Sidebar;
