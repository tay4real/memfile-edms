import React from "react";
import { NavLink } from "react-router-dom";

const NavGroup = (props) => {
  return (
    <div className="accordion-item nav-item">
      <h2 className="accordion-header" id="flush-headingOne">
        <NavLink to={props.to}>
          {" "}
          <button
            className="accordion-button collapsed "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse${props.index}`}
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            <i className={props.icon_left} />
            <span className="brand-text "> {props.anchor}</span>
          </button>
        </NavLink>
      </h2>
      <div
        id={`flush-collapse${props.index}`}
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <ul className="list-group">
            {props.items.map((navItem, idx) => {
              return (
                <NavLink activeClassName="active-menu" to={navItem.to}>
                  <li key={idx} className="list-group-item">
                    <i className={navItem.icon} />
                    <span className="brand-text "> {navItem.anchor}</span>
                  </li>{" "}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavGroup;
