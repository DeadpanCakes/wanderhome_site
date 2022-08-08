import React from "react";
import Accordian from "./Accordian";

const ListLayout = ({ header, list }) => {
  return (
    <div>
      <Accordian parent={header}>
        <ul>
          {list.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </Accordian>
    </div>
  );
};

export default ListLayout;
