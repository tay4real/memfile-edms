import React, { useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { fetchUserByID } from "../../../services/user.service";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const DeskFiles = () => {
  const dispatch = useDispatch();
  let { user_profile } = useSelector((state) => state.operations);

  let { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserByID(user._id));
    }
  }, [dispatch, user]);

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
                      {user_profile !== null ? (
                        user_profile.generalfiles.length !== 0 ? (
                          user_profile.generalfiles.map((file) => (
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
                                  {file.incomingmails.length +
                                    file.outgoingmails.length}
                                </div>
                              </td>

                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <Link to={`/departments/edit/`}>
                                  <span className="badge bg-primary">View</span>
                                </Link>
                              </td>

                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <Link to={`/general-files/edit`}>
                                  <span className="badge bg-primary">Edit</span>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <span className=" badge bg-danger ">
                                  Delete
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">
                              <div className="p-1 text-center">
                                You currently do not have any files at your desk
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
    </div>
  );
};

export default DeskFiles;
