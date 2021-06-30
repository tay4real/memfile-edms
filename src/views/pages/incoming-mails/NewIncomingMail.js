import React, { useState, useEffect, useRef, useMemo } from "react";

import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  base64StringtoFile,
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
} from "../../../utils/utils";

import ContentHeader from "../../components/ContentHeader";

import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllMDAs } from "../../../services/mda.service";

import {
  addNewMail,
  uploadMailScan,
  fetchIncomingMailByID,
} from "../../../services/incoming-mails.service";

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

const NewIncomingMail = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 210, height: 297 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 210;
    const height = 297;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  };

  const savePhoto = () => {
    let photo = photoRef.current;
    // let ctx = photo.getContext("2d");

    let image = photo.toDataURL("image/png");

    setUploadUrl(image);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const dispatch = useDispatch();

  let { message, err_message } = useSelector((state) => state.messages);
  let { mdas, mail } = useSelector((state) => state.operations);

  // const [error, setError] = useState("");

  const [incomingMail, setIncomingMail] = useState({
    ref_no: "",
    subject: "",
    sender: "",
    recipient: "",
    dispatcher: "",
    date_received: "",
  });

  const [updateMail, setUpdateMail] = useState({
    id: "",
    ref_no: "",
    subject: "",
  });

  const [showOthers, setShowOthers] = useState(false);

  const [upload_url, setUploadUrl] = useState("");

  const [imgSrcExt, setImgSrcExt] = useState(null);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [successMsgs, setSuccessMsgs] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 1 / 1.414,
  });
  const [fileName, setFileName] = useState(null);
  const [imageData64, setImageData64] = useState(null);
  const [imageCropped, setImageCropped] = useState(false);

  console.log(upload_url);
  //imgSrc is set onDrop, then set img extension
  useEffect(() => {
    if (upload_url)
      setImgSrcExt(extractImageFileExtensionFromBase64(upload_url));
  }, [upload_url]);

  //imageCropped is set to true on handle crop. then set imageData64
  useEffect(() => {
    if (imageCropped) {
      setImageData64(
        imagePreviewCanvasRef.current.toDataURL("image/" + imgSrcExt)
      );
      setFileName("previewFile." + imgSrcExt);
    }
  }, [imageCropped, imgSrcExt]);

  const imagePreviewCanvasRef = useRef();

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
        setErrorMsgs([]);
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
        const errorsArray = rejectedFiles[0].errors.map(
          (e) => `${e.code}: ${e.message}`
        );
        setUploadUrl(null);
        setImgSrcExt(null);
        setErrorMsgs(errorsArray);
      }
    },
    multiple: false,
    maxSize: 3000000,
    minSize: 3000,
  });

  const handleImageLoaded = (image) => {};

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const getImageDimensions = async (imgSrc) => {
    var img = new Image();
    const dimensions = await new Promise((resolve) => {
      img.onload = function () {
        resolve({ width: this.width, height: this.height });
      };
      img.src = imgSrc;
    });
    return dimensions;
  };

  const handleCropComplete = async (crop, pixelCrop) => {
    if (crop.x === 0) return;
    const canvasRef = imagePreviewCanvasRef.current;
    const dimensions = await getImageDimensions(upload_url);
    const canvasCrop = {
      height: (dimensions.height * pixelCrop.height) / 100,
      width: (dimensions.width * pixelCrop.width) / 100,
      y: (dimensions.height * pixelCrop.y) / 100,
      x: (dimensions.width * pixelCrop.x) / 100,
    };
    await image64toCanvasRef(canvasRef, upload_url, canvasCrop, () => {
      setImageCropped(true);
    });
  };

  const upload = (imageData64, fileName) => {
    console.log(imageData64);
    const myNewCroppedFile = base64StringtoFile(imageData64, fileName);
    var fd = new FormData();
    fd.append("mail", myNewCroppedFile);
    dispatch(uploadMailScan(updateMail.id, fd));
  };

  const handleUpload = () => {
    upload(imageData64, fileName);
  };

  const onChangeHandler = (e) => {
    if (e.target.id === "sender") {
      if (e.currentTarget.value === "others") {
        setShowOthers(true);
      } else {
        setShowOthers(false);
        setIncomingMail({
          ...incomingMail,
          [e.target.id]: e.currentTarget.value,
        });
      }
    } else {
      setIncomingMail({
        ...incomingMail,
        [e.target.id]: e.currentTarget.value,
      });
    }
  };

  const addIncomingMail = async (e) => {
    e.preventDefault();
    if (incomingMail.subject !== "") {
      dispatch(addNewMail(incomingMail));
    }

    setIncomingMail({
      ref_no: "",
      subject: "",
      sender: "",
      recipient: "",
      dispatcher: "",
      date_received: "",
    });
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      dispatch(fetchIncomingMailByID(message));
      setSuccessMsgs("Incoming mail added successfully");
    }
  }, [dispatch, message]);

  useEffect(() => {
    if (mail) {
      setUpdateMail({
        id: mail._id,
        ref_no: mail.ref_no,
        subject: mail.subject,
      });
    }
  }, [mail]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ContentHeader />

      {/* Main content */}
      <div className="row m-0 p-0">
        <div
          className="pt-2 col-sm-9 col-md-9 text-center
            "
        >
          {/* {error && <Alert variant="warning">{error}</Alert>} */}
          {err_message && <Alert variant="warning">{err_message}</Alert>}
          {successMsgs && <Alert variant="success">{successMsgs}</Alert>}
        </div>
      </div>

      <div className="row m-0 p-0">
        <div className="col-sm-9 col-md-6 mx-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New Incoming Mail</h3>
            </div>
            {/* /.card-header */}

            {/* form start */}
            <form method="post" onSubmit={addIncomingMail}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="ref_no">Ref No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ref_no"
                    name="ref_no"
                    onChange={onChangeHandler}
                    value={incomingMail.ref_no}
                    placeholder="Ref No."
                  />
                </div>
                <div className="form-group">
                  <label>Sender</label>
                  <select
                    id="sender"
                    name="sender"
                    className="form-control select2"
                    style={{ width: "100%" }}
                    value={incomingMail.sender}
                    onChange={onChangeHandler}
                  >
                    <option value="">Choose MDA</option>
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
                  <label htmlFor="sender">Sender (Others Specify)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sender"
                    name="sender"
                    onChange={onChangeHandler}
                    value={incomingMail.sender}
                    placeholder="Sender"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipient">Recipient</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient"
                    name="recipient"
                    onChange={onChangeHandler}
                    value={incomingMail.recipient}
                    placeholder="Recipient"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    onChange={onChangeHandler}
                    value={incomingMail.subject}
                    placeholder="Subject"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Date Received</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_received"
                    name="date_received"
                    onChange={onChangeHandler}
                    value={incomingMail.date_received}
                    placeholder="Date Received"
                  />
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-9 col-md-6 mx-auto">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Capture Incoming Mail</h3>
            </div>
            {/* /.card-header */}

            {/* form start */}
            <form method="post" onSubmit={addIncomingMail}>
              <div className="card-body">
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

                <div className="form-group">
                  <label htmlFor="name">Subject</label>
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
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <div className="d-flex justify-content-center w-100 py-2">
                --OR--
              </div>
              <div className="d-flex justify-content-around capture">
                <div className="camera">
                  <video ref={videoRef}></video>
                  <button className="button" onClick={takePhoto}>
                    Capture
                  </button>
                </div>
                <div className={"camera" + (hasPhoto ? " hasPhoto" : "")}>
                  <canvas ref={photoRef}></canvas>
                  <button className="button" onClick={savePhoto}>
                    Crop Image
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-around capture">
                {" "}
                <ReactCrop
                  src={upload_url}
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={handleCropComplete}
                  onImageLoaded={handleImageLoaded}
                />
                <div>
                  {" "}
                  <p>Preview Cropped Image</p>
                  <canvas ref={imagePreviewCanvasRef}></canvas>
                </div>
              </div>{" "}
              {errorMsgs && <p>{errorMsgs}</p>}
              {/* /.card-body */}
              <div className="card-footer">
                <button
                  type="submit"
                  onClick={handleUpload}
                  className="btn btn-primary"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIncomingMail;
