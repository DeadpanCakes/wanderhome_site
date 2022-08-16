import React, { useState } from "react";
import AddBtn from "../AddBtn";
import styles from "../../styles/sidebar/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleSidebar = () => setCollapsed((prevState) => !prevState);
  const router = useRouter();
  return (
    <div
      className={
        collapsed ? styles.sidebar + " " + styles.hidden : styles.sidebar
      }
    >
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        X
      </button>
      <div className={styles.content}>
        {router.pathname === "/" ? null : (
          <Link href="/">
            <a>Back To Game</a>
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
