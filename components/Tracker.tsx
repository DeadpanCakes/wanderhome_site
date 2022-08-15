import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

interface Props {
  tokenName: string;
  threshhold?: number;
}

const Tracker = ({ tokenName, threshhold }: Props) => {
  const [counters, setCounters, fetchCounters] = useStorage("counters", null);
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

  useEffect(() => {
    if (!counters) {
      fetchCounters();
    }
  }, [counters]);
  useEffect(() => {
    if (!localStorage.getItem("counters")) {
      setCounters({
        Token: 0,
        Sprout: 0,
        Raindrop: 0,
        Flower: 0,
        Meteor: 0,
        "Bug Shell": 0,
        Moon: 0,
        Leaf: 0,
        Stone: 0,
        Snowflake: 0,
        Star: 0,
      });
    }
  }, []);
  return counters ? (
    <>
      <label htmlFor={tokenName}>{tokenName + "(s)"}</label>
      <input value={counters[tokenName]} readOnly={true} id={tokenName} />
      <button onClick={addToken}>+</button>
      <button onClick={spendToken}>-</button>
      <button onClick={resetCount} title="initCount">
        X
      </button>
    </>
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
