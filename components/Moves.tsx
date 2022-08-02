import ListLayout from "./layouts/ListLayout";

const Moves = () => {
  const weakMoves = [
    "Inconvenience yourself to help someone else.",
    "Give away something you hold dear.",
    "Pause for a moment and get some rest.",
    "Leave an offering to a small or forgotten god.",
    "Speak your true feelings on a subject.",
    "Take a moment to bask in the grandeur of the world, and describe it to the table.",
    "Take a moment to watch a tiny moment of beauty, and describe it to the table.",
    "Take a moment to marvel at something no one has ever seen before, and ask the table to describe it.",
  ];
  const strongMoves = [
    "Provide a solution for an aspect of a material or immediate problem.",
    "Ease someone's pain, if only for a moment.",
    "Keep someone safe from the difficulties of the world.",
    "Offer someone the chance to connect with you on a personal level.",
    "Find what someone needs to give them a chance to change fundamentally.",
    "Reveal something hidden about the person in front of you, and ask them what it is.",
    "Know something important about the place you're in, and tell the table about it.",
    "Listen to the shared wisdom of the many small and forgotten gods, and ask the table what they tell you.",
  ];
  return (
    <>
      <ListLayout header={<h2>Earn a token when you:</h2>} list={weakMoves} />
      <ListLayout header={<h2>Spend a token to:</h2>} list={strongMoves} />
    </>
  );
};

export default Moves;
