import React from "react";

import { logout } from "../../services/auth.service";
import { AiOutlineLogout } from "react-icons/ai";

import UserPanel from "./UserPanel";
import { useSelector, useDispatch } from "react-redux";
// sidebar nav config
import { navigation, admin_nav } from "../../_nav";

import NavItem from "./NavItem";
import NavGroup from "./NavGroup";

const Sidebar = () => {
  const dispatch = useDispatch();
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

        <div
          className="nav nav-pills nav-sidebar flex-column cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          <li className="nav-item bg-danger text-light rounded">
            <div className="nav-link bg-danger text-dark rounded">
              <AiOutlineLogout
                style={{ fontSize: "1.5rem" }}
                className="mr-2"
              />
              <p>Logout</p>
            </div>
          </li>
        </div>

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
                  <NavGroup
                    key={idx}
                    index={idx}
                    anchor={filteredNav.anchor}
                    to={filteredNav.to}
                    icon_right={filteredNav.icon_right}
                    icon_left={filteredNav.icon_left}
                    badge_icon={filteredNav.badge_icon}
                    badge_text={filteredNav.badge_text}
                    items={filteredNav.items}
                  />
                );
              })}

            {admin_nav
              .filter((nav) => nav._component === "NavGroup")
              .map((filteredNav, idx) => {
                return (
                  <NavGroup
                    key={`admin${idx}`}
                    index={`admin${idx}`}
                    anchor={filteredNav.anchor}
                    to={filteredNav.to}
                    icon_right={filteredNav.icon_right}
                    icon_left={filteredNav.icon_left}
                    badge_icon={filteredNav.badge_icon}
                    badge_text={filteredNav.badge_text}
                    items={filteredNav.items}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
