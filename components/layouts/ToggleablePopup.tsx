import React, { useState, useRef } from "react";
import PopupLayout from "./PopupLayout";
import useOutsideChecker from "../../hooks/useOutsideChecker";

const ToggleablePopup = ({ children, buttonContent }) => {
  const ref = useRef(null);
  const [isVisible, setVisibility] = useState(false);
  const toggleVisible = () => setVisibility((prevState) => !prevState);
  useOutsideChecker(ref, setVisibility);
  return (
    <div ref={ref}>
      <button onClick={toggleVisible}>{buttonContent}</button>
      <PopupLayout isVisible={isVisible} setVisibility={setVisibility}>
        {children}
      </PopupLayout>
    </div>
  );
};

export default ToggleablePopup;
