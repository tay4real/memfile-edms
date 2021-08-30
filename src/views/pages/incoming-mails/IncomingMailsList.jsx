import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchIncomingMails,
  deleteMail,
  fetchIncomingMailByID,
} from "../../../services/incoming-mails.service";

import DeleteModal from "../../components/DeleteModal";

const IncomingMailsList = () => {
  const dispatch = useDispatch();
  let { incoming_mails } = useSelector((state) => state.operations);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [del, setDel] = useState({
    id: "",
    name: "",
  });

  const getAllIncomingMails = () => {
    dispatch(fetchIncomingMails());
  };

  const getIncomingMails = (id) => {
    dispatch(fetchIncomingMailByID(id));
  };

  const handleShowDeleteModal = (id, name) => {
    setShowDeleteModal(true);

    setDel({
      id: id,
      name: name,
    });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDel({
      id: "",
      name: "",
    });
  };

  const handleDelete = () => {
    dispatch(deleteMail(del.id));
    getAllIncomingMails();
    setDel({
      id: "",
      name: "",
    });

    setShowDeleteModal(false);
  };

  useEffect(() => {
    dispatch(fetchIncomingMails());
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* /.card-header */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Ref No.</th>
                          <th>Subject</th>
                          <th>Sender</th>
                          <th>Recipient</th>
                          <th>Preview</th>
                          <th>Date Received</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incoming_mails !== null ? (
                          incoming_mails.length !== 0 ? (
                            incoming_mails.map((mail) => (
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
                                    {mail.upload_url &&
                                      mail.upload_url.map((url, idx) => {
                                        return (
                                          <img
                                            key={idx}
                                            src={url}
                                            width="30"
                                            alt="preview"
                                          />
                                        );
                                      })}
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
                                    <span className="badge bg-primary">
                                      View
                                    </span>
                                  </Link>
                                </td>

                                <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                  <Link
                                    to={`/incoming-mails/edit`}
                                    onClick={() => getIncomingMails(mail._id)}
                                  >
                                    <span className="badge bg-primary">
                                      Edit
                                    </span>
                                  </Link>
                                </td>
                                <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                  <span
                                    className=" badge bg-danger "
                                    onClick={() =>
                                      handleShowDeleteModal(
                                        mail._id,
                                        mail.subject
                                      )
                                    }
                                  >
                                    Delete
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9">
                                <div className="p-1 text-center">
                                  No Files Added
                                </div>
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan="9">
                              <div className="p-1 text-center">
                                Please wait...
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>

      <DeleteModal
        show={showDeleteModal}
        body={`Are you sure you want to delete  ${del.name}? `}
        delete={handleDelete}
        handleClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default IncomingMailsList;
