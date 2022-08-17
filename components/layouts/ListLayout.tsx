import React from "react";
import Accordian from "./Accordian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/layouts/ListLayout.module.css";

const ListLayout = ({ header, list }) => {
  return (
    <div className={styles.container}>
      <Accordian parent={header}>
        <ul>
          {list.map((item) => {
            return (
              <li key={item} className={styles.listing}>
                <FontAwesomeIcon icon={faSeedling} />
                {item}
              </li>
            );
          })}
        </ul>
      </Accordian>
    </div>
  );
};

export default ListLayout;
