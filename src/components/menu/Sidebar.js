import React from "react";

import SidebarSearch from "./SidebarSearch";
import UserPanel from "./UserPanel";
import { useSelector } from "react-redux";
// sidebar nav config
import { navigation, admin_nav } from "../../_nav";

import NavItem from "./NavItem";
import NavGroup from "./NavGroup";

const Sidebar = () => {
  let { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <UserPanel
        avatar={user !== null && user.avatar}
        name={user !== null && user.surname + " " + user.firstname}
      />
      <div
        style={{ maxHeight: "75vh", overflowY: "auto", overflowX: "hidden" }}
      >
        {/* SidebarSearch Form */}
        <SidebarSearch />
        {/* Sidebar Menu */}

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <NavItem
              anchor="Dashboard"
              to="/dashboard"
              icon="nav-icon fas fa-tachometer-alt"
            />
          </ul>
        </nav>

        <div className="mt-2">
          <div
            className="accordion accordion-flush"
            id="accordionFlushExample"
            style={{ overflowY: "auto" }}
          >
            {navigation
              .filter((nav) => nav._component === "NavGroup")
              .map((filteredNav, idx) => {
                return (
                  <div key={`${idx}`}>
                    <NavGroup
                      index={idx}
                      anchor={filteredNav.anchor}
                      to={filteredNav.to}
                      icon_right={filteredNav.icon_right}
                      icon_left={filteredNav.icon_left}
                      badge_icon={filteredNav.badge_icon}
                      badge_text={filteredNav.badge_text}
                      items={filteredNav.items}
                    />
                  </div>
                );
              })}

            {admin_nav
              .filter((nav) => nav._component === "NavGroup")
              .map((filteredNav, idx) => {
                return (
                  <div key={`admin${idx}`}>
                    <NavGroup
                      index={`admin${idx}`}
                      anchor={filteredNav.anchor}
                      to={filteredNav.to}
                      icon_right={filteredNav.icon_right}
                      icon_left={filteredNav.icon_left}
                      badge_icon={filteredNav.badge_icon}
                      badge_text={filteredNav.badge_text}
                      items={filteredNav.items}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
