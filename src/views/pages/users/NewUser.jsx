import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

// import { addNewUser } from "../../../services/user.service";

import { fetchAllMDAs, searchMDAByName } from "../../../services/mda.service";
import { fetchAllDepts } from "../../../services/dept.service";
import { getAllDeptsFail } from "../../../actions/operations";
import { addNewUser } from "../../../services/user.service";

const NewUser = () => {
  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);
  let { mdas, depts } = useSelector((state) => state.operations);

  const [newUser, setNewUser] = useState({
    surname: "",
    firstname: "",
    email: "",
    password: "",
    mda: "",
    department: "",
    post: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [newUserError, setNewUserError] = useState({
    surname: null,
    firstname: null,
    email: null,
    password: null,
    confirmPassword: null,
    mda: null,
    department: null,
    post: null,
    role: null,
  });
  // const [mdaID, setMdaID] = useState("");

  const roles = [
    "Admin",
    "Chairman",
    "Permanent Secretary",
    "Director",
    "Registry Officer",
  ];

  const onChangeHandler = (e) => {
    if (e.target.id === "surname") {
      if (e.currentTarget.value !== "") {
        setNewUserError({
          ...newUserError,
          surname: null,
        });
      } else {
        setNewUserError({
          ...newUserError,
          surname: "Surname field cannot be empty",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "firstname") {
      if (e.currentTarget.value !== "") {
        setNewUserError({
          ...newUserError,
          firstname: null,
        });
      } else {
        setNewUserError({
          ...newUserError,
          firstname: "Firstname field cannot be empty",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "email") {
      if (e.currentTarget.value !== "") {
        if (validateEmail(e.currentTarget.value)) {
          setNewUserError({
            ...newUserError,
            email: null,
          });
        } else {
          setNewUserError({
            ...newUserError,
            email: "Enter a valid email",
          });
        }
      } else {
        setNewUserError({
          ...newUserError,
          email: "Email field cannot be empty",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "password") {
      if (e.currentTarget.value !== "") {
        setNewUserError({
          ...newUserError,
          password: null,
        });

        if (confirmPassword === e.currentTarget.value) {
          setNewUserError({
            ...newUserError,
            password: null,
          });
        } else {
          setNewUserError({
            ...newUserError,
            password: "Password and comfirm password must match",
          });
        }
      } else {
        setNewUserError({
          ...newUserError,
          password: "Password field cannot be empty",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "confirmPassword") {
      if (e.currentTarget.value !== "") {
        if (newUser.password === e.currentTarget.value) {
          setNewUserError({
            ...newUserError,
            password: null,
          });
        } else {
          setNewUserError({
            ...newUserError,
            password: "Password and Comfirm password do not match",
          });
        }
      }
      setConfirmPassword(e.currentTarget.value);
    }

    if (e.target.id === "mda") {
      if (e.currentTarget.value !== "") {
        getDepartments(e.target.value);
        searchMDAByName(e.target.value);

        setNewUserError({
          ...newUserError,
          mda: null,
        });
      } else {
        setNewUserError({
          ...newUserError,
          mda: "Choose an MDA",
        });
        dispatch(getAllDeptsFail());
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "department") {
      if (e.currentTarget.value !== "") {
        setNewUserError({
          ...newUserError,
          department: null,
        });
      } else {
        setNewUserError({
          ...newUserError,
          department: "Choose a department",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "post") {
      if (e.currentTarget.value !== "") {
        setNewUserError({
          ...newUserError,
          post: null,
        });
      } else {
        setNewUserError({
          ...newUserError,
          post: "Position field cannot be empty",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }

    if (e.target.id === "role") {
      if (e.currentTarget.value !== "") {
        setNewUserError({
          ...newUserError,
          role: null,
        });
      } else {
        setNewUserError({
          ...newUserError,
          role: "Choose a role",
        });
      }
      setNewUser({
        ...newUser,
        [e.target.id]: e.currentTarget.value,
      });
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>|()[\]\\.,;:\s@]+)*)|())@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const getDepartments = async (id) => {
    if (id !== "") {
      await dispatch(fetchAllDepts(id));
    }
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (
      newUserError.password ||
      newUser.post === "" ||
      newUser.surname === "" ||
      newUser.firstname === "" ||
      newUser.mda === "" ||
      newUser.department === ""
    ) {
      setError("All fields are required");
    } else if (
      newUserError.password ||
      newUserError.post ||
      newUserError.surname ||
      newUserError.firstname ||
      newUserError.mda ||
      newUserError.department
    ) {
      setError("Error in Form submission!");
    } else {
      dispatch(addNewUser(newUser));
      setError(null);
    }
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
  }, [dispatch]);


  

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}

      <div className="row m-0 p-0">
        <div className="col-md-9 m-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New User</h3>
            </div>
            {/* /.card-header */}
            <div
              className="pt-2 col text-center m-auto
            "
            >
              {error && <Alert variant="danger">{error}</Alert>}
              {err_message && (
                <Alert variant="danger">{err_message.message}</Alert>
              )}
              {message && <Alert variant="success">{message}</Alert>}
            </div>

            {/* form start */}
            <form method="post" onSubmit={registerUser}>
              <div className="card-body">
                <div className="row">
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="surname">
                        {newUserError.surname && (
                          <span className="text-danger mr-2">*</span>
                        )}
                        Surname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="surname"
                        name="surname"
                        onChange={onChangeHandler}
                        value={newUser.surname}
                        placeholder="Surname"
                      />
                      {newUserError.surname && (
                        <span className="text-danger">
                          {newUserError.surname}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstname">
                        {newUserError.firstname && (
                          <span className="text-danger mr-2">*</span>
                        )}
                        Firstname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        onChange={onChangeHandler}
                        value={newUser.firstname}
                        placeholder="Firstname"
                      />
                      {newUserError.firstname && (
                        <span className="text-danger">
                          {newUserError.firstname}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">
                        {" "}
                        {newUserError.email && (
                          <span className="text-danger mr-2">*</span>
                        )}
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={newUser.email}
                        placeholder="Email"
                      />
                      {newUserError.email && (
                        <span className="text-danger">
                          {newUserError.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div className="row">
                      <div className="col ">
                        <div className="form-group mb-0">
                          <label htmlFor="password">
                            {" "}
                            {newUserError.password && (
                              <span className="text-danger mr-2">*</span>
                            )}
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={onChangeHandler}
                            value={newUser.password}
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div className="col mb-0">
                        <div className="form-group mb-0">
                          <label htmlFor="confirmPassword">
                            {" "}
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={onChangeHandler}
                            value={confirmPassword}
                            placeholder="Confirm Password"
                          />
                        </div>
                      </div>
                      {newUserError.password && (
                        <span className="text-danger">
                          {newUserError.password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="mda">
                        {newUserError.mda && (
                          <span className="text-danger mr-2">*</span>
                        )}
                        MDA
                      </label>
                      <select
                        id="mda"
                        name="mda"
                        className="form-control select2"
                        style={{ width: "100%" }}
                        value={newUser.mda}
                        onChange={onChangeHandler}
                      >
                        <option value="">Choose MDA</option>
                        {mdas !== null &&
                          mdas.map((mda) => (
                            <option key={mda._id} value={mda._id}>
                              {mda.name}
                            </option>
                          ))}
                      </select>
                      {newUserError.mda && (
                        <span className="text-danger">{newUserError.mda}</span>
                      )}
                    </div>
                  </div>
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="department">
                        {" "}
                        {newUserError.department && (
                          <span className="text-danger">*</span>
                        )}
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        className="form-control select2"
                        style={{ width: "100%" }}
                        value={newUser.department}
                        onChange={onChangeHandler}
                      >
                        <option value="">Choose Department</option>
                        {depts !== null &&
                          depts.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                              {dept.deptName}
                            </option>
                          ))}
                      </select>
                      {newUserError.department && (
                        <span className="text-danger">
                          {newUserError.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="post">
                        {" "}
                        {newUserError.post && (
                          <span className="text-danger">*</span>
                        )}
                        Position
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="post"
                        name="post"
                        onChange={onChangeHandler}
                        value={newUser.post}
                        placeholder="Position"
                      />
                    </div>
                    {newUserError.post && (
                      <span className="text-danger">{newUserError.post}</span>
                    )}
                  </div>
                  <div className="col col-md-6">
                    <div className="form-group">
                      <label htmlFor="role">
                        {" "}
                        {newUserError.role && (
                          <span className="text-danger">*</span>
                        )}
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="form-control select2"
                        style={{ width: "100%" }}
                        value={newUser.role}
                        onChange={onChangeHandler}
                      >
                        <option value="">Choose Role</option>
                        {roles.map((role, key) => (
                          <option key={key} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {newUserError.role && (
                        <span className="text-danger">{newUserError.role}</span>
                      )}
                    </div>
                  </div>
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

export default NewUser;
