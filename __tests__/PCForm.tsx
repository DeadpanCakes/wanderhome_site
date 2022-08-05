import React from "react";
import PCForm from "../components/forms/PCForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const playbooks = [
  {
    id: 1,
    name: "The Caretaker",
    animal_set: [
      {
        id: 2,
        text: "Stoat",
      },
      {
        id: 3,
        text: "Lemur",
      },
    ],
    personality: {
      id: 4,
      prompt: "Choose 2 you value being and 2 that feel exhausting to be.",
      option_set: [
        { id: 5, text: "Alert" },
        { id: 6, text: "Patient" },
        { id: 29, text: "Friendly" },
        { id: 30, text: "Organized" },
      ],
    },
    appearance_set: [
      { id: 7, text: "Wooden Sandals" },
      { id: 8, text: "Huge Glasses" },
      { id: 27, text: "Scratchy Cloak" },
      { id: 28, text: "Wheelchair" },
    ],
    history_set: [
      {
        id: 9,
        prompt:
          "Choose up to 5 friends that hide in the many shrines you carry with you.",
        option_set: [
          {
            id: 10,
            text: "Dulcet, a god of tiny melodies. They are dramatic and/or •glamorous.",
          },
          {
            id: 11,
            text: "Furtive, a god of dust bunnies and cobwebs. They are quiet and/or •invisible.",
          },
        ],
      },
    ],
    relationship_set: [
      {
        id: 12,
        text: "Which of my small and forgotten gods did you rescue and give to me?",
      },
      {
        id: 13,
        text: "What do you know about the world that I don't?",
      },
    ],
  },
  {
    id: 14,
    name: "The Dancer",
    animal_set: [
      {
        id: 15,
        text: "Fox",
      },
      {
        id: 16,
        text: "Heron",
      },
    ],
    personality: {
      id: 17,
      prompt: "Choose 2 you are and 2 wish you were better at being.",
      option_set: [
        { id: 18, text: "Upbeat" },
        { id: 19, text: "Honest" },
      ],
    },
    appearance_set: [
      { id: 20, text: "Sunset-Shade Robes" },
      { id: 21, text: "Golden Jewelry" },
    ],
    history_set: [
      {
        id: 22,
        prompt:
          "Choose 3 dances you will gladly dance, and 1 you'll never dance again.",
        option_set: [
          {
            id: 23,
            text: "A dance you dance with wild creatures, to calm them and rejoice.",
          },
          {
            id: 24,
            text: "A dance you dance with all the winds in the sky, to invite the weather to change.",
          },
        ],
      },
    ],
    relationship_set: [
      {
        id: 25,
        text: "Why do I call you my best friend?",
      },
      {
        id: 26,
        text: "Why did I come with you when we left home?",
      },
    ],
  },
];

it("renders api to page", async () => {
  const user = userEvent.setup();
  render(<PCForm playbooks={playbooks} />);
  const caretaker = screen.getByLabelText("The Caretaker");
  expect(caretaker.tagName).toBe("INPUT");
});

it("handles checking checkbox", async () => {
  const user = userEvent.setup();
  render(<PCForm playbooks={playbooks} />);
  const caretaker: HTMLInputElement = screen.getByLabelText("The Caretaker");
  const dancer: HTMLInputElement = screen.getByLabelText("The Dancer");
  await user.click(caretaker);
  expect(caretaker.checked).toBe(true);
  await user.click(dancer);
  expect(dancer.checked).toBe(true);
  expect(caretaker.checked).toBe(false);
});

it("changes the shape of playbook.personality", async () => {
  const user = userEvent.setup();
  render(<PCForm playbooks={playbooks} />);
  const caretaker = screen.getByText("The Caretaker");
  const nextBtn = screen.getByText("Next");
  await user.click(caretaker);
  await user.click(nextBtn);
  expect(screen.getByText("You value being")).toBeInTheDocument();
  expect(screen.getByText("You find it exhausting to be")).toBeInTheDocument();
});

it("prevents user from progressing to the next page of the form with invalid data on current page", async () => {
  const user = userEvent.setup();
  render(<PCForm playbooks={playbooks} />);
  const playbookBoxes = document.querySelectorAll(".playbooks");
  const nextBtn: HTMLInputElement = screen.getByText("Next");
  const caretaker: HTMLInputElement = screen.getByLabelText("The Caretaker");
  expect(
    Array.from(playbookBoxes).every((box: HTMLInputElement) => !box.checked)
  );
  expect(nextBtn.disabled).toBeTruthy();
  await user.click(caretaker);
  expect(nextBtn.disabled).toBeFalsy();
  await user.click(nextBtn);
  expect(nextBtn.disabled).toBeTruthy();
  await user.type(screen.getByLabelText("ANIMAL"), "Stoat");
  await user.click(screen.getByLabelText("Positive Alert"));
  await user.click(screen.getByLabelText("Positive Patient"));
  await user.click(screen.getByLabelText("Negative Friendly"));
  await user.click(screen.getByLabelText("Negative Organized"));
  await user.click(screen.getByLabelText("Wooden Sandals"));
  await user.click(screen.getByLabelText("Huge Glasses"));
  await user.click(screen.getByLabelText("Scratchy Cloak"));
  await user.click(screen.getByLabelText("Wheelchair"));
  expect(nextBtn.disabled).toBeFalsy();
  await user.click(nextBtn);
  expect(nextBtn.disabled).toBeTruthy();
});
