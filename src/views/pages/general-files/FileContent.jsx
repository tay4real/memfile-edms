import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllMDAs } from "../../../services/mda.service";

import { updateFile } from "../../../services/generalfiles.service";

const FileContent = () => {
  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);
  let { mdas, file } = useSelector((state) => state.operations);

  // const [error, setError] = useState("");

  const [editfile, setFile] = useState({
    file_title: "",
    mdaShortName: "",
  });
  const [fileId, setFileID] = useState("");

  const onChangeHandler = (e) => {
    setFile({
      ...file,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const editFile = async (e) => {
    e.preventDefault();
    if (fileId !== "") {
      dispatch(updateFile(fileId, editfile));
    }
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());

    if (file) {
      setFile({
        file_title: file.file_title,
        mdaShortName: file.mdaShortName,
      });
      setFileID(file._id);
    }
  }, [dispatch, file]);

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
                      <small>File Name: AdminLTE, Inc.</small>
                      <small className="float-right">File No: 2/10/2014</small>
                    </h4>
                  </div>
                  {/* /.col */}
                </div>
                {/* info row */}
                <div className="row invoice-info">
                  <div className="col-sm-4 invoice-col">
                    From
                    <address>
                      <strong>Admin, Inc.</strong>
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    To
                    <address>
                      <strong>John Doe</strong>
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <b>Invoice #007612</b>
                    <br />
                    <br />
                    <b>Order ID:</b> 4F3S8J
                    <br />
                    <b>Payment Due:</b> 2/22/2014
                    <br />
                    <b>Account:</b> 968-34567
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
                {/* Table row */}
                <div className="row">
                  <div className="col-12 table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Qty</th>
                          <th>Product</th>
                          <th>Serial #</th>
                          <th>Description</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Call of Duty</td>
                          <td>455-981-221</td>
                          <td>
                            El snort testosterone trophy driving gloves handsome
                          </td>
                          <td>$64.50</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Need for Speed IV</td>
                          <td>247-925-726</td>
                          <td>Wes Anderson umami biodiesel</td>
                          <td>$50.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Monsters DVD</td>
                          <td>735-845-642</td>
                          <td>
                            Terry Richardson helvetica tousled street art master
                          </td>
                          <td>$10.70</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Grown Ups Blue Ray</td>
                          <td>422-568-642</td>
                          <td>Tousled lomo letterpress</td>
                          <td>$25.99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
                <div className="row">
                  {/* accepted payments column */}
                  <div className="col-6">
                    <p className="lead">Payment Methods:</p>
                    <img src="../../dist/img/credit/visa.png" alt="Visa" />
                    <img
                      src="../../dist/img/credit/mastercard.png"
                      alt="Mastercard"
                    />
                    <img
                      src="../../dist/img/credit/american-express.png"
                      alt="American Express"
                    />
                    <img src="../../dist/img/credit/paypal2.png" alt="Paypal" />
                    <p
                      className="text-muted well well-sm shadow-none"
                      style={{ marginTop: 10 }}
                    >
                      Etsy doostang zoodles disqus groupon greplin oooj voxy
                      zoodles, weebly ning heekya handango imeem plugg dopplr
                      jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                    </p>
                  </div>
                  {/* /.col */}
                  <div className="col-6">
                    <p className="lead">Amount Due 2/22/2014</p>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th style={{ width: "50%" }}>Subtotal:</th>
                            <td>$250.30</td>
                          </tr>
                          <tr>
                            <th>Tax (9.3%)</th>
                            <td>$10.34</td>
                          </tr>
                          <tr>
                            <th>Shipping:</th>
                            <td>$5.80</td>
                          </tr>
                          <tr>
                            <th>Total:</th>
                            <td>$265.24</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
                {/* this row will not appear when printing */}
                <div className="row no-print">
                  <div className="col-12">
                    <a
                      href="invoice-print.html"
                      rel="noopener"
                      target="_blank"
                      className="btn btn-default"
                    >
                      <i className="fas fa-print" /> Print
                    </a>
                    <button
                      type="button"
                      className="btn btn-success float-right"
                    >
                      <i className="far fa-credit-card" /> Submit Payment
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                      style={{ marginRight: 5 }}
                    >
                      <i className="fas fa-download" /> Generate PDF
                    </button>
                  </div>
                </div>
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
