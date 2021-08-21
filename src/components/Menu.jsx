import React from "react";
import logo from "../assets/img/logo.png";

import BrandLogo from "./menu/BrandLogo";
import Sidebar from "./menu/Sidebar";

const Menu = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <BrandLogo logo={logo} name="MemFile" to="/" />
      {/* Sidebar */}
      <Sidebar />
      {/* /.sidebar */}
    </aside>
  );
};

export default Menu;
