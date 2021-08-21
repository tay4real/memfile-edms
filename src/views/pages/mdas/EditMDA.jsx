import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { updateMDA, fetchMDAById } from "../../../services/mda.service";

import routes from "../../../routes";

const EditMDA = () => {
  let { mda } = useSelector((state) => state.operations);
  const currentLocation = useLocation().pathname;
  // console.log(currentLocation);

  const editId = currentLocation.split("/").pop();
  console.log(editId);

  const getRouteName = (pathname, routes) => {
    console.log(pathname);
    const currentRoute = routes.find(
      (route) => route.path === pathname || route.path === "/mdas/edit/:id"
    );
    return currentRoute.name;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      console.log(index);
      const currentPathname = `${prev}/${curr}`;
      console.log(prev);
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active:
          index + 1 === array.length || index + 1 === array.length - 1
            ? true
            : false,
      });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);

  const [editmda, setMDA] = useState({
    name: "",
    shortName: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    setMDA({
      ...editmda,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const editMDA = async (e) => {
    e.preventDefault();
    dispatch(updateMDA(editId, editmda));
  };

  useEffect(() => {
    dispatch(fetchMDAById(editId));
  }, [dispatch, editId]);

  useEffect(() => {
    if (mda) {
      setMDA({
        name: mda.name,
        shortName: mda.shortName,
      });
    }
  }, [mda]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">
                {" "}
                {breadcrumbs.map((breadcrumb, index) => {
                  return breadcrumb.active && index === 2 && breadcrumb.name;
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

      {/* Main content */}
      <div className="row">
        <div className="col-sm-9 col-md-6 m-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Edit MDA</h3>
            </div>
            {/* /.card-header */}
            <div
              className="py-2 col-sm-9 col-md-6 m-auto
            "
            >
              {/*error && <Alert variant="danger">{error}</Alert> */}
              {err_message && <Alert variant="danger">{err_message}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
            </div>

            {/* form start */}
            <form method="post" onSubmit={editMDA}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={onChangeHandler}
                    placeholder="Enter MDA name"
                    value={editmda.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortNane">Short Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shortName"
                    name="shortName"
                    onChange={onChangeHandler}
                    placeholder="Enter MDA Short Name"
                    value={editmda.shortName}
                  />
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMDA;
