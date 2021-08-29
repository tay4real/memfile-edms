import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "../../../services/user.service";
import DeleteModal from "../../components/DeleteModal";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import $ from "jquery";

const UsersList = () => {
  const dispatch = useDispatch();
  let { users } = useSelector((state) => state.operations);

  //initialize datatable
  $(document).ready(function () {
    $("#example1").DataTable();
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [del, setDel] = useState({
    id: "",
    name: "",
  });

  const handleShowDeleteModal = (id, name) => {
    setShowDeleteModal(true);
    setDel({
      id: id,
      name: name,
    });
  };

  const activateUser = (id, name) => {
    setShowDeleteModal(true);
    setDel({
      id: id,
      name: name,
    });
  };

  const deactivateUser = (id, name) => {
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
    dispatch(deleteUser(del.id));
    getUsers();
    setDel({
      id: "",
      name: "",
    });

    setShowDeleteModal(false);
  };

  const getUsers = async () => {
    await dispatch(fetchAllUsers());
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
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
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Post</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Change Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users !== null &&
                        users.map((user) => (
                          <tr key={user._id}>
                            <td className="">
                              <div className="d-flex align-items-center">
                                <div className="image">
                                  <img
                                    src={user.avatar}
                                    className="img-circle elevation-2"
                                    alt="User"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="">
                              <div className="d-flex align-items-center">
                                <div className="">
                                  {user.surname} {user.firstname}
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.department}
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.post}
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.role}
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.status === 0 ? (
                                  <span className="badge bg-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge bg-warning">
                                    Inactive
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.status === 0 ? (
                                  <span
                                    className="badge bg-warning"
                                    onClick={() =>
                                      deactivateUser(
                                        user._id,
                                        user.surname + " " + user.firstname
                                      )
                                    }
                                  >
                                    Deactivate
                                  </span>
                                ) : (
                                  <span
                                    className="badge bg-success"
                                    onClick={() =>
                                      activateUser(
                                        user._id,
                                        user.surname + " " + user.firstname
                                      )
                                    }
                                  >
                                    Activate
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                              <Link to={`/users/edit/${user._id}`}>
                                <span className="badge bg-primary">Edit</span>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                              <span
                                onClick={() =>
                                  handleShowDeleteModal(
                                    user._id,
                                    user.surname + " " + user.firstname
                                  )
                                }
                                className=" badge bg-danger "
                              >
                                Delete
                              </span>
                            </td>
                          </tr>
                        ))}
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
        body={`Are you sure you want to delete ${del.name}? `}
        delete={handleDelete}
        handleClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default UsersList;
