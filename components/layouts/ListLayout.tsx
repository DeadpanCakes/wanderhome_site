import React from "react";
import Accordian from "./Accordian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const ListLayout = ({ header, list }) => {
  return (
    <div>
      <Accordian parent={header}>
        <ul>
          {list.map((item) => {
            return (
              <li key={item}>
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
