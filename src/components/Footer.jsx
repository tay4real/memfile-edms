import React from "react";
import logo from "../assets/img/memfileLogo.jpg";

const Footer = () => {
  return (
    <div>
      <footer className="main-footer d-flex justify-content-between">
        <span
          className="d-flex justify-content-start align-items-center"
          style={{ width: "20rem" }}
        >
          {" "}
          <a href="https://github.com/tay4real/memfile">
            <img src={logo} alt="MemFile" width="60" />{" "}
          </a>
          <strong> &copy; 2021. </strong>{" "}
          <span className="pl-1"> All rights reserved.</span>
        </span>

        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>
    </div>
  );
};

export default Footer;
