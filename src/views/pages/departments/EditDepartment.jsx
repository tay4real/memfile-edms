import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { updateDept } from "../../../services/dept.service";

import routes from "../../../routes";

const NewDepartment = () => {
  const currentLocation = useLocation().pathname;

  const editId = currentLocation.split("/").pop();
  console.log(editId);

  const getRouteName = (pathname, routes) => {
    console.log(pathname);
    const currentRoute = routes.find(
      (route) =>
        route.path === pathname || route.path === "/departments/edit/:id"
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
  let { mdas, dept } = useSelector((state) => state.operations);

  // const [error, setError] = useState("");
  const [editDeptID, setEditDeptID] = useState("");

  const [mdaID, setMdaID] = useState("");

  const [department, setDepartment] = useState({
    deptName: "",
    deptShortName: "",
  });

  const mdaHandler = (e) => {
    if (e.currentTarget.value !== "") {
      setMdaID(e.currentTarget.value);
    }
  };

  const onChangeHandler = (e) => {
    setDepartment({
      ...department,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const editDepartment = async (e) => {
    e.preventDefault();
    dispatch(updateDept(mdaID, editDeptID, department));
  };

  useEffect(() => {
    if (dept) {
      setDepartment({
        deptName: dept[0].deptName,
        deptShortName: dept[0].deptShortName,
      });
      setMdaID(editId);
      setEditDeptID(dept[0]._id);
    }
  }, [dept, editId]);

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
      <div className="row m-0 p-0">
        <div className="col-sm-9 col-md-6 m-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Edit Department</h3>
            </div>
            {/* /.card-header */}
            <div
              className="py-2 col-sm-9 col-md-6 m-auto
            "
            >
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
              {err_message && <Alert variant="danger">{err_message}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
            </div>

            {/* form start */}
            <form method="post" onSubmit={editDepartment}>
              <div className="card-body">
                <div className="form-group">
                  <label>Choose MDA</label>
                  <select
                    className="form-control select2"
                    style={{ width: "100%" }}
                    value={mdaID}
                    onChange={mdaHandler}
                  >
                    {mdas &&
                      mdas.map((mda) => {
                        return (
                          <option key={mda._id} value={mda._id}>
                            {mda.name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="deptName"
                    name="deptName"
                    onChange={onChangeHandler}
                    placeholder="Enter Department name"
                    value={department.deptName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortNane">Department Short Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="deptShortName"
                    name="deptShortName"
                    onChange={onChangeHandler}
                    placeholder="Enter Department Shortname"
                    value={department.deptShortName}
                  />
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDepartment;
