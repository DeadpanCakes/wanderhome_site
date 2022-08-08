const getPersonalityText = (playbook) => {
  switch (playbook) {
    case "The Caretaker":
      return {
        positive: "You value being",
        negative: "You find it exhausting to be",
      };
    case "The Dancer":
      return {
        positive: "You are",
        negative: "You wish you were better at being",
      };
    case "The Exile":
      return {
        positive: "You are",
        negative: "You try not to be",
      };
    case "The Firelight":
      return {
        positive: "You try to be",
        negative: "You know you can't be",
      };
    case "The Fool":
      return {
        positive: "You are",
        negative: "You're worride you're not actually",
      };
    case "The Guardian":
      return {
        positive: "You generally are",
        negative: "People assume you always are",
      };
    case "The Moth Tender":
      return {
        positive: "Your job asks you to be",
        negative: "You actually are",
      };
    case "The Peddler":
      return {
        positive: "You are",
        negative: "You feel you need to be",
      };
    case "The Pilgrim":
      return {
        positive: "You try to be",
        negative: "You've given up on being",
      };
    case "The Poet":
      return {
        positive: "Based on your writing, people assume you are",
        negative: "You actuall are",
      };
    case "The Ragamuffin":
      return {
        positive: "You are",
        negative: "You refuse to be",
      };
    case "The Shepherd":
      return {
        positive: "These days, you still are",
        negative: "Now, you're just not",
      };
    case "The Teacher":
      return {
        positive: "You are",
        negative: "But now, you can't be",
      };
    case "The Vagabond":
      return {
        positive: "You call yourself",
        negative: "You staunchly insist you're not",
      };
    case "The Veteran":
      return {
        positive: "Sometimes you are",
        negative: "Yoe refuse to be",
      };
  }
};
const usePlaybookInterfacer = (playbook) => {
  return {
    ...playbook,
    personality: {
      ...playbook.personality,
      prompt: {
        text: playbook.personality.prompt,
        ...getPersonalityText(playbook.name),
      },
    },
  };
};

export default usePlaybookInterfacer;
