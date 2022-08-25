import React, { useState, useEffect, useContext } from "react";
import "whatwg-fetch";
import NPC from "../components/NPC";
import PlayerCharacter from "../components/PlayerCharacter";
import Place from "../components/Place";
import Month from "../components/Month";
import Link from "next/link";
import useMonthInterfacer from "../hooks/useMonthInterfacer";
import styles from "../styles/Home.module.css";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Meta from "../components/layouts/Meta";
import GameContext from "../components/context/GameContext";
import ThemeContext from "../components/context/ThemeContext";

export default function Home(props) {
  const rawMonths = JSON.parse(props.months);
  const months = useMonthInterfacer(rawMonths);
  const game = useContext(GameContext);
  const { activeTheme } = useContext(ThemeContext);
  const { characters, kith, places, activeChar, activePlace, activeKith } =
    game;

  const [lack, setLack] = useState({ id: null });
  const [signs, setSigns] = useState([]);
  const [activeMonth, setActiveMonth] = useState(months[0]);
  return (
    <div
      style={{ color: activeTheme.fore, background: activeTheme.backGradient }}
    >
      <DefaultLayout>
        <Meta />
        <main className={styles.dashboard}>
          {characters ? (
            <PlayerCharacter
              character={characters.find((char) => char.id === activeChar)}
            />
          ) : (
            <Link href="/new/character">
              <button className={styles.characterPlaceholder}>
                <a>No Character Made Yet. Make one!</a>
              </button>
            </Link>
          )}
          {activeMonth && places ? (
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
                place={places.find((p) => activePlace === p.id)}
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
          {game.kith && game.activeKith ? (
            game.kith.length > 0 ? (
              game.activeKith.length > 0 ? (
                <ul>
                  {game.kith
                    .filter((k) => activeKith.includes(k.id))
                    .map((npc) => (
                      <NPC npc={npc} />
                    ))}
                </ul>
              ) : (
                <Link href="/manage/kith">
                  <button className={styles.kithPlaceholder}>
                    <a>No Active Kith</a>
                  </button>
                </Link>
              )
            ) : (
              <Link href="/new/kith">
                <button className={styles.kithPlaceholder}>
                  <a>No Kith Made Yet. Make one!</a>
                </button>
              </Link>
            )
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
