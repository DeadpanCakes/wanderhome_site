import React, { useContext } from "react";
import Link from "next/link";
import GameContext from "../../components/context/GameContext";
import DefaultLayout from "../../components/layouts/DefaultLayout";

const Manage = () => {
  const {
    characters,
    places,
    kith,
    activeChar,
    setActiveChar,
    fetchActiveChar,
    activePlace,
    setActivePlace,
    fetchActivePlace,
    activeKith,
    setActiveKith,
    fetchActiveKith,
  } = useContext(GameContext);
  return (
    <DefaultLayout>
      <main>
        {characters ? (
          <SettingSelect
            options={characters}
            setChange={setActiveChar}
            selected={activeChar}
          />
        ) : (
          <p>No Chars Yet</p>
        )}
        {places ? (
          <SettingSelect
            options={places}
            setChange={setActivePlace}
            selected={activePlace}
          />
        ) : (
          <p>No Places Yet</p>
        )}
        <Link href="/manage/kith">
          <a>Manage Kith</a>
        </Link>
      </main>
    </DefaultLayout>
  );
};

const SettingSelect = ({ options, setChange, selected }) => {
  return (
    <select onChange={(e) => setChange(e.target.value)}>
      {options.map((o) => {
        return (
          <option value={o.id} key={o.id} selected={o.id === selected}>
            {o.name}
          </option>
        );
      })}
    </select>
  );
};

export default Manage;
