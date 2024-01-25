import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import logoImg from "../styles/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import TrackingImg from "../public/assets/img/track-icon.png";
import ReportsImg from "../public/assets/img/reports.png";
import GeofenceImg from "../public/assets/img/geofence.png";
import TemperatureImg from "../public/assets/img/temperature.png";
import AlertImg from "../public/assets/img/alert.png";
import AppConfigImg from "../public/assets/img/app config.png";
import { useRouter } from "next/navigation";
import { APP_INFO } from "../environments/index";

const TrackDevice = () => {
  const { TITLE } = APP_INFO;
  const router = useRouter();
  const customTitleStyle = {
    color: "white",
    fontSize: "12px",
  };

  return (
    <>
      <Container fluid>
        <Navbar className="blacklog_style bg-dark fixed-top" expand="lg">
          <Navbar.Brand className="tracing_live">
            <Image
              className="track-logo"
              src={logoImg}
              alt={`Logo | ${TITLE}`}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="btn btn-danger"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="backs ml auto">
              {/* Tracking */}
              <div>
                <Image
                  src={TrackingImg}
                  height={30}
                  width={30}
                  alt="tracking"
                  style={{ marginLeft: "20px" }}
                />
                <NavDropdown
                  className="mx-1 h-7 "
                  id="nav-dropdown-autoclose-true"
                  title={<span style={customTitleStyle}>Tracking</span>}
                >
                  <NavDropdown.Item href="/advancetracking">
                    Advance Tracking
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/detaildashboard">
                    Detail Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              {/* Reports */}
              <div>
                <Image
                  src={ReportsImg}
                  height={30}
                  width={30}
                  alt="reports"
                  style={{ marginLeft: "20px" }}
                />
                <NavDropdown
                  className="mx-1 h-7 "
                  id="nav-dropdown-autoclose-true"
                  title={<span style={customTitleStyle}>Reports</span>}
                >
                  <NavDropdown.Item href="/travelsummary">
                    Travel Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/tripsummary">
                    Trip Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/stoppagesummary">
                    Stoppage Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/idlesummary">
                    Idle Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/inactivesummary">
                    Inactive Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/digitalportsummary">
                    Digital Port Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/speedvsdistance">
                    Speed vs Distance
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/vehiclelocation">
                    Vehicle Location
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/vehiclestatus">
                    Vehicle Status
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/personalreports">
                    Personal Report
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/schedulereports">
                    Schedule Reports
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              {/* geofence */}
              <div>
                <Image
                  src={GeofenceImg}
                  height={30}
                  width={30}
                  alt="geofence"
                  style={{ marginLeft: "20px" }}
                />
                <NavDropdown
                  className="mx-1 h-7 "
                  id="nav-dropdown-autoclose-true"
                  title={<span style={customTitleStyle}>Geofence</span>}
                >
                  <NavDropdown.Item href="/Geofence/geofence">
                    Geofence Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/temperaturechart">
                    Geofence Visited Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/temperaturestatus">
                    Geofence Wise Trip Summary
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              {/* Temperature */}
              <div>
                <Image
                  src={TemperatureImg}
                  height={30}
                  width={30}
                  alt="temperature"
                  style={{ marginLeft: "20px" }}
                />
                <NavDropdown
                  className="mx-1 h-7 "
                  id="nav-dropdown-autoclose-true"
                  title={<span style={customTitleStyle}>Temperature</span>}
                >
                  <NavDropdown.Item href="/temperaturedashboard">
                    Temperature Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/temperaturechart">
                    Temperature Chart
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/temperaturestatus">
                    Temperature Status
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/temperaturesummary">
                    Temperature Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/temperaturedetailsummary">
                    Temperature Detail Summary
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              {/* Alerts */}
              <div>
                <Image
                  src={AlertImg}
                  height={30}
                  width={30}
                  alt="alert"
                  style={{ marginLeft: "15px" }}
                />
                <NavDropdown
                  className="mx-1 h-7 "
                  id="nav-dropdown-autoclose-true"
                  title={<span style={customTitleStyle}>Alerts</span>}
                >
                  <NavDropdown.Item href="/vehiclealert">
                    Vehicle Alert
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/addalert">
                    Add Alert
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              {/* App Config */}
              <div>
                <Image
                  src={AppConfigImg}
                  height={30}
                  width={30}
                  alt="app config"
                  style={{ marginLeft: "25px" }}
                />
                <NavDropdown
                  className="mx-1 h-7 "
                  id="nav-dropdown-autoclose-true"
                  title={<span style={customTitleStyle}>App Config</span>}
                >
                  <NavDropdown.Item href="/branch">Branch</NavDropdown.Item>
                  <NavDropdown.Item href="/vehicle">Vehicle</NavDropdown.Item>
                  <NavDropdown.Item href="/employee">Employee</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="System">
          <h2 className="text-center">Welcome to Vehicle Tracking System</h2>
          <p className="text-center">(Please use the navigation tree)</p>
        </div>
      </Container>
    </>
  );
};
export default TrackDevice;
