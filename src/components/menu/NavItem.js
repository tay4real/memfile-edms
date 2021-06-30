import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className="nav-item">
      <NavLink to={props.to} className="nav-link">
        <i className={props.icon} />
        <p>
          {props.anchor}
          <span className={props.badge_icon}>{props.badge_text}</span>
        </p>
      </NavLink>
    </li>
  );
};

export default NavItem;
