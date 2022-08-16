import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import Head from "next/head";
import useStorage from "../hooks/useStorage";
import NPC from "../components/NPC";
import PlayerCharacter from "../components/PlayerCharacter";
import Place from "../components/Place";
import Month from "../components/Month";
import Link from "next/link";
import Header from "../components/header/Header";
import useMonthInterfacer from "../hooks/useMonthInterfacer";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/sidebar/Sidebar";
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
      <Head>
        <title>Wanderhome</title>
        <meta
          name="description"
          content="Web app for the tabletop role-playing game Wanderhome by Jay Dragon"
        />
        <meta
          name="keywords"
          content="Tabletop Role-Playing, TTRPG, Wanderhome"
        />
        <meta name="author" content="Anthony Mendoza" />
      </Head>
      <Header />
      <Sidebar />
      <main className={styles.dashboard}>
        {characters ? (
          <PlayerCharacter character={characters[0]} />
        ) : (
          <Link href="/new/character">
            <button>
              <a>No Character Made Yet. Make one!</a>
            </button>
          </Link>
        )}
        {activeMonth && activePlace ? (
          <div>
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
            <button>
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
            <button>
              <a>No Kith Made Yet. Make one!</a>
            </button>
          </Link>
        )}
      </main>
      <footer>
        <h3>Footer</h3>
      </footer>
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
