import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllMDAs } from "../../../services/mda.service";

import {
  addNewFile,
  fetchGeneralFilesByMDA,
} from "../../../services/generalfiles.service";

const NewGeneralFile = () => {
  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);
  let { mdas, general_files } = useSelector((state) => state.operations);

  const [error, setError] = useState("");

  const [file, setFile] = useState({
    file_title: "",
    mdaShortName: "",
  });

  const onChangeHandler = (e) => {
    setFile({
      ...file,
      [e.target.id]: e.currentTarget.value,
    });
    if (e.target.id === "mdaShortName" && e.currentTarget.value !== "") {
      getFilesByMDA(e.currentTarget.value);
    }
  };

  const addFile = async (e) => {
    e.preventDefault();
    if (file.mdaShortName !== "" && file.title !== "") {
      let file_no;
      console.log(file);
      file_no = file.mdaShortName + "/AD/" + (general_files.length + 1);

      file.file_no = file_no;

      dispatch(addNewFile(file));
    } else {
      setError("All fields are required");
    }

    setFile({
      file_title: "",
      mdaShortName: "",
    });
  };

  const getFilesByMDA = (mdaShortName) => {
    dispatch(fetchGeneralFilesByMDA(mdaShortName));
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
              <h3 className="card-title">Add New File</h3>
            </div>
            {/* /.card-header */}
            <div
              className="pt-2 col-sm-9 col-md-9 m-auto
            "
            >
              {error && <Alert variant="warning">{error}</Alert>}
              {err_message && <Alert variant="warning">{err_message}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
            </div>

            {/* form start */}
            <form method="post" onSubmit={addFile}>
              <div className="card-body">
                <div className="form-group">
                  <label>MDA</label>
                  <select
                    id="mdaShortName"
                    name="mdaShortName"
                    className="form-control select2"
                    style={{ width: "100%" }}
                    value={file.mdaShortName}
                    onChange={onChangeHandler}
                  >
                    <option value="">Choose MDA</option>
                    {mdas !== null &&
                      mdas.map((mda) => (
                        <option key={mda._id} value={mda.shortName}>
                          {mda.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">File Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="file_title"
                    name="file_title"
                    onChange={onChangeHandler}
                    value={file.file_title}
                    placeholder="File Title"
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

export default NewGeneralFile;
