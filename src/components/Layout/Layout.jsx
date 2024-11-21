import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout({clearUserdata, crrUser}) {
  return (
    <>
    <div className="mt-3 pt-5">
      <Navbar clearUserdata={clearUserdata} crrUser={crrUser}/>

      <Outlet />

      <Footer />
      </div>
    </>
  );
}
