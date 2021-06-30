import React from "react";
import ContentHeader from "../components/ContentHeader";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <ContentHeader />

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>Incoming Mails</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <NavLink to="/incoming-mails" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>53</h3>
                    <p>Outgoing Mails</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <NavLink to="/outgoing-mails" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>Active Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <NavLink to="/users" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Personal Files</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <NavLink to="/files" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
