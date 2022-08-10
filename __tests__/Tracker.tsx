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
