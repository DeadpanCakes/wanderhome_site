import React from "react";
import Accordian from "./layouts/Accordian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/ActiveEvents.module.css";

const ActiveEvents = ({ events }) => {
  console.log(events);
  return (
    <ul>
      {events.map((e) => {
        return (
          <li key={e.id} className={styles.events}>
            <Accordian parent={<h2>During {e.name}</h2>}>
              <ul>
                {e.effect_set.map((f) => {
                  return (
                    <li key={f.id}>
                      <span className={styles.effects}>
                        <FontAwesomeIcon icon={faSeedling} />
                        <p>{f.text}</p>
                      </span>
                      {f.effect_move_set.length > 1 ? (
                        <ul>
                          {f.effect_move_set.map((m) => {
                            return (
                              <li className={styles.effectMoves}>
                                <FontAwesomeIcon icon={faSeedling} />
                                {m.text}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </Accordian>
          </li>
        );
      })}
    </ul>
  );
};

export default ActiveEvents;
