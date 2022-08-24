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
      }}
    >
      <Component {...pageProps} />
    </GameContext.Provider>
  );
}

export default MyApp;
