import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchGeneralFiles,
  deleteFile,
  fetchGeneralFileById,
} from "../../../services/generalfiles.service";

import DeleteModal from "../../components/DeleteModal";

const GeneralFileList = () => {
  const dispatch = useDispatch();
  let { general_files, loading } = useSelector((state) => state.operations);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [del, setDel] = useState({
    id: "",
    name: "",
  });

  const getGeneralFiles = () => {
    dispatch(fetchGeneralFiles());
  };

  const getFile = (id) => {
    dispatch(fetchGeneralFileById(id));
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
    dispatch(deleteFile(del.id));
    getGeneralFiles();
    setDel({
      id: "",
      name: "",
    });

    setShowDeleteModal(false);
  };

  useEffect(() => {
    dispatch(fetchGeneralFiles());
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* /.card-header */}
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>File No</th>
                        <th>File Title</th>
                        <th>MDA</th>
                        <th>No of Documents in File</th>
                        <th>View Documents</th>
                        <th>Edit File</th>
                        <th>Delete File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {general_files !== null ? (
                        general_files.length !== 0 ? (
                          general_files.map((file) => (
                            <tr key={file._id}>
                              <td className="">
                                <div className="d-flex align-items-center">
                                  <div className=""> {file.file_no}</div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {file.file_title}
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {file.mdaShortName}
                                </div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {file.mails.length}
                                </div>
                              </td>
                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <Link to={`/departments/edit/`}>
                                  <span className="badge bg-primary">View</span>
                                </Link>
                              </td>

                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <Link
                                  to={`/general-files/edit`}
                                  onClick={() => getFile(file._id)}
                                >
                                  <span className="badge bg-primary">Edit</span>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <span
                                  className=" badge bg-danger "
                                  onClick={() =>
                                    handleShowDeleteModal(
                                      file._id,
                                      file.file_title
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
                            <td colSpan="7">
                              <div className="p-1 text-center">
                                No Files Added
                              </div>
                            </td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td colSpan="7">
                            <div className="p-1 text-center">
                              Please wait...
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
        body={`Are you sure you want to delete file ${del.name}? `}
        delete={handleDelete}
        handleClose={handleCloseDeleteModal}
      />
      {/* Main content */}
    </div>
  );
};

export default GeneralFileList;
