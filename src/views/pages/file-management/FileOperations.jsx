import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import ContentHeader from "../../components/ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGeneralFiles,
  fetchGeneralFileById,
  requestFile,
  returnFile,
  chargeFile,
} from "../../../services/generalfiles.service";
import { fetchIncomingMailByID } from "../../../services/incoming-mails.service";
import { fetchOutgoingMailByID } from "../../../services/outgoing-mails.service";
import {
  fetchUserByID,
  fetchActiveUsers,
} from "../../../services/user.service";
import {
  clearMessage,
  clearErrMessage,
  setErrMessage,
} from "../../../actions/message";

const FileOperations = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  let { general_files, user_profile, users, general_file, incoming_mail } =
    useSelector((state) => state.operations);
  let { message, err_message } = useSelector((state) => state.messages);

  const [operation, setOperation] = useState("");
  const operations = [
    { id: 1, name: "Request File", slug: "requestFile" },
    { id: 2, name: "Return File", slug: "returnFile" },
    { id: 3, name: "Charge File", slug: "chargeFile" },
  ];

  const [file, setFile] = useState("");

  const [docType, setDocType] = useState("");

  const [document_id, setDocumentID] = useState("");

  const [userID, setUserID] = useState("");

  const [charge_comment, setChargeComment] = useState("");

  const [currentUserID, setCurrentUserID] = useState("");

  const [success, setSuccess] = useState(null);

  useEffect(() => {
    dispatch(fetchGeneralFiles());
    dispatch(fetchActiveUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserByID(user._id));
      setCurrentUserID(user._id);
    }
  }, [dispatch, user]);

  const operationHandler = (e) => {
    setOperation(e.currentTarget.value);
    if (user) {
      dispatch(fetchUserByID(user._id));
    }
  };

  const requestHandler = (e) => {
    setFile(e.currentTarget.value);
    if (user) {
      dispatch(fetchUserByID(user._id));
    }
  };

  const returnHandler = (e) => {
    setFile(e.currentTarget.value);
    if (user) {
      dispatch(fetchUserByID(user._id));
    }
  };

  const fileChargeHandler = (e) => {
    if (e.currentTarget.name === "user") {
      setUserID(e.currentTarget.value);
    }
    if (e.currentTarget.name === "file") {
      setFile(e.currentTarget.value);
      if (e.currentTarget.value !== "") {
        dispatch(fetchGeneralFileById(e.currentTarget.value));
      }
    }
    if (e.currentTarget.name === "document_type") {
      setDocType(e.currentTarget.value);
    }

    if (e.currentTarget.name === "document") {
      setDocumentID(e.currentTarget.value);
      if (docType === "incomingmails") {
        if (e.currentTarget.value !== "") {
          dispatch(fetchIncomingMailByID(e.currentTarget.value));
        }
      }
      if (docType === "outgoingmails") {
        if (e.currentTarget.value !== "") {
          dispatch(fetchOutgoingMailByID(e.currentTarget.value));
        }
      }
    }
    if (user) {
      dispatch(fetchUserByID(user._id));
    }
  };

  const chargeCommentHandler = (e) => {
    if (e.currentTarget.name === "charge_comment") {
      setChargeComment(e.currentTarget.value);
    }
  };

  const makeFileRequest = () => {
    if (user && file !== "") {
      dispatch(requestFile(user._id, file));
      dispatch(fetchUserByID(user._id));
      setSuccess("Request in progress...");
    }
  };

  const executeFileReturn = () => {
    if (user && file !== "") {
      dispatch(returnFile(user._id, file));
      dispatch(fetchUserByID(user._id));
      setSuccess("Operation in progress...");
    }
  };

  const chargeFileToUser = () => {
    if (userID !== "") {
      if (currentUserID === "") {
        setErrMessage("Choose User to charge file to");
      } else if (file === "") {
        setErrMessage("Choose File");
      } else if (document_id === "") {
        setErrMessage("Choose Document in File to charge");
      } else if (charge_comment === "") {
        setErrMessage("Enter a charge comment to charge to user");
      } else {
        dispatch(
          chargeFile(currentUserID, file, {
            user_to_id: userID,
            document_id: document_id,
            charge_comment: charge_comment,
            docType: docType,
          })
        );
        dispatch(fetchUserByID(user._id));
        setSuccess("Operation in progress...");
      }
    }
  };

  useEffect(() => {
    if (err_message) {
      setTimeout(() => {
        dispatch(clearErrMessage());
      }, 5000);
    }
    if (message) {
      setSuccess("Operation completed successfully");
      setTimeout(() => {
        dispatch(clearMessage());
        setSuccess(null);
      }, 5000);
      setFile("");
    }

    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    }
  }, [dispatch, err_message, message, success]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}
      <section className="content pb-2">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-body">
              <div className="row">
                <div
                  className="col-12 text-center
            "
                >
                  {err_message && <Alert variant="danger">{err_message}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                </div>
              </div>
            </div>
          </div>

          <div className="card card-default">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-3  py-2 ">
                  {" "}
                  <label>Operations</label>
                  <select
                    id="operation"
                    name="operation"
                    className="form-control select2"
                    style={{ width: "100%" }}
                    value={operation}
                    onChange={operationHandler}
                  >
                    <option value="">Choose Operation</option>

                    {operations.map((operation) => (
                      <option key={operation.id} value={operation.slug}>
                        {operation.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-9">
                  {operation === "" && (
                    <div
                      className="border rounded py-2 px-2 d-flex flex-column  justify-content-center align-items-center"
                      style={{ minHeight: "50vh" }}
                    >
                      <h3>Choose an Operation</h3>
                    </div>
                  )}
                  {operation !== "" && (
                    <div
                      className="border rounded py-2 px-2 d-flex flex-column justify-content-between"
                      style={{ minHeight: "50vh" }}
                    >
                      {operation === "requestFile" && (
                        <>
                          <div>
                            {" "}
                            <label>Request File</label>
                            <select
                              name="request"
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={file}
                              onChange={requestHandler}
                            >
                              <option value="">Choose File</option>

                              {general_files !== null &&
                                general_files.map((file) => (
                                  <option key={file._id} value={file._id}>
                                    {file.file_title +
                                      " (" +
                                      file.mdaShortName +
                                      ")"}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            {" "}
                            <button
                              onClick={() => makeFileRequest()}
                              className="btn btn-primary"
                            >
                              Make Request
                            </button>
                          </div>
                        </>
                      )}

                      {operation === "returnFile" && (
                        <>
                          <div>
                            {" "}
                            <label>Return File</label>
                            <select
                              name="return"
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={file}
                              onChange={returnHandler}
                            >
                              {user_profile !== null &&
                              user_profile.generalfiles.length !== 0 ? (
                                <>
                                  <option value="">Choose File</option>
                                  {user_profile.generalfiles.map((file) => (
                                    <option key={file._id} value={file._id}>
                                      {file.file_title +
                                        " (" +
                                        file.mdaShortName +
                                        ")"}
                                    </option>
                                  ))}
                                </>
                              ) : (
                                <option value="">No File Available</option>
                              )}
                            </select>
                          </div>
                          <div>
                            {" "}
                            <button
                              onClick={() => executeFileReturn()}
                              className="btn btn-primary"
                            >
                              Return File
                            </button>
                          </div>
                        </>
                      )}

                      {operation === "chargeFile" && (
                        <>
                          <div>
                            <div className="row">
                              <div className="col col-md-6">
                                {" "}
                                <div className="form-group">
                                  <label>Charge File To</label>
                                  <select
                                    name="user"
                                    className="form-control select2"
                                    style={{ width: "100%" }}
                                    value={userID}
                                    onChange={fileChargeHandler}
                                  >
                                    <option value="">Choose User</option>

                                    {users !== null &&
                                      users.map((user) => (
                                        <option
                                          key={user._id}
                                          value={user._id}
                                          disabled={
                                            user._id === currentUserID
                                              ? true
                                              : false
                                          }
                                        >
                                          {user.surname} {user.firstname} -{" "}
                                          {user.post} - ({user.department})
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col col-md-6">
                                <div className="form-group">
                                  <label>File</label>
                                  <select
                                    name="file"
                                    className="form-control select2"
                                    style={{ width: "100%" }}
                                    value={file}
                                    onChange={fileChargeHandler}
                                  >
                                    {user_profile !== null &&
                                    user_profile.generalfiles.length !== 0 ? (
                                      <>
                                        <option value="">Choose File</option>
                                        {user_profile.generalfiles.map(
                                          (file) => (
                                            <option
                                              key={file._id}
                                              value={file._id}
                                            >
                                              {file.file_title +
                                                " (" +
                                                file.mdaShortName +
                                                ")"}
                                            </option>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <option value="">
                                        No File Available
                                      </option>
                                    )}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col col-md-6">
                                <div className="form-group">
                                  <label>Document Type</label>
                                  <select
                                    name="document_type"
                                    className="form-control select2"
                                    style={{ width: "100%" }}
                                    value={docType}
                                    onChange={fileChargeHandler}
                                  >
                                    <option value="">
                                      Choose Document Type
                                    </option>
                                    <option value="incomingmails">
                                      Incoming Mails
                                    </option>
                                    <option value="outgoingmails">
                                      Outgoing Mails
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="col col-md-6">
                                <div className="form-group">
                                  <label>Document</label>
                                  <select
                                    name="document"
                                    className="form-control select2"
                                    style={{ width: "100%" }}
                                    value={document_id}
                                    onChange={fileChargeHandler}
                                  >
                                    {general_file &&
                                      docType === "incomingmails" &&
                                      (general_file.incomingmails.length !==
                                      0 ? (
                                        <>
                                          <option value="">
                                            Choose Document
                                          </option>
                                          {general_file.incomingmails.map(
                                            (doc) => (
                                              <option
                                                key={doc._id}
                                                value={doc._id}
                                              >
                                                {doc.ref_no} - {doc.subject}
                                              </option>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <option value="">
                                          No Document Available
                                        </option>
                                      ))}

                                    {general_file &&
                                      docType === "outgoingmails" &&
                                      (general_file.outgoingmails.length !==
                                      0 ? (
                                        <>
                                          <option value="">
                                            Choose Document
                                          </option>
                                          {general_file.outgoingmails.map(
                                            (doc) => (
                                              <option
                                                key={doc._id}
                                                value={doc._id}
                                              >
                                                {doc.ref_no} - {doc.subject}
                                              </option>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <option value="">
                                          No Document Available
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="ref_no">Document Preview</label>
                              <div
                                className="border p-2"
                                style={{ minHeight: "30vh" }}
                              >
                                {incoming_mail && (
                                  <>
                                    <div className="row">
                                      <div className="col">
                                        <strong>Ref No: </strong>
                                        {incoming_mail.ref_no}
                                      </div>
                                      <div className="col">
                                        <strong>Subject: </strong>
                                        {incoming_mail.subject}
                                      </div>
                                    </div>
                                    <div className="row my-2">
                                      <div className="col">
                                        <strong>Sender: </strong>{" "}
                                        {incoming_mail.sender}
                                      </div>
                                    </div>
                                    <div className="row my-2">
                                      <div className="col">
                                        <strong>Mail Uploads:</strong> {}
                                      </div>
                                      <div className="mt-2">
                                        <div
                                          id="carouselExampleControls"
                                          className="carousel slide"
                                          data-ride="carousel"
                                        >
                                          <ol className="carousel-indicators">
                                            {incoming_mail.upload_url.length !==
                                              0 &&
                                              incoming_mail.upload_url.map(
                                                (url, key) => (
                                                  <>
                                                    <li
                                                      data-target="#carouselExampleIndicators"
                                                      data-slide-to={key}
                                                      className={
                                                        key === 0
                                                          ? "active"
                                                          : ""
                                                      }
                                                    />
                                                  </>
                                                )
                                              )}
                                          </ol>

                                          <div className="carousel-inner">
                                            {incoming_mail.upload_url.length !==
                                            0 ? (
                                              incoming_mail.upload_url.map(
                                                (url, key) => (
                                                  <>
                                                    <div
                                                      key={key}
                                                      className={
                                                        key === 0
                                                          ? "carousel-item active"
                                                          : "carousel-item"
                                                      }
                                                    >
                                                      <img
                                                        src={url}
                                                        className="d-block w-100 img-fluid"
                                                        alt={`page ${key + 1}`}
                                                      />
                                                      <div
                                                        onClick={console.log(
                                                          key
                                                        )}
                                                        className="badge bg-primary p-2 mt-2"
                                                      >
                                                        Page {key + 1}
                                                      </div>
                                                    </div>
                                                  </>
                                                )
                                              )
                                            ) : (
                                              <div className="p-1 text-center">
                                                No uploads available
                                              </div>
                                            )}
                                          </div>
                                          <a
                                            className="carousel-control-prev"
                                            href="#carouselExampleControls"
                                            role="button"
                                            data-slide="prev"
                                          >
                                            <span
                                              className="carousel-control-prev-icon"
                                              aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                              Previous
                                            </span>
                                          </a>
                                          <a
                                            className="carousel-control-next"
                                            href="#carouselExampleControls"
                                            role="button"
                                            data-slide="next"
                                          >
                                            <span
                                              className="carousel-control-next-icon"
                                              aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                              Next
                                            </span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row my-2">
                                      <div className="col">
                                        <strong>
                                          Previous Charge Comments:{" "}
                                        </strong>
                                        <div className="table-responsive">
                                          <table className="table table-bordered table-striped mt-2">
                                            <thead>
                                              <tr>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Comment</th>
                                                <th>Date Charged</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {incoming_mail.charge_comment
                                                .length !== 0 ? (
                                                incoming_mail.charge_comment.map(
                                                  (comment) => (
                                                    <tr key={comment._id}>
                                                      <td className="whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                          {comment.from}
                                                        </div>
                                                      </td>
                                                      <td className="whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                          {comment.to}
                                                        </div>
                                                      </td>
                                                      <td className="whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                          {comment.comment}
                                                        </div>
                                                      </td>

                                                      <td className="whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                          {comment.dateCharged &&
                                                            new Date(
                                                              comment.dateCharged
                                                            )
                                                              .toISOString()
                                                              .substring(0, 10)}
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  )
                                                )
                                              ) : (
                                                <tr>
                                                  <td colSpan="9">
                                                    <div className="p-1 text-center">
                                                      No Comments
                                                    </div>
                                                  </td>
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="charge_comment">
                                Charge Comment
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="charge_comment"
                                onChange={chargeCommentHandler}
                                value={charge_comment}
                                placeholder="Comment"
                              />
                            </div>
                          </div>
                          <div>
                            {" "}
                            <button
                              onClick={() => chargeFileToUser()}
                              className="btn btn-primary"
                            >
                              Charge
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileOperations;
