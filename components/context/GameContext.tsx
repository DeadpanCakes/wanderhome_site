import React, { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";

const GameContext = React.createContext({
  characters: null,
  places: null,
  kith: null,
  counters: null,
});

export default GameContext;
