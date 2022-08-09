import { useState } from "react";
import Accordian from "./layouts/Accordian";
import React from "react";

const Month = ({
  months,
  currMonth,
  setMonth,
  setLack,
  setSigns,
  chosenLack,
  chosenSigns,
}) => {
  return (
    <>
      <Accordian parent={<h1>{currMonth.name}</h1>}>
        <form>
          <label htmlFor="monthSelector">What Month Is It?</label>
          <select
            id="monthSelector"
            title="monthSelector"
            onChange={(e) => {
              setMonth(months.find((month) => month.name === e.target.value));
            }}
          >
            {months.map((month) => (
              <option value={month.name} key={month.name}>
                {month.name}
              </option>
            ))}
          </select>
          <h2>Choose 1 that this place lacks. The others are all present.</h2>
          <ul>
            {currMonth.lack_set.map((lack) => (
              <li key={lack.id}>
                <input
                  type="checkbox"
                  id={lack.id}
                  className="lack"
                  name="lack"
                  value={lack}
                  checked={chosenLack.id == lack.id}
                  onChange={() => {
                    setLack((prevState) => {
                      if (prevState.id == lack.id) {
                        return { id: null };
                      }
                      const targetLack = currMonth.lack_set.find(
                        (l) => l.id === lack.id
                      );
                      return targetLack;
                    });
                  }}
                />
                <label htmlFor={lack.id}>{lack.text}</label>
              </li>
            ))}
          </ul>
          <h2>Choose 3-4 signs of the month found in this place.</h2>
          <ul>
            {currMonth.sign_set.map((sign) => {
              return (
                <li key={sign.id}>
                  <input
                    id={sign.text}
                    name="signs"
                    className="signs"
                    key={sign.text}
                    value={sign.text}
                    type="checkbox"
                    onChange={() => {
                      setSigns((prevState) => {
                        if (prevState.find((s) => s.id === sign.id)) {
                          return prevState.filter((s) => s.id !== sign.id);
                        }
                        return prevState.concat(
                          currMonth.sign_set.find((s) => s.id == sign.id)
                        );
                      });
                    }}
                  />
                  <label htmlFor={sign.text}>{sign.text}</label>
                </li>
              );
            })}
          </ul>
        </form>
      </Accordian>
    </>
  );
};

export default Month;
