import React from "react";
import logo from "../assets/img/memfileLogo.jpg";

const Footer = () => {
  return (
    <div>
      <footer className="main-footer">
        <a href="https://github.com/tay4real/memfile">
          <img src={logo} alt="MemFile" width="70" />{" "}
        </a>
        <strong> © 2021 </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>
    </div>
  );
};

export default Footer;
