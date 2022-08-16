import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <footer>Footer</footer>
    </>
  );
};

export default DefaultLayout;
