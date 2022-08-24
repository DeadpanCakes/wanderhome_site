import "../styles/globals.css";
import React, { useEffect } from "react";
import GameContext from "../components/context/GameContext";
import useStorage from "../hooks/useStorage";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </GameContext.Provider>
  );
}

export default MyApp;
