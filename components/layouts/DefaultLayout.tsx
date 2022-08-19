import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
