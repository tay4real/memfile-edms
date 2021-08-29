import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { fetchIncomingMailByID } from "../../../services/incoming-mails.service";
import { fetchOutgoingMailByID } from "../../../services/outgoing-mails.service";
import { fetchAllUsers } from "../../../services/user.service";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FileContent = () => {
  const dispatch = useDispatch();
  let { general_file, users } = useSelector((state) => state.operations);

  const [file, setFile] = useState({
    location: 0,
    file_title: "",
    file_no: "",
    incoming_mails: [],
    outgoing_mails: [],
    file_request_history: [],
    file_return_history: [],
    file_charge_history: [],
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (general_file) {
      setFile({
        location: general_file.file_location,
        file_title: general_file.file_title,
        file_no: general_file.file_no,
        incoming_mails: general_file.incomingmails,
        outgoing_mails: general_file.outgoingmails,
        file_request_history: general_file.fileRequest,
        file_return_history: general_file.fileReturn,
        file_charge_history: general_file.chargeFile,
      });
    }
  }, [general_file]);

  const getIncomingMails = (id) => {
    dispatch(fetchIncomingMailByID(id));
  };

  const getOutgoingMails = (id) => {
    dispatch(fetchOutgoingMailByID(id));
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Main content */}
              <div className="invoice p-3 mb-3">
                {/* title row */}
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <small>
                        <b>File Title: {file.file_title}</b>
                      </small>
                      <small className="float-right">
                        <b>File No:</b> {file.file_no} <br />
                      </small>
                    </h4>
                  </div>
                  {/* /.col */}
                </div>
                {/* info row */}
                <div className="row invoice-info">
                  <div className="col-sm-4 invoice-col">
                    <b>Total Incoming Mails: </b>
                    {file.incoming_mails.length}
                    <br />
                    <b>Total Outgoing Mails: </b>
                    {file.outgoing_mails.length}
                    <br />
                    <b>File in Use: </b>
                    {file.location === 0 && "No"}
                    {file.location === 1 && "Yes"}
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
                {/* Table row */}
                <div className="row mt-3 mb-3">
                  <div className="col-12 table-responsive mb-3">
                    <h5>Incoming Mails</h5>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Ref No.</th>
                          <th>Subject</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Date Received</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {file.incoming_mails.length !== 0 ? (
                          file.incoming_mails.map((mail) => (
                            <tr key={mail._id}>
                              <td className="">
                                <div className="d-flex align-items-center">
                                  <div className=""> {mail.ref_no}</div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.subject}
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.sender}
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.recipient}
                                </div>
                              </td>

                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.date_received &&
                                    new Date(mail.date_received)
                                      .toISOString()
                                      .substring(0, 10)}
                                </div>
                              </td>
                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <Link
                                  to={`/incoming-mails/view`}
                                  onClick={() => getIncomingMails(mail._id)}
                                >
                                  <span className="badge bg-primary">View</span>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9">
                              <div className="p-1 text-center">
                                Sorry, No Incoming Mails added yet
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-12 table-responsive mb-3">
                    <h5>Outgoing Mails</h5>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Ref No.</th>
                          <th>Subject</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Date Sent</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {file.outgoing_mails.length !== 0 ? (
                          file.outgoing_mails.map((mail) => (
                            <tr key={mail._id}>
                              <td className="">
                                <div className="d-flex align-items-center">
                                  <div className=""> {mail.ref_no}</div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.subject}
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.sender}
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.recipient}
                                </div>
                              </td>

                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {mail.date_received &&
                                    new Date(mail.date_received)
                                      .toISOString()
                                      .substring(0, 10)}
                                </div>
                              </td>
                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <Link
                                  to={`/outgoing-mails/view`}
                                  onClick={() => getOutgoingMails(mail._id)}
                                >
                                  <span className="badge bg-primary">View</span>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9">
                              <div className="p-1 text-center">
                                Sorry, No Outgoing Mails added yet
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* /.row */}
                <div className="row mb-3">
                  <div className="col col-md-6 mb-3">
                    <p className="lead">File Request History</p>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>File Request By</th>
                            <th>Date Requested</th>
                          </tr>
                        </thead>
                        <tbody>
                          {file.file_request_history !== 0 ? (
                            file.file_request_history.map((file_request) => (
                              <tr key={file_request._id}>
                                {users &&
                                  users
                                    .filter(
                                      (user) => user._id === file_request.by
                                    )
                                    .map((user) => {
                                      return (
                                        <>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                {user.surname} {user.firstname}
                                              </div>
                                            </div>
                                          </td>
                                          <td className="whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                              {file_request.dateRequested &&
                                                new Date(
                                                  file_request.dateRequested
                                                )
                                                  .toISOString()
                                                  .substring(0, 10)}
                                            </div>
                                          </td>{" "}
                                        </>
                                      );
                                    })}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9">
                                <div className="p-1 text-center">Nil</div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col col-md-6 mb-3">
                    <p className="lead">File Return History</p>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>File Returned By</th>
                            <th>Date Returned</th>
                          </tr>
                        </thead>
                        <tbody>
                          {file.file_return_history !== 0 ? (
                            file.file_return_history.map((file_return) => (
                              <tr key={file_return._id}>
                                {users &&
                                  users
                                    .filter(
                                      (user) => user._id === file_return.by
                                    )
                                    .map((user) => {
                                      return (
                                        <>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                {user.surname} {user.firstname}
                                              </div>
                                            </div>
                                          </td>
                                          <td className="whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                              {file_return.dateReturned &&
                                                new Date(
                                                  file_return.dateReturned
                                                )
                                                  .toISOString()
                                                  .substring(0, 10)}
                                            </div>
                                          </td>{" "}
                                        </>
                                      );
                                    })}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9">
                                <div className="p-1 text-center">Nil</div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <p className="lead">File Charge History</p>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Charge From</th>
                            <th>Charge To</th>
                            <th>Date Charged</th>
                            <th>Document Ref No</th>
                            <th>Document Type</th>
                            <th>Document Subject</th>
                            <th>Charge Comment</th>
                            <th>View Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          {file.file_return_history !== 0 ? (
                            file.file_charge_history.map((file_charge) => (
                              <tr key={file_charge._id}>
                                <td className="">
                                  <div className="d-flex align-items-center">
                                    <div className="">{file_charge.from}</div>
                                  </div>
                                </td>
                                <td className="">
                                  <div className="d-flex align-items-center">
                                    <div className="">{file_charge.to}</div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {file_charge.dateCharged &&
                                      new Date(file_charge.dateCharged)
                                        .toISOString()
                                        .substring(0, 10)}
                                  </div>
                                </td>
                                {file.incoming_mails.length !== 0 &&
                                  file.incoming_mails
                                    .filter(
                                      (mail) => mail._id === file_charge.doc_id
                                    )
                                    .map((mail) => {
                                      return (
                                        <>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                {mail.ref_no}
                                              </div>
                                            </div>
                                          </td>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                Incoming Mail
                                              </div>
                                            </div>
                                          </td>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                {mail.subject}
                                              </div>
                                            </div>
                                          </td>
                                          {mail.charge_comment.length !== 0 &&
                                            mail.charge_comment
                                              .filter(
                                                (comment) =>
                                                  comment.from ===
                                                    file_charge.from &&
                                                  comment.to ===
                                                    file_charge.to &&
                                                  new Date(comment.dateCharged)
                                                    .toISOString()
                                                    .substring(0, 10) ===
                                                    new Date(
                                                      file_charge.dateCharged
                                                    )
                                                      .toISOString()
                                                      .substring(0, 10)
                                              )
                                              .map((comment) => {
                                                return (
                                                  <>
                                                    <td className="">
                                                      <div className="d-flex align-items-center">
                                                        <div className="">
                                                          {comment.comment}
                                                        </div>
                                                      </div>
                                                    </td>{" "}
                                                  </>
                                                );
                                              })}
                                          <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                            <Link
                                              to={`/incoming-mails/view`}
                                              onClick={() =>
                                                getIncomingMails(mail._id)
                                              }
                                            >
                                              <span className="badge bg-primary">
                                                View
                                              </span>
                                            </Link>
                                          </td>
                                        </>
                                      );
                                    })}
                                {file.outgoing_mails.length !== 0 &&
                                  file.outgoing_mails
                                    .filter(
                                      (mail) => mail._id === file_charge.doc_id
                                    )
                                    .map((mail) => {
                                      return (
                                        <>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                {mail.ref_no}
                                              </div>
                                            </div>
                                          </td>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                Outgoing Mail
                                              </div>
                                            </div>
                                          </td>
                                          <td className="">
                                            <div className="d-flex align-items-center">
                                              <div className="">
                                                {mail.subject}
                                              </div>
                                            </div>
                                          </td>
                                          <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                            <Link
                                              to={`/outgoing-mails/view`}
                                              onClick={() =>
                                                getOutgoingMails(mail._id)
                                              }
                                            >
                                              <span className="badge bg-primary">
                                                View
                                              </span>
                                            </Link>
                                          </td>
                                        </>
                                      );
                                    })}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9">
                                <div className="p-1 text-center">Nil</div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.invoice */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
};

export default FileContent;
