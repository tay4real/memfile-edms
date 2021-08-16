import React from "react";
import { NavLink } from "react-router-dom";

const UserPanel = (props) => {
  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={props.avatar} className="img-circle elevation-2" alt="User" />
      </div>
      <div className="info">
        <NavLink to="/" className="d-block">
          {props.name}
        </NavLink>
      </div>
    </div>
  );
};

export default UserPanel;
