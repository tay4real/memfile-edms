import React from "react";
import { useLocation, NavLink } from "react-router-dom";

import routes from "../../routes";

const ContentHeader = () => {
  const currentLocation = useLocation().pathname;
  console.log(currentLocation);

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    console.log(currentRoute.name);
    return currentRoute.name;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">
              {" "}
              {breadcrumbs.map((breadcrumb, index) => {
                return breadcrumb.active && breadcrumb.name;
              })}
            </h1>
          </div>
          {/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>

              {breadcrumbs.map((breadcrumb, index) => {
                return breadcrumb.active ? (
                  <li key={index} className="breadcrumb-item active">
                    {breadcrumb.name}
                  </li>
                ) : (
                  <li key={index} className="breadcrumb-item ">
                    <NavLink to={breadcrumb.pathname}>
                      {breadcrumb.name}
                    </NavLink>
                  </li>
                );
              })}
            </ol>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </div>
  );
};

export default ContentHeader;
