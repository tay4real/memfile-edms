import React, { useEffect, useMemo, useState } from "react";
import ContentHeader from "../components/ContentHeader";
import { NavLink } from "react-router-dom";
import Chart from "../components/chart/Chart";
import { fetchBackend } from "../../services";
import { MailOutline, Mail, Folder } from "@material-ui/icons";

const Dashboard = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [incomingMailStats, setIncomingMailStats] = useState([]);
  const [outgoingMailStats, setOutgoingMailStats] = useState([]);
  const [totalOutgoingMails, setTotalOutgoingMails] = useState({});
  const [totalIncomingMails, setTotalIncomingMails] = useState({});
  const [totalGeneralFiles, setTotalGeneralFiles] = useState({});

  useEffect(() => {
    const getIncomingStats = async () => {
      try {
        const res = await fetchBackend.get("/incoming-mails/report/stats");
        const statList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statList.map((item) =>
          setIncomingMailStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Incoming Mail": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getIncomingStats();
  }, [MONTHS]);

  useEffect(() => {
    const getOutgoingStats = async () => {
      try {
        const res = await fetchBackend.get("/outgoing-mails/report/stats");
        const statList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statList.map((item) =>
          setOutgoingMailStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Outgoing Mail": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getOutgoingStats();
  }, [MONTHS]);

  useEffect(() => {
    const getTotalIncomingMails = async () => {
      try {
        const res = await fetchBackend.get("/incoming-mails/report/counts");

        setTotalIncomingMails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalIncomingMails();
  }, []);

  useEffect(() => {
    const getTotalOutgoingMails = async () => {
      try {
        const res = await fetchBackend.get("/outgoing-mails/report/counts");

        setTotalOutgoingMails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalOutgoingMails();
  }, []);

  useEffect(() => {
    const getTotalGeneralFiles = async () => {
      try {
        const res = await fetchBackend.get("/general-files/report/counts");

        setTotalGeneralFiles(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalGeneralFiles();
  }, []);

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
              <div className="col-md-4 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{totalIncomingMails.total}</h3>
                    <p>Incoming Mails</p>
                  </div>
                  <div className="icon">
                    {/* <i className="ion ion-bag" /> */}
                    <MailOutline />
                  </div>
                  <NavLink to="/incoming-mails" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}
              <div className="col-md-4 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{totalOutgoingMails.total}</h3>
                    <p>Outgoing Mails</p>
                  </div>
                  <div className="icon">
                    {/* <i className="ion ion-stats-bars" /> */}
                    <Mail />
                  </div>
                  <NavLink to="/outgoing-mails" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}

              {/* ./col */}
              <div className="col-md-4 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{totalGeneralFiles.total}</h3>
                    <p>General Files</p>
                  </div>
                  <div className="icon">
                    {/* <i className="ion ion-pie-graph" /> */}
                    <Folder />
                  </div>
                  <NavLink to="/general-files" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </NavLink>
                </div>
              </div>
              {/* ./col */}
            </div>

            <div className="row">
              <div className="col-12">
                {" "}
                <Chart
                  data={incomingMailStats}
                  title="Incoming Mail Analytics"
                  grid
                  dataKey="New Incoming Mail"
                />
              </div>
              <div className="col-12">
                <Chart
                  data={outgoingMailStats}
                  title="Outgoing Mail Analytics"
                  grid
                  dataKey="New Outgoing Mail"
                />
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
