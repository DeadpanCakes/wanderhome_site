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
