import React, { useEffect, useContext } from "react";
import useStorage from "../hooks/useStorage";
import styles from "../styles/Tracker.module.css";
import GameContext from "./context/GameContext";
import ThemeContext from "../components/context/ThemeContext";

interface Props {
  tokenName: string;
  threshhold?: number;
}

const Tracker = ({ tokenName, threshhold }: Props) => {
  const { counters, setCounters } = useContext(GameContext);
  const addToken = () =>
    setCounters((prevState) => {
      if (prevState[tokenName] >= threshhold) {
        return prevState;
      } else {
        return { ...prevState, [tokenName]: prevState[tokenName] + 1 };
      }
    });
  const spendToken = () =>
    setCounters((prevState) => {
      if (prevState[tokenName] <= 0) {
        return prevState;
      } else {
        return { ...prevState, [tokenName]: prevState[tokenName] - 1 };
      }
    });

  const resetCount = () =>
    setCounters((prevState) => ({ ...prevState, [tokenName]: 0 }));

  const { activeTheme } = useContext(ThemeContext);
  return counters ? (
    <div className={styles.tracker}>
      <label className={styles.token} htmlFor={tokenName}>
        {tokenName + "(s)"}
      </label>
      <input
        className={styles.counter}
        value={counters[tokenName]}
        readOnly={true}
        id={tokenName}
        style={{ color: activeTheme.back, background: activeTheme.fore }}
      />
      <div className={styles.controls}>
        <button className={styles.plus} onClick={addToken}>
          +
        </button>
        <button className={styles.minus} onClick={spendToken}>
          -
        </button>
        <button className={styles.init} onClick={resetCount} title="initCount">
          X
        </button>
      </div>
    </div>
  ) : (
    <>
      <label htmlFor={tokenName}>{tokenName + "(s)"}</label>
      <input value={0} readOnly={true} id={tokenName} />
      <button>+</button>
      <button>-</button>
      <button title="initCounter">X</button>
    </>
  );
};

export default Tracker;
