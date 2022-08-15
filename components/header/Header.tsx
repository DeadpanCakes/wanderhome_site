import React, { useState } from "react";
import AddBtn from "../AddBtn";
import PopupLayout from "../layouts/PopupLayout";
import Tools from "./Tools";
import Info from "./Info";

const Header = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleInfo = () => setInfoVisible((prevState) => !prevState);
  const toggleVisible = () => setVisible((prevState) => !prevState);
  return (
    <header>
      <PopupLayout isVisible={infoVisible} closePopup={toggleInfo}>
        <Info />
      </PopupLayout>
      <PopupLayout isVisible={visible} closePopup={toggleVisible}>
        <Tools />
      </PopupLayout>
      <button onClick={toggleInfo}>About</button>
      <button onClick={toggleVisible}>Tools</button>
      <AddBtn text="Make New Character" href="/new/character" />
      <AddBtn text="Make New Place" href="/new/place" />
      <AddBtn text="Make New Kith" href="/new/kith" />
    </header>
  );
};

export default Header;
