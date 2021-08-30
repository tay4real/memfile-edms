import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllMDAs } from "../../../services/mda.service";

import {
  fetchAllDepts,
  deleteDept,
  fetchDept,
} from "../../../services/dept.service";

import DeleteModal from "../../components/DeleteModal";

const DepartmentsList = () => {
  const dispatch = useDispatch();

  // let { message, err_message } = useSelector((state) => state.messages);
  let { mdas, depts, loading } = useSelector((state) => state.operations);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [delDept, setDelDept] = useState({
    id: "",
    name: "",
  });

  const [mdaID, setMdaID] = useState("");

  const mdaHandler = (e) => {
    if (e.currentTarget.value !== "") {
      console.log(e.target.value);
      getDepartments(e.target.value);
      setMdaID(e.currentTarget.value);
    }
  };

  const handleShowDeleteModal = (id, name) => {
    setShowDeleteModal(true);

    setDelDept({
      id: id,
      name: name,
    });
  };

  const getDept = (mdaId, deptId) => {
    dispatch(fetchDept(mdaId, deptId));
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDelDept({
      id: "",
      name: "",
    });
  };

  const handleDelete = () => {
    dispatch(deleteDept(mdaID, delDept.id));
    getDepartments(mdaID);
    setDelDept({
      id: "",
      name: "",
    });

    setShowDeleteModal(false);
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
  }, [dispatch]);

  const getDepartments = async (id) => {
    if (id !== "") {
      await dispatch(fetchAllDepts(id));
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}
      <section className="content">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <select
                    value={mdaID}
                    onChange={mdaHandler}
                    className="py-2 px-3 rounded-lg border-1"
                  >
                    <option value="">Choose MDA</option>
                    {!loading &&
                      mdas.map((mda) => (
                        <option key={mda._id} value={mda._id}>
                          {mda.name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Department Name</th>
                          <th>Department Shortname</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mdaID !== "" && depts !== null ? (
                          depts.length !== 0 ? (
                            depts.map((dept) => (
                              <tr key={dept._id}>
                                <td className="">
                                  <div className="d-flex align-items-center">
                                    <div className=""> {dept.deptName}</div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {dept.deptShortName}
                                  </div>
                                </td>

                                <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                  <Link
                                    to={`/departments/edit/${mdaID}`}
                                    onClick={() => getDept(mdaID, dept._id)}
                                  >
                                    <span className="badge bg-primary">
                                      Edit
                                    </span>
                                  </Link>
                                </td>
                                <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                  <span
                                    onClick={() =>
                                      handleShowDeleteModal(
                                        dept._id,
                                        dept.deptName
                                      )
                                    }
                                    className=" badge bg-danger "
                                  >
                                    Delete
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">
                                <div className="p-1 text-center">
                                  No Department Added
                                </div>
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan="4">
                              <div className="p-1 text-center">
                                Choose an MDA to view Departments
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
        body={`Are you sure you want to delete ${delDept.name}? `}
        delete={handleDelete}
        handleClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default DepartmentsList;
