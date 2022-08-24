import React, { useContext } from "react";
import Link from "next/link";
import GameContext from "../../components/context/GameContext";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import styles from "../../styles/manage/index.module.css";

const Manage = () => {
  const {
    characters,
    places,
    activeChar,
    setActiveChar,
    activePlace,
    setActivePlace,
  } = useContext(GameContext);
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <div>
          <h2>Set Active Character</h2>
          {characters ? (
            <SettingSelect
              options={characters}
              setChange={setActiveChar}
              selected={activeChar}
            />
          ) : (
            <p>No Chars Yet</p>
          )}
        </div>
        <div>
          <h2>Set Active Place</h2>
          {places ? (
            <SettingSelect
              options={places}
              setChange={setActivePlace}
              selected={activePlace}
            />
          ) : (
            <p>No Places Yet</p>
          )}
        </div>
        <Link href="/manage/kith">
          <a className={styles.manageKith}>Manage Kith</a>
        </Link>
      </main>
    </DefaultLayout>
  );
};

const SettingSelect = ({ options, setChange, selected }) => {
  return (
    <select
      onChange={(e) => setChange(e.target.value)}
      className={styles.selectors}
    >
      {options.map((o) => {
        return (
          <option
            value={o.id}
            key={o.id}
            selected={o.id === selected}
            className={styles.options}
          >
            {o.name}
          </option>
        );
      })}
    </select>
  );
};

export default Manage;
