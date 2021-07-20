import React, { useState, useEffect } from "react";
import { navigation, admin_nav } from "../../_nav";

const SidebarSearch = () => {
  const [search, setSearch] = useState("");
  const [filteredNav, setFilteredNav] = useState([]);

  useEffect(() => {
    let navArray = [];
    if (navigation.length !== 0) {
      navigation.map((item) => navArray.push(item.items));
    }
    if (admin_nav.length !== 0) {
      admin_nav.map((item) => navArray.push(item.items));
    }
    setFilteredNav(navArray);
  }, [navigation, admin_nav]);
  console.log(filteredNav);
  const searchNav = () => {
    let result;
    if (navigation.length !== 0 && search !== "") {
      result = navigation.map((item) =>
        item.items.filter((item) => item.anchor === search)
      );
    }
    console.log(result);
  };

  const onChangeHandler = (e) => {
    setSearch(e.currentTarget.value.substr(0, 20));
  };

  return (
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input
          className="form-control form-control-sidebar"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={onChangeHandler}
        />
        <div className="input-group-append">
          <button className="btn btn-sidebar" onClick={() => searchNav()}>
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
      <div className="sidebar-search-results">
        <div className="list-group">
          {/* {names
            .filter((name) => name.includes("J"))
            .map((filteredName) => (
              <li>{filteredName}</li>
            ))} */}
          <a
            href="/docs/3.1//components/main-header.html"
            className="list-group-item"
          >
            <div className="search-title">
              <strong className="text-light">Main</strong> Header
            </div>
            <div className="search-path">Components</div>
          </a>
          <a
            href="/docs/3.1//components/main-sidebar.html"
            className="list-group-item"
          >
            <div className="search-title">
              <strong className="text-light">Main</strong> Sidebar
            </div>
            <div className="search-path">Components</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SidebarSearch;
