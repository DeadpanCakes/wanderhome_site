import { useState } from "react";
import styles from "../../styles/layouts/accordianLayout.module.css";

const Accordian = ({ parent, children }) => {
  console.log("mounted");
  const [isExpanded, setExpansion] = useState(false);
  const toggleExpansion = () => setExpansion((prevState) => !prevState);
  return (
    <div className={styles.accordian}>
      <div className={styles.parent}>
        {parent}
        <button onClick={toggleExpansion}>{isExpanded ? "^" : "v"}</button>
      </div>
      <div
        className={isExpanded ? styles.body : `${styles.body} ${styles.hidden}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordian;
