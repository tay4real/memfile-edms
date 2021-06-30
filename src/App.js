import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./assets/img/logo.png";

import { useSelector } from "react-redux";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const loading = (
  <div className="preloader flex-column justify-content-center align-items-center">
    <img
      className="animation__shake"
      src={logo}
      alt="Memfile Logo"
      height={60}
      width={60}
    />
  </div>
);

const App = () => {
  let { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          {/* <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            /> */}
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />

          <Route
            path="/"
            name="Home"
            render={
              user
                ? (props) => <DefaultLayout {...props} />
                : (props) => <Login {...props} />
            }
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
