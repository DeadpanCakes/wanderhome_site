import React from "react";
import Tracker from "../components/Tracker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

it("can properly increment and decrement count", async () => {
  const tokenName = "Token";
  const user = userEvent.setup();
  render(<Tracker tokenName={tokenName} />);

  const input: HTMLInputElement = screen.getByLabelText(tokenName, {
    exact: false,
  });

  expect(input.value).toEqual("0");
  await user.click(screen.getByText("+"));
  expect(input.value).toEqual("1");
  await user.click(screen.getByText("-"));
  expect(input.value).toEqual("0");
});

it("can reset the count", async () => {
  const tokenName = "Token";
  const user = userEvent.setup();
  render(<Tracker tokenName={tokenName} />);
  const input: HTMLInputElement = screen.getByLabelText(tokenName, {
    exact: false,
  });

  await user.click(screen.getByText("+"));
  await user.click(screen.getByTitle("initCount"));
  expect(input.value).toEqual("0");
});

it("tracks when a counter reaches its upper limit", async () => {
  const tokenName = "Raindrop";
  const user = userEvent.setup();
  const threshhold = 8;
  render(<Tracker tokenName={tokenName} threshhold={threshhold} />);
  const input: HTMLInputElement = screen.getByLabelText(tokenName, {
    exact: false,
  });
  let i = 0;
  while (i <= threshhold) {
    await user.click(screen.getByText("+"));
    i++;
  }
  expect(input.value).toEqual(threshhold.toString());
});

it("prevents subtraction from zero", async () => {
  const tokenName = "Token";
  const user = userEvent.setup();
  render(<Tracker tokenName={tokenName} />);
  const input: HTMLInputElement = screen.getByLabelText(tokenName, {
    exact: false,
  });

  await user.click(screen.getByText("-"));
  expect(input.value).toBe("0");
});
