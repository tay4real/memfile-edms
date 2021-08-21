import React, { useState, useEffect } from "react";

import { fetchGeneralFiles } from "../../../services/generalfiles.service";
import { useSelector, useDispatch } from "react-redux";
import ContentHeader from "../../components/ContentHeader";

const OutgoingMailDetail = () => {
  const dispatch = useDispatch();
  let { general_files, outgoing_mail } = useSelector(
    (state) => state.operations
  );
  const [file, setFile] = useState({
    file_no: "",
    file_ref: "",
  });

  const [imgBig, setImgBig] = useState({
    url: "",
    index: "",
  });

  useEffect(() => {
    dispatch(fetchGeneralFiles());
  }, [dispatch]);

  useEffect(() => {
    if (general_files && outgoing_mail) {
      for (let i = 0; i < general_files.length; i++) {
        if (
          general_files[i].incomingmails &&
          general_files[i].incomingmails.length !== 0
        ) {
          for (let j = 0; j < general_files[i].incomingmails.length; j++) {
            if (general_files[i].incomingmails[j]._id === outgoing_mail._id) {
              setFile({
                file_no: general_files[i].file_no,
                file_ref:
                  general_files[i].file_title +
                  " (" +
                  general_files[i].mdaShortName +
                  ")",
              });
            }
          }
        }
      }
    }
  }, [general_files, outgoing_mail]);

  return (
    <div className="content-wrapper">
      <ContentHeader />
      <div className="form-group card">
        <div className="border p-2" style={{ minHeight: "30vh" }}>
          {outgoing_mail && (
            <>
              <div className="row">
                <div className="col">
                  <strong>File No: </strong>
                  {file.file_no}
                </div>
                <div className="col">
                  <strong>File: </strong>
                  {file.file_ref}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <strong>Ref No: </strong>
                  {outgoing_mail.ref_no}
                </div>
                <div className="col">
                  <strong>Subject: </strong>
                  {outgoing_mail.subject}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <strong>From: </strong> {outgoing_mail.sender}
                </div>
                <div className="col">
                  <strong>To: </strong> {outgoing_mail.recipient}
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <strong>Mail Uploads:</strong> {}
                </div>
                <div className="row mt-2 p-2">
                  <div className="col col-md-3 d-flex align-items-start justify-content-around">
                    {outgoing_mail.upload_url.length !== 0 &&
                      outgoing_mail.upload_url.map((url, key) => (
                        <div className="d-flex flex-column align-items-center">
                          <img
                            key={`Page ${key + 1}`}
                            src={url}
                            alt={`Page ${key + 1}`}
                            width="100"
                            className="cursor-pointer"
                            onClick={() =>
                              setImgBig({ url: url, index: key + 1 })
                            }
                          />
                          <span>{`Page ${key + 1}`}</span>
                        </div>
                      ))}
                  </div>
                  <div className="col col-md-9">
                    {outgoing_mail.upload_url[0] && (
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={
                            imgBig.url !== ""
                              ? imgBig.url
                              : outgoing_mail.upload_url[0]
                          }
                          alt={
                            imgBig.index !== ""
                              ? `Page ${imgBig.index}`
                              : `Page 1`
                          }
                          width="80%"
                        />
                        <span className="pt-2">
                          {imgBig.index !== ""
                            ? `Page ${imgBig.index}`
                            : `Page 1`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <strong>Previous Charge Comments: </strong>
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
                      {outgoing_mail.charge_comment.length !== 0 ? (
                        outgoing_mail.charge_comment.map((comment) => (
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
                                  new Date(comment.dateCharged)
                                    .toISOString()
                                    .substring(0, 10)}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9">
                            <div className="p-1 text-center">No Comments</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutgoingMailDetail;
