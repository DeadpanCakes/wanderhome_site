import { useState } from "react";
import PopupLayout from "../components/layouts/PopupLayout";

const usePopup = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prevState) => !prevState);
  return [visible, toggleVisible];
};

export default usePopup;
