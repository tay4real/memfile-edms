import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllMDAs, deleteMDA } from "../../../services/mda.service";
import DeleteModal from "../../components/DeleteModal";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import $ from "jquery";

const MDAsList = () => {
  const dispatch = useDispatch();
  let { mdas } = useSelector((state) => state.operations);

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

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDel({
      id: "",
      name: "",
    });
  };

  const handleDelete = () => {
    dispatch(deleteMDA(del.id));
    getMDAs();
    setDel({
      id: "",
      name: "",
    });

    setShowDeleteModal(false);
  };

  const getMDAs = async () => {
    await dispatch(fetchAllMDAs());
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
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
                        <th> MDA Name</th>
                        <th>MDA Shortname</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mdas !== null &&
                        mdas.map((mda) => (
                          <tr key={mda._id}>
                            <td className="">
                              <div className="d-flex align-items-center">
                                <div className="">{mda.name}</div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {mda.shortName}
                              </div>
                            </td>

                            <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                              <Link to={`/mdas/edit/${mda._id}`}>
                                <span className="badge bg-primary">Edit</span>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                              <span
                                onClick={() =>
                                  handleShowDeleteModal(mda._id, mda.name)
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

export default MDAsList;
