import React, { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";

const GameContext = React.createContext({
  characters: null,
  setCharacters: null,
  fetchCharacters: null,
  places: null,
  setPlaces: null,
  fetchPlaces: null,
  kith: null,
  setKith: null,
  fetchKith: null,
  counters: null,
  setCounters: null,
  fetchCounters: null,
});

export default GameContext;
