import React, { useState } from "react";
import AddBtn from "../AddBtn";
import styles from "../../styles/sidebar/Sidebar.module.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleSidebar = () => setCollapsed((prevState) => !prevState);
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
        <AddBtn text="Make New Character" href="/new/character" />
        <AddBtn text="Make New Place" href="/new/place" />
        <AddBtn text="Make New Kith" href="/new/kith" />
      </div>
    </div>
  );
};

export default Sidebar;
