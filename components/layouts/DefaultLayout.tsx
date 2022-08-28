import React, { useContext } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import ThemeContext from "../context/ThemeContext";

const DefaultLayout = ({ children }) => {
  const { activeTheme } = useContext(ThemeContext);
  return (
    <div
      style={{ color: activeTheme.fore, background: activeTheme.backGradient }}
    >
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
