<div className="row m-0 p-0">
  <div className="col-sm-9 col-md-6 mx-auto">
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Add New Outgoing Mail</h3>
      </div>
      {/* /.card-header */}

      {/* form start */}
      <form method="post" onSubmit={addOutgoingMail}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="ref_no">Ref No</label>
            <input
              type="text"
              className="form-control"
              id="ref_no"
              name="ref_no"
              onChange={onChangeHandler}
              value={outgoingMail.ref_no}
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
              value={outgoingMail.sender}
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
              value={outgoingMail.sender}
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
              value={outgoingMail.recipient}
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
              value={outgoingMail.subject}
              placeholder="Subject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Date Received</label>
            <input
              type="date"
              className="form-control"
              id="date_sent"
              name="date_sent"
              onChange={onChangeHandler}
              value={outgoingMail.date_sent}
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
        <h3 className="card-title">Capture Outgoing Mail</h3>
      </div>
      {/* /.card-header */}

      {/* form start */}
      <form method="post" onSubmit={addOutgoingMail}>
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
        <div className="d-flex justify-content-center w-100 py-2">--OR--</div>
        <div className="d-flex justify-content-around capture">
          <div className="camera">
            <video
              ref={videoRef}
              style={{ width: "210px", height: "297px" }}
            ></video>
            <button className="button" onClick={takePhoto}>
              Capture
            </button>
          </div>
          <div className={"camera" + (hasPhoto ? " hasPhoto" : "")}>
            <canvas
              ref={photoRef}
              style={{ width: "210px", height: "297px" }}
            ></canvas>
            <button className="button" onClick={savePhoto}>
              Send for Cropping
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-around capture">
          {" "}
          <div>
            <p>Crop Image</p>
            <ReactCrop
              src={upload_url}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={handleCropComplete}
              onImageLoaded={handleImageLoaded}
              style={{ width: "210px", height: "297px" }}
            />
          </div>
          <div>
            {" "}
            <p>Preview Cropped Image</p>
            <canvas
              ref={imagePreviewCanvasRef}
              style={{ width: "210px", height: "297px" }}
            ></canvas>
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
</div>;
