import React, { useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { createMDA } from "../../../services/mda.service";

const NewMDA = () => {
  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);

  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const [mda, setMDA] = useState({
    name: "",
    shortName: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    setMDA({
      ...mda,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const addMDA = async (e) => {
    e.preventDefault();
    if (mda.name !== "" && mda.shortName !== "") {
      dispatch(createMDA(mda));
    } else {
      setError("All fields are required");
    }

    setMDA({
      name: "",
      shortName: "",
    });
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}
      <div className="row m-0 p-0">
        <div className="col-sm-9 col-md-6 m-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New MDA</h3>
            </div>
            {/* /.card-header */}
            <div
              className="py-2 col-sm-9 col-md-6 m-auto
            "
            >
              {error && <Alert variant="danger">{error}</Alert>}
              {err_message && <Alert variant="danger">{err_message}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
            </div>

            {/* form start */}
            <form method="post" onSubmit={addMDA}>
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
                    value={mda.name}
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
                    value={mda.shortName}
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

export default NewMDA;
