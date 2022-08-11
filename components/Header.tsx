import React from "react";
import AddBtn from "./AddBtn";
import usePopup from "../hooks/usePopup";
import PopupLayout from "./layouts/PopupLayout";
import Tools from "./Tools";

const Header = () => {
  const [toolVisible, toggleToolVisible] = usePopup();
  return (
    <header>
      <PopupLayout isVisible={toolVisible} closePopup={toggleToolVisible}>
        <Tools />
      </PopupLayout>
      <button onClick={toggleToolVisible}>Tools</button>
      <AddBtn text="Make New Character" href="/new/character" />
      <AddBtn text="Make New Place" href="/new/place" />
      <AddBtn text="Make New Kith" href="/new/kith" />
    </header>
  );
};

export default Header;
