import React from "react";
// import MessageDropdown from "./header/MessageDropdown";
import NotificationDropdown from "./header/NotificationDropdown";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <NavLink
            className="nav-link"
            data-widget="navbar-search"
            to="/search"
            role="button"
          >
            <i className="fas fa-search" />
          </NavLink>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        {/* Messages Dropdown Menu */}
        {/* <MessageDropdown /> */}

        {/* Notifications Dropdown Menu */}
        <NotificationDropdown />

        <li className="nav-item">
          <NavLink
            className="nav-link"
            data-widget="fullscreen"
            to=""
            role="button"
          >
            <i className="fas fa-expand-arrows-alt" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
