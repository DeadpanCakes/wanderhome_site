import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import useStorage from "../hooks/useStorage";
import NPC from "../components/NPC";
import PlayerCharacter from "../components/PlayerCharacter";
import Place from "../components/Place";
import Month from "../components/Month";
import Link from "next/link";
import useMonthInterfacer from "../hooks/useMonthInterfacer";
import styles from "../styles/Home.module.css";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Meta from "../components/layouts/Meta";

export default function Home(props) {
  const rawMonths = JSON.parse(props.months);
  const months = useMonthInterfacer(rawMonths);

  const [characters, setCharacters, fetchCharacters] = useStorage(
    "characters",
    null
  );
  const [npcs, setNpcs, fetchNpcs] = useStorage("npcs", null);
  const [places, setPlaces, fetchPlaces] = useStorage("places", null);
  const [character, setCharacter, fetchCharacter] = useStorage(
    "character",
    null
  );
  const [lack, setLack] = useState({ id: null });
  const [signs, setSigns] = useState([]);
  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [activePlace, setActivePlace] = useState(null);
  const [counters, setCounters, fetchCounters] = useStorage("counters", null);

  useEffect(() => {
    if (!characters) {
      fetchCharacters();
    }
    if (!npcs) {
      fetchNpcs();
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
    <div>
      <DefaultLayout>
        <Meta />
        <main className={styles.dashboard}>
          {characters ? (
            <PlayerCharacter character={characters[0]} />
          ) : (
            <Link href="/new/character">
              <button className={styles.characterPlaceholder}>
                <a>No Character Made Yet. Make one!</a>
              </button>
            </Link>
          )}
          {activeMonth && activePlace ? (
            <div className={styles.env}>
              <Place
                month={{
                  ...activeMonth,
                  lack_set: lack
                    ? activeMonth.lack_set.filter((l) => lack.id !== l.id)
                    : activeMonth.lack_set,
                  sign_set: activeMonth.sign_set.filter((s) =>
                    signs.find((sign) => sign.id === s.id)
                  ),
                }}
                place={activePlace}
              />
              <Month
                months={months}
                currMonth={activeMonth}
                setMonth={setActiveMonth}
                setLack={setLack}
                setSigns={setSigns}
                chosenLack={lack}
                chosenSigns={signs}
              />
            </div>
          ) : (
            <Link href="/new/place">
              <button className={styles.placePlaceholder}>
                <a>No Places Made Yet. Make one!</a>
              </button>
            </Link>
          )}
          {npcs ? (
            <ul>
              {npcs.map((npc) => (
                <NPC npc={npc} />
              ))}
            </ul>
          ) : (
            <Link href="/new/kith">
              <button className={styles.kithPlaceholder}>
                <a>No Kith Made Yet. Make one!</a>
              </button>
            </Link>
          )}
        </main>
      </DefaultLayout>
    </div>
  );
}

export const getStaticProps = async () => {
  const monthRes = await fetch(process.env.API + "months/");
  const months = await monthRes.json();
  return {
    props: {
      months: JSON.stringify(months),
    },
  };
};
