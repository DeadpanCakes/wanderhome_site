import React, { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";

const GameContext = React.createContext(null);

export const GameContextProvider = ({ natures, months, children }) => {
  const [characters, setCharacters, fetchCharacters] = useStorage(
    "characters",
    null
  );
  const [kith, setKith, fetchKith] = useStorage("npcs", null);
  const [places, setPlaces, fetchPlaces] = useStorage("places", null);
  const [lack, setLack] = useState({ id: null });
  const [signs, setSigns] = useState([]);
  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [activePlace, setActivePlace] = useState(null);
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
  useEffect(() => {
    if (places) {
      setActivePlace(places[0]);
    }
  }, [places]);
  return (
    <GameContext.Provider
      value={{
        characters,
        kith,
        places,
        lack,
        signs,
        activeMonth,
        activePlace,
        counters,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
