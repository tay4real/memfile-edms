import React from "react";
import { Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <section className="content">
            <div className="error-page">
              <h2 className="headline text-warning"> 404</h2>
              <div className="error-content">
                <h3>
                  <i className="fas fa-exclamation-triangle text-warning" />{" "}
                  Oops! Page not found.
                </h3>
                <p>
                  We could not find the page you were looking for. Meanwhile,
                  you may <NavLink to="/">return to dashboard</NavLink> or try
                  using the search form.
                </p>
                <form className="search-form">
                  <div className="input-group">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-warning"
                      >
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                  {/* /.input-group */}
                </form>
              </div>
              {/* /.error-content */}
            </div>
            {/* /.error-page */}
          </section>
        </Row>
      </Container>
    </div>
  );
};

export default Page404;
