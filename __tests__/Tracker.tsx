import React from "react";
import Tracker from "../components/Tracker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

it("can properly increment and decrement count", async () => {
  const tokenName = "Token(s)";
  const user = userEvent.setup();
  render(<Tracker tokenName={tokenName} />);

  expect(screen.getByLabelText(tokenName)).toEqual(0);
  await user.click(screen.getByText("+"));
  expect(screen.getByLabelText(tokenName)).toEqual(1);
  await user.click(screen.getByText("-"));
  expect(screen.getByText(tokenName)).toEqual(0);
});
