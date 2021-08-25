import React, { useState, useEffect, useMemo } from "react";

import { useDropzone } from "react-dropzone";

import "react-image-crop/dist/ReactCrop.css";
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
} from "../../../utils/utils";

import ContentHeader from "../../components/ContentHeader";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllMDAs } from "../../../services/mda.service";

import {
  uploadMailScan,
  editMail,
} from "../../../services/outgoing-mails.service";

import { clearMessage, clearErrMessage } from "../../../actions/message";

import {
  fetchGeneralFiles,
  addIncomingMailToFile,
  removeMailFromFile,
} from "../../../services/generalfiles.service";

import { getMailFail } from "../../../actions/operations";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const EditOutgoingMail = () => {
  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);
  let { mdas, outgoing_mail, general_files, user_profile } = useSelector(
    (state) => state.operations
  );

  const [outgoingMail, setOutgoingMail] = useState({
    ref_no: "",
    subject: "",
    sender: "",
    recipient: "",
    dispatcher: "",
    date_sent: "",
  });

  const [file_no, setFileNo] = useState("");

  const [updateMail, setUpdateMail] = useState({
    id: "",
    ref_no: "",
    subject: "",
  });

  const [showOthers, setShowOthers] = useState(false);
  const [showOthersRecipient, setShowOthersRecipient] = useState(false);

  const [upload_url, setUploadUrl] = useState("");

  const [imgSrcExt, setImgSrcExt] = useState(null);
  // const [errorMsgs, setErrorMsgs] = useState([]);
  const [successMsgs, setSuccessMsgs] = useState(null);

  const [fileName, setFileName] = useState(null);
  const [temp_file_no, setTempFileNo] = useState("");

  useEffect(() => {
    dispatch(fetchGeneralFiles());
  }, [dispatch]);

  useEffect(() => {
    if (upload_url)
      setImgSrcExt(extractImageFileExtensionFromBase64(upload_url));
  }, [upload_url]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: [
      "image/x-png",
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
    ],
    onDrop: (acceptedFiles, rejectedFiles) => {
      const file = acceptedFiles[0]; //we are only excepting one file at a time (multiple: false) so we can set it to the first item in the array
      if (file) {
        // setErrorMsgs([]);
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            setUploadUrl(reader.result);
          },
          false
        );
        reader.readAsDataURL(file);
      } else {
        // const errorsArray = rejectedFiles[0].errors.map(
        //   (e) => `${e.code}: ${e.message}`
        // );
        setUploadUrl(null);
        setImgSrcExt(null);
        // setErrorMsgs(errorsArray);
      }
    },
    multiple: false,
    maxSize: 3000000,
    minSize: 3000,
  });

  // const handleImageLoaded = (image) => {};

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const upload = (upload_url, fileName) => {
    const uploadFile = base64StringtoFile(upload_url, fileName);
    var fd = new FormData();
    fd.append("mail", uploadFile);
    dispatch(uploadMailScan(updateMail.id, fd));
    dispatch(getMailFail());
    setUpdateMail({
      id: "",
      ref_no: "",
      subject: "",
    });
  };

  const handleUpload = () => {
    upload(upload_url, fileName);
    setSuccessMsgs("Upload in progress...");
    setUploadUrl("");
  };

  const onChangeHandler = (e) => {
    if (e.target.id === "sender") {
      if (e.currentTarget.value === "others") {
        setShowOthers(true);
      } else {
        setShowOthers(false);
        setOutgoingMail({
          ...outgoingMail,
          [e.target.id]: e.currentTarget.value,
        });
      }
    } else if (e.target.id === "recipient") {
      if (e.currentTarget.value === "others") {
        setShowOthersRecipient(true);
      } else {
        setShowOthersRecipient(false);
        setOutgoingMail({
          ...outgoingMail,
          [e.target.id]: e.currentTarget.value,
        });
      }
    } else {
      setOutgoingMail({
        ...outgoingMail,
        [e.target.id]: e.currentTarget.value,
      });
    }
  };

  const toggleSetShowOthers = () => {
    if (showOthers) {
      setShowOthers(!showOthers);
    }
  };

  const toggleSetShowOthersRecipient = () => {
    if (showOthersRecipient) {
      setShowOthersRecipient(!showOthersRecipient);
    }
  };

  const documentFileHandler = (e) => {
    if (e.currentTarget.value !== "") {
      setFileNo(e.currentTarget.value);
    }
  };

  const updateOutgoingMail = async (e) => {
    e.preventDefault();
    if (outgoingMail.subject !== "") {
      dispatch(editMail(updateMail.id, outgoingMail));
    }
    if (user_profile && (user_profile.role === "Admin") | "Registry Officer") {
      if (file_no !== "" && file_no !== temp_file_no && updateMail.id !== "") {
        console.log(file_no, temp_file_no, updateMail.id);
        dispatch(removeMailFromFile(temp_file_no, updateMail.id));
        dispatch(addIncomingMailToFile(file_no, updateMail.id));
        dispatch(editMail(updateMail.id, { filing_status: 1 }));
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      if (message === "Outgoing mail updated successfully") {
        setSuccessMsgs(message);
      }
    }
  }, [message]);

  useEffect(() => {
    if (outgoing_mail && outgoing_mail._id !== undefined) {
      setUpdateMail({
        id: outgoing_mail._id,
        ref_no: outgoing_mail.ref_no,
        subject: outgoing_mail.subject,
      });
      setOutgoingMail({
        ref_no: outgoing_mail.ref_no,
        subject: outgoing_mail.subject,
        sender: outgoing_mail.sender,
        recipient: outgoing_mail.recipient,
        dispatcher: outgoing_mail.dispatcher,
        date_sent: new Date(outgoing_mail.date_sent)
          .toISOString()
          .substring(0, 10),
      });
      setFileName(`${outgoing_mail.ref_no}.` + imgSrcExt);
    }
  }, [outgoing_mail, imgSrcExt]);

  useEffect(() => {
    if (general_files && outgoing_mail) {
      for (let i = 0; i < general_files.length; i++) {
        if (
          general_files[i].outgoingmails &&
          general_files[i].outgoingmails.length !== 0
        ) {
          for (let j = 0; j < general_files[i].outgoingmails.length; j++) {
            if (general_files[i].outgoingmails[j]._id === outgoing_mail._id) {
              setFileNo(general_files[i]._id);
              setTempFileNo(general_files[i]._id)
            }
          }
        }
      }
    }
  }, [general_files, outgoing_mail]);

  useEffect(() => {
    if (successMsgs) {
      setTimeout(() => {
        setSuccessMsgs(null);
      }, 5000);
    }
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
    if (err_message) {
      setTimeout(() => {
        dispatch(clearErrMessage());
      }, 5000);
    }
  }, [dispatch, message, successMsgs, err_message]);

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
                  {/* {error && <Alert variant="warning">{error}</Alert>} */}/
                  {err_message && <Alert variant="danger">{err_message}</Alert>}
                  {successMsgs && (
                    <Alert variant="success">{successMsgs}</Alert>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">New Outgoing Mail</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="ref_no">Ref No</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ref_no"
                      name="ref_no"
                      onChange={onChangeHandler}
                      value={outgoingMail.ref_no}
                      placeholder="Ref No."
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  {" "}
                  <div className="form-group">
                    <label>Document File</label>
                    <select
                      id="file_no"
                      name="file_no"
                      className="form-control select2"
                      style={{ width: "100%" }}
                      value={file_no}
                      onChange={documentFileHandler}
                    >
                      <option value="">Choose File</option>

                      {general_files !== null &&
                        general_files.map((file) => (
                          <option key={file._id} value={file._id}>
                            {file.file_title + " (" + file.mdaShortName + ")"}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  {" "}
                  <div className={showOthers ? "d-none" : "form-group"}>
                    <label>Sender</label>
                    <select
                      id="sender"
                      name="sender"
                      className="form-control select2"
                      style={{ width: "100%" }}
                      value={outgoingMail.sender}
                      onChange={onChangeHandler}
                    >
                      <option value="">Choose Sender</option>
                      <option value="others">Others</option>
                      {mdas !== null &&
                        mdas.map((mda) => (
                          <option key={mda._id} value={mda.name}>
                            {mda.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={showOthers ? "form-group" : "d-none"}>
                    <label htmlFor="sender">
                      Sender (Others Specify){" "}
                      <span
                        className=" badge bg-secondary cursor-pointer"
                        onClick={toggleSetShowOthers}
                      >
                        Choose Sender
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="sender"
                      name="sender"
                      onChange={onChangeHandler}
                      value={outgoingMail.sender}
                      placeholder="Sender"
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  {" "}
                  <div
                    className={showOthersRecipient ? "d-none" : "form-group"}
                  >
                    <label>Reciever</label>
                    <select
                      id="recipient"
                      name="recipient"
                      className="form-control select2"
                      style={{ width: "100%" }}
                      value={outgoingMail.recipient}
                      onChange={onChangeHandler}
                    >
                      <option value="">Choose Receiver-</option>
                      <option value="others">Others</option>
                      {mdas !== null &&
                        mdas.map((mda) => (
                          <option key={mda._id} value={mda.name}>
                            {mda.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div
                    className={showOthersRecipient ? "form-group" : "d-none"}
                  >
                    <label htmlFor="recipient">
                      Receiver (Others Specify){" "}
                      <span
                        className=" badge bg-secondary cursor-pointer"
                        onClick={toggleSetShowOthersRecipient}
                      >
                        Choose Receiver
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient"
                      name="recipient"
                      onChange={onChangeHandler}
                      value={outgoingMail.recipient}
                      placeholder="Reciever"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="name">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      onChange={onChangeHandler}
                      value={outgoingMail.subject}
                      placeholder="Subject"
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="name">Date Sent</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date_sent"
                      name="date_sent"
                      onChange={onChangeHandler}
                      value={outgoingMail.date_sent}
                      placeholder="Date Sent"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button
                type="submit"
                onClick={updateOutgoingMail}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
          {/* /.card */}

          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">
                Mail Document Upload (.png or .jpg format Only)
              </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="ref_no">Ref No</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      id="ref_no"
                      name="ref_no"
                      onChange={onChangeHandler}
                      value={updateMail.ref_no}
                      placeholder="Ref No."
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="name">Document File</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      disabled
                      name="subject"
                      onChange={onChangeHandler}
                      value={updateMail.subject}
                      placeholder="Subject"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  {" "}
                  <div {...getRootProps({ style })} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <p>
                      Click or Drap a file here to Upload (.jpg or .png format
                      Only)
                    </p>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  {" "}
                  <div className="d-flex justify-content-around text-center upload">
                    {" "}
                    <div>
                      {" "}
                      <p className="text-center">Upload Preview</p>
                      {upload_url !== "" && (
                        <img src={upload_url} alt="preview img" width="297" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button
                type="submit"
                onClick={handleUpload}
                className="btn btn-primary"
                disabled={upload_url === "" ? true : false}
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditOutgoingMail;
