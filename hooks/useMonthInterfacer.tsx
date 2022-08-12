const useMonthInterfacer = (months) => {
  const getEventTrigger = (month) => {
    switch (month.name) {
      case "Tillsoil":
        return {
          tokenName: "Sprout",
          text: month.event.trigger,
          threshhold: 5,
        };
      case "Monsoon":
        return {
          tokenName: "Raindrop",
          text: month.event.trigger,
          threshhold: 8,
        };
      case "Bloommeadow":
        return {
          tokenName: "Flower",
          text: month.event.trigger,
          threshhold: 6,
        };
      case "Devildays":
        return {
          tokenName: "Meteor",
          text: month.event.trigger,
          threshhold: 10,
        };
      case "Swarming":
        return {
          tokenName: "Bug Shell",
          text: month.event.trigger,
          threshhold: 17,
        };
      case "Gateling":
        return {
          tokenName: "Moon",
          text: month.event.trigger,
          threshhold: 5,
        };
      case "Firetop":
        return {
          tokenName: "Leaf",
          text: month.event.trigger,
          threshhold: 7,
        };
      case "Grasping":
        return {
          tokenName: "Stone",
          text: month.event.trigger,
          threshhold: 9,
        };
      case "Snowblanket":
        return {
          tokenName: "Snowflake",
          text: month.event.trigger,
          threshhold: 6,
        };
      case "Frostbite":
        return {
          tokenName: "Star",
          text: month.event.trigger,
          threshhold: 13,
        };
    }
  };

  const monthInterfacer = (months) => {
    return months.map((month) => {
      let counter = 0;
      const resetCounter = () => (counter = 0);
      const incrementCounter = () => {
        counter++;
      };
      return {
        ...month,
        event: {
          ...month.event,
          trigger: {
            ...getEventTrigger(month),
            get counter() {
              return counter;
            },
            get isActive() {
              return counter >= this.threshhold;
            },
            resetCounter,
            incrementCounter,
          },
        },
      };
    });
  };
  return monthInterfacer(months);
};

export default useMonthInterfacer;
