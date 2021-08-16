import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Image, Spinner, Alert } from "react-bootstrap";
import logo from "../../../assets/img/memfileLogo.jpg";
import { fetchBackend } from "../../../services";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user] = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.email === "" || credentials.password === "") {
      setError("Email and Password is required!");
    } else {
      setError(null);
      setLoading(true);

      try {
        const res = await fetchBackend.post("/auth/login", credentials);

        if (res.statusText === "OK") {
          localStorage.setItem("accessToken", res.data.accessToken);
        }
        setLoading(false);
        setCredentials({ email: "", password: "" });
        if (user) {
        }
        window.location.replace("/");
      } catch (error) {
        if (error.response) {
          setLoading(false);
          if (error.response.status === 404) {
            setLoading(false);
            history.push("/404");
          } else {
            setLoading(false);
            setError(error.response.data);
          }
        } else if (error.request) {
          setLoading(false);
          setError("Sorry, there is a network problem. Retry again");
        } else {
          // anything else
        }
      }
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box ">
        <div className="card">
          <div className="login-logo pt-3">
            <Image src={logo} width="120" />
          </div>

          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <form method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    {loading ? (
                      <Spinner
                        animation="border"
                        className=" spinner-border-sm"
                      />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            {/* /.social-auth-links */}
            <p className="mb-1">
              <NavLink to="">I forgot my password</NavLink>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
};

export default Login;
