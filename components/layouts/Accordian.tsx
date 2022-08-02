import { useState } from "react";
import styles from "../../styles/layouts/accordianLayout.module.css";

const Accordian = ({ parent, children }) => {
  const [isExpanded, setExpansion] = useState(false);
  const toggleExpansion = () => setExpansion((prevState) => !prevState);
  return (
    <div className={styles.accordian}>
      <button className={styles.parent} onClick={toggleExpansion}>
        {parent}
        <p>{isExpanded ? "^" : "v"}</p>
      </button>
      <div
        className={isExpanded ? styles.body : `${styles.body} ${styles.hidden}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordian;
