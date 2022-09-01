import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import GameContext from "../components/context/GameContext";
import ThemeContext from "../components/context/ThemeContext";
import useStorage from "../hooks/useStorage";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }) {
  const themes = [
    {
      id: "1",
      name: "The Caretaker",
      fore: "#603a58",
      back: "#ffdfd1",
      foreGradient:
        "linear-gradient(0deg,#603a58,#5e3956,#5c3854,#5a3653,#583551,#56344f,#54334d,#52324b,#503149,#4e2f48,#4c2e46,#4a2d44)",
      backGradient:
        "linear-gradient(15deg,#e4b49d,#e8b7a0,#ebbba4,#efbea8,#f2c2ac,#f5c6b0,#f7cab5,#f9ceba,#fbd2bf,#fdd6c5,#fedbcb,#ffdfd1)",
    },
    {
      id: "2",
      name: "The Dancer",
      fore: "#5e2f25",
      back: "#d1c2cf",
      foreGradient:
        "linear-gradient(90deg, #5e2f25, #5b2d24, #572c22, #542a21, #512920, #4d271f, #4a261d, #47241c)",
      backGradient:
        "linear-gradient(90deg, #d1c2cf, #d2c3d0, #d4c5d2, #d5c6d3, #d7c8d5, #d8c9d6, #dacbd8, #dbccd9)",
    },
    {
      id: "3",
      name: "The Exile",
      fore: "#383357",
      back: "#adc7c0",
      foreGradient:
        "linear-gradient(90deg, #383357, #353052, #322d4d, #2e2a49, #2b2744, #28253f, #25223b, #221f36)",
      backGradient:
        "linear-gradient(90deg, #adc7c0, #a9c5be, #a4c3bc, #a0c1ba, #9bc0b8, #96beb6, #92bcb5, #8dbab3)",
    },
    {
      id: "4",
      name: "The Firelight",
      fore: "#325063",
      back: "#e4b49d",
      foreGradient:
        "linear-gradient(90deg, #325063, #314e61, #2f4c5e, #2e4a5c, #2d4859, #2c4657, #2a4454, #294252)",
      backGradient:
        "linear-gradient(90deg, #e4b49d, #e4b29c, #e4b19a, #e4af99, #e4ae98, #e4ac96, #e4ab95, #e4a994)",
    },
    {
      id: "5",
      name: "The Fool",
      fore: "#793309",
      back: "#d1c2cf",
      foreGradient:
        "linear-gradient(90deg, #793309, #713009, #6a2d09, #622909, #5b2608, #532307, #4c2006, #451d05)",
      backGradient:
        "linear-gradient(90deg, #d1c2cf, #d2c1d2, #d3c0d5, #d3bfd8, #d3bfdc, #d2bee0, #d0bee4, #cebee8)",
    },
    {
      id: "6",
      name: "The Guardian",
      fore: "#562a30",
      back: "#adc7c0",
      foreGradient:
        "linear-gradient(90deg, #562a30, #52272c, #4f2428, #4b2124, #481e20, #441b1c, #411819, #3d1515)",
      backGradient:
        "linear-gradient(90deg, #adc7c0, #aac7be, #a8c7bb, #a6c8b8, #a4c8b5, #a3c7b1, #a3c7ad, #a3c7a9)",
    },
    {
      id: "7",
      name: "The Monthtender",
      fore: "#3c1b16",
      back: "#d1c2cf",
      foreGradient:
        "linear-gradient(90deg, #3c1b16, #381915, #341814, #301613, #2c1411, #281310, #24110e, #210f0c)",
      backGradient:
        "linear-gradient(90deg, #d1c2cf, #d1c0ce, #d1bfcc, #d1bdcb, #d1bbca, #d1b9c8, #d1b8c7, #d1b6c5)",
    },
    {
      id: "8",
      name: "The Peddler",
      fore: "#3a2538",
      back: "#adc7c0",
      foreGradient:
        "linear-gradient(90deg, #3a2538, #36273a, #33283b, #2f2a3c, #2c2b3c, #292c3c, #272d3b, #262e3a)",
      backGradient:
        "linear-gradient(90deg, #adc7c0, #a9c5c1, #a5c3c3, #a2c1c4, #a0bec5, #9fbcc6, #9eb9c7, #9fb6c7)",
    },
    {
      id: "9",
      name: "The Pilgrim",
      fore: "#583c25",
      back: "#e4b49d",
      foreGradient:
        "linear-gradient(90deg, #583c25, #573b24, #553a24, #543923, #533923, #523822, #503722, #4f3621)",
      backGradient:
        "linear-gradient(90deg, #e4b49d, #deaf99, #d8aa95, #d2a690, #cca18c, #c69c88, #c09884, #ba9380)",
    },
    {
      id: "10",
      name: "The Poet",
      fore: "#323525",
      back: "#adc7c0",
      foreGradient:
        "linear-gradient(90deg, #323525, #2f3223, #2c2f21, #2a2c1f, #27291d, #24271b, #222419, #1f2117)",
      backGradient:
        "linear-gradient(90deg, #adc7c0, #aac6c2, #a9c4c4, #a8c2c6, #a8c0c7, #a8bec7, #a9bcc8, #abbac7)",
    },
    {
      id: "11",
      name: "The Ragamuffin",
      fore: "#321719",
      back: "#e4b49d",
      foreGradient:
        "linear-gradient(90deg, #321719, #311618, #2f1618, #2e1517, #2d1516, #2c1416, #2a1415, #291314)",
      backGradient:
        "linear-gradient(90deg, #e4b49d, #ddb097, #d5ac91, #cea78b, #c6a385, #bf9f80, #b79b7b, #b09776)",
    },
    {
      id: "12",
      name: "The Shepherd",
      fore: "#6d2a1d",
      back: "#adc7c0",
      foreGradient:
        "linear-gradient(90deg, #6d2a1d, #69281c, #64271b, #60251a, #5c2318, #572117, #532016, #4f1e15)",
      backGradient:
        "linear-gradient(90deg, #adc7c0, #acc9bf, #aacabe, #aaccbc, #aacdb9, #abcfb7, #acd0b3, #aed1b0)",
    },
    {
      id: "13",
      name: "The Teacher",
      fore: "#5e2530",
      back: "#e4b49d",
      foreGradient:
        "linear-gradient(90deg, #5e2530, #5e2833, #5e2a36, #5e2d39, #5e2f3b, #5e323e, #5e3441, #5e3743)",
      backGradient:
        "linear-gradient(90deg, #e4b49d, #e5b19c, #e5ad9b, #e5aa9b, #e5a79b, #e5a39b, #e5a09c, #e49d9d)",
    },
    {
      id: "14",
      name: "The Vagabond",
      fore: "#233329",
      back: "#d1c2cf",
      foreGradient:
        "linear-gradient(90deg, #233329, #233329, #233329, #233329, #233329, #233329, #233329, #233329)",
      backGradient:
        "linear-gradient(90deg, #d1c2cf, #d0c0cf, #cfbecf, #cebdcf, #ccbbd0, #cbb9d0, #c9b8d0, #c7b6d1)",
    },
    {
      id: "15",
      name: "The Veteran",
      fore: "#542e21",
      back: "#adc7c0",
      foreGradient:
        "linear-gradient(90deg, #542e21, #512e20, #4e2d1e, #4b2c1d, #482c1c, #462b1b, #432b1b, #402a1a)",
      backGradient:
        "linear-gradient(90deg, #adc7c0, #aac7be, #a8c7bc, #a5c7ba, #a3c7b8, #a2c7b5, #a0c7b2, #9fc7af)",
    },
  ];
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [characters, setCharacters, fetchCharacters] = useStorage(
    "characters",
    null
  );
  const [kith, setKith, fetchKith] = useStorage("kith", null);
  const [places, setPlaces, fetchPlaces] = useStorage("places", null);
  const [counters, setCounters, fetchCounters] = useStorage("counters", null);
  const [activeChar, setActiveChar, fetchActiveChar] = useStorage(
    "activeChar",
    null
  );
  const [activePlace, setActivePlace, fetchActivePlace] = useStorage(
    "activePlace",
    null
  );
  const [activeKith, setActiveKith, fetchActiveKith] = useStorage(
    "activeKith",
    null
  );

  useEffect(() => {
    if (!characters) {
      fetchCharacters();
    }
    if (!kith) {
      fetchKith();
    }
    if (!places) {
      fetchPlaces();
    }
    if (!counters) {
      fetchCounters();
    }
    if (!activeChar) {
      fetchActiveChar();
    }
    if (!activePlace) {
      fetchActivePlace();
    }
    if (!activeKith) {
      fetchActiveKith();
    }
  }, []);
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
  return (
    <GameContext.Provider
      value={{
        characters,
        setCharacters,
        fetchCharacters,
        places,
        setPlaces,
        fetchPlaces,
        kith,
        setKith,
        fetchKith,
        counters,
        setCounters,
        fetchCounters,
        activeChar,
        setActiveChar,
        fetchActiveChar,
        activePlace,
        setActivePlace,
        fetchActivePlace,
        activeKith,
        setActiveKith,
        fetchActiveKith,
      }}
    >
      <ThemeContext.Provider value={{ themes, activeTheme, setActiveTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </GameContext.Provider>
  );
}

export default MyApp;
