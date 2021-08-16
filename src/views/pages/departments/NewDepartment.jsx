import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllMDAs } from "../../../services/mda.service";
import { createDept } from "../../../services/dept.service";

const NewDepartment = () => {
  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);
  let { mdas } = useSelector((state) => state.operations);

  const [error, setError] = useState("");

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

  const addDepartment = async (e) => {
    e.preventDefault();
    if (mdaID !== "") {
      if (department.deptName !== "" && department.deptShortName !== "") {
        dispatch(createDept(mdaID, department));
        setDepartment({
          deptName: "",
          deptShortName: "",
        });
      } else {
        setError("Department Name or Shortname cannot be empty");
      }
    } else {
      setError("Select MDA");
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
        <div className="col-sm-9 col-md-6 m-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New Department</h3>
            </div>
            {/* /.card-header */}
            <div
              className="pt-2 col-sm-9 col-md-6 m-auto
            "
            >
              {error && <Alert variant="warning">{error}</Alert>}
              {err_message && <Alert variant="warning">{err_message}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
            </div>

            {/* form start */}
            <form method="post" onSubmit={addDepartment}>
              <div className="card-body">
                <div className="form-group">
                  <label>MDA</label>
                  <select
                    className="form-control select2"
                    style={{ width: "100%" }}
                    onChange={mdaHandler}
                  >
                    <option value="">Choose MDA</option>
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
