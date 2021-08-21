import React from "react";
import { Link } from "react-router-dom";

const BrandLogo = (props) => {
  return (
    <Link to={props.to} className="brand-link">
      <img
        src={props.logo}
        alt={props.name}
        className="brand-image img-circle elevation-3"
        style={{ opacity: ".8" }}
      />
      <span className="brand-text font-weight-light">{props.name}</span>
    </Link>
  );
};

export default BrandLogo;
