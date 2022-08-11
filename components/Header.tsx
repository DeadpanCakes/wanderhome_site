import React, { useState } from "react";
import AddBtn from "./AddBtn";
import PopupLayout from "./layouts/PopupLayout";
import Tools from "./Tools";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prevState) => !prevState);
  return (
    <header>
      <PopupLayout isVisible={visible} closePopup={toggleVisible}>
        <Tools />
      </PopupLayout>
      <button onClick={toggleVisible}>Tools</button>
      <AddBtn text="Make New Character" href="/new/character" />
      <AddBtn text="Make New Place" href="/new/place" />
      <AddBtn text="Make New Kith" href="/new/kith" />
    </header>
  );
};

export default Header;
