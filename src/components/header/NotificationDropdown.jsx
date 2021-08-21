import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByID, fetchActiveUsers } from "../../services/user.service";

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  let { user_profile } = useSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchActiveUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserByID(user._id));
    }
  }, [dispatch, user]);

  return (
    <li className="nav-item dropdown">
      <Link className="nav-link" data-toggle="dropdown" to="/">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">
          {user_profile && user_profile.generalfiles
            ? user_profile.generalfiles.length === 0
              ? ""
              : user_profile.generalfiles.length
            : ""}
        </span>
      </Link>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">
          {" "}
          {user_profile && user_profile.generalfiles
            ? user_profile.generalfiles.length === 0
              ? ""
              : user_profile.generalfiles.length === 1
              ? `${user_profile.generalfiles.length} notification`
              : `${user_profile.generalfiles.length} notifications`
            : ""}
        </span>
        <div className="dropdown-divider" />

        <div className="dropdown-divider" />
        <Link to="/files/desk-files" className="dropdown-item">
          {user_profile && user_profile.generalfiles ? (
            user_profile.generalfiles.length === 0 ? (
              ""
            ) : user_profile.generalfiles.length === 1 ? (
              <>
                {" "}
                <i className="fas fa-file mr-2" />
                {user_profile.generalfiles.length} file at your desk
                {/* <span className="float-right text-muted text-sm">
                  2 days
                </span>{" "} */}
              </>
            ) : (
              <>
                {" "}
                <i className="fas fa-file mr-2" />
                {user_profile.generalfiles.length} files at your desk
                {/* <span className="float-right text-muted text-sm">
                  2 days
                </span>{" "} */}
              </>
            )
          ) : (
            ""
          )}
        </Link>

        {user_profile && user_profile.generalfiles ? (
          user_profile.generalfiles.length === 0 ? (
            <>
              <div className="dropdown-divider" />
              <Link
                to="/files/desk-files"
                className="dropdown-item dropdown-footer"
              >
                No task available at your desk
              </Link>
            </>
          ) : user_profile.generalfiles.length === 1 ? (
            ""
          ) : (
            <>
              <div className="dropdown-divider" />
              <Link
                to="/files/desk-files"
                className="dropdown-item dropdown-footer"
              >
                See All Notifications
              </Link>
            </>
          )
        ) : (
          <>
            <div className="dropdown-divider" />
            <Link
              to="/files/desk-files"
              className="dropdown-item dropdown-footer"
            >
              You all caught up. No task available
            </Link>
          </>
        )}
      </div>
    </li>
  );
};

export default NotificationDropdown;
