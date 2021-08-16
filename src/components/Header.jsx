import React, { useEffect, useState } from "react";
// import MessageDropdown from "./header/MessageDropdown";
import NotificationDropdown from "./header/NotificationDropdown";
import "./header.css";

import { NavLink, Link } from "react-router-dom";
import { fetchBackend } from "../services";
import { fetchIncomingMailByID } from "../services/incoming-mails.service";
import { fetchOutgoingMailByID } from "../services/outgoing-mails.service";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const [incomingMailResult, setIncomingMailResult] = useState(null);
  const [outgoingMailResult, setOutgoingMailResult] = useState(null);
  const [generalFileResult, setGeneralFileResult] = useState(null);
  const [searchKeyword, setSearchKeyWord] = useState("");

  const handleSearchInput = (e) => {
    if (e.currentTarget.value !== "") {
      setSearchKeyWord(e.currentTarget.value);
    }
  };

  const getIncomingMails = (id) => {
    dispatch(fetchIncomingMailByID(id));
  };

  const getOutgoingMails = (id) => {
    dispatch(fetchOutgoingMailByID(id));
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const generalFileResponse = await fetchBackend.post(
          "/general-files/search/results",
          { criteria: searchKeyword }
        );
        const outgoingMailResponse = await fetchBackend.post(
          "/outgoing-mails/search/results",
          { criteria: searchKeyword }
        );
        const incomingMailResponse = await fetchBackend.post(
          "/incoming-mails/search/results",
          { criteria: searchKeyword }
        );
        if (generalFileResponse.data) {
          setGeneralFileResult(generalFileResponse.data);
        } else {
          setGeneralFileResult(null);
        }
        if (outgoingMailResponse.data) {
          setOutgoingMailResult(outgoingMailResponse.data);
        } else {
          setOutgoingMailResult(null);
        }
        if (incomingMailResponse.data) {
          setIncomingMailResult(incomingMailResponse.data);
        } else {
          setIncomingMailResult(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSubmit();
  }, [searchKeyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchKeyword !== "") {
      try {
        const generalFileResponse = await fetchBackend.post(
          "/general-files/search/results",
          { criteria: searchKeyword }
        );
        const outgoingMailResponse = await fetchBackend.post(
          "/outgoing-mails/search/results",
          { criteria: searchKeyword }
        );
        const incomingMailResponse = await fetchBackend.post(
          "/incoming-mails/search/results",
          { criteria: searchKeyword }
        );
        if (generalFileResponse.data) {
          setGeneralFileResult(generalFileResponse.data);
        } else {
          setGeneralFileResult(null);
        }
        if (outgoingMailResponse.data) {
          setOutgoingMailResult(outgoingMailResponse.data);
        } else {
          setOutgoingMailResult(null);
        }
        if (incomingMailResponse.data) {
          setIncomingMailResult(incomingMailResponse.data);
        } else {
          setIncomingMailResult(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <NavLink
            className="nav-link"
            data-widget="navbar-search"
            to="/search"
            role="button"
          >
            <i className="fas fa-search" />
          </NavLink>
          <div className="navbar-search-block">
            <form className="form-inline" onSubmit={handleSubmit}>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearchInput}
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar">
                    <i className="fas fa-search" />
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </form>
            {(incomingMailResult ||
              outgoingMailResult ||
              generalFileResult) && (
              <div className="searchResult">
                <h5>
                  {(incomingMailResult && incomingMailResult.length) +
                    (outgoingMailResult && outgoingMailResult.length) +
                    (generalFileResult && generalFileResult.length)}{" "}
                  Result(s) found
                </h5>

                {incomingMailResult &&
                  incomingMailResult.map((mail) => {
                    return (
                      <Link
                        key={mail._id}
                        to={`/incoming-mails/view`}
                        onClick={() => getIncomingMails(mail._id)}
                        className="displaySearch"
                      >
                        <div className="keyword">
                          {mail.ref_no} | {mail.subject}
                        </div>
                        <div className="category">
                          <small>
                            <b>- Incoming Mails</b>
                          </small>
                        </div>
                      </Link>
                    );
                  })}

                {outgoingMailResult &&
                  outgoingMailResult.map((mail) => {
                    return (
                      <Link
                        key={mail._id}
                        to="/outgoing-mails/view"
                        onClick={() => getOutgoingMails(mail._id)}
                        className="displaySearch"
                      >
                        <div className="keyword">
                          {mail.ref_no} | {mail.subject}
                        </div>
                        <div className="category">
                          <small>
                            <b>- Outgoing Mails</b>
                          </small>
                        </div>
                      </Link>
                    );
                  })}

                {generalFileResult &&
                  generalFileResult.map((file) => {
                    return (
                      <Link key={file._id} to="/" className="displaySearch">
                        <div className="keyword">
                          {file.file_no} | {file.file_title}
                        </div>
                        <div className="category">
                          <small>
                            <b>- General Files</b>
                          </small>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </li>

        {/* Messages Dropdown Menu */}
        {/* <MessageDropdown /> */}

        {/* Notifications Dropdown Menu */}
        <NotificationDropdown />

        <li className="nav-item">
          <NavLink
            className="nav-link"
            data-widget="fullscreen"
            to=""
            role="button"
          >
            <i className="fas fa-expand-arrows-alt" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
