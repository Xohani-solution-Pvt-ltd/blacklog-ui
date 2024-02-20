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
        <Navbar className="bg-dark fixed-top" expand="lg">
          <Navbar.Brand className="tracing_live">
            <Image
              className="track-logo"
              src={logoImg}
              alt={`Logo | ${TITLE}`}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="btn"
            style={{ background: "white" }}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml auto">
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
                  <NavDropdown.Item href="/Tracking/advancetrack">
                    Advance Tracking
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
                  <NavDropdown.Item href="/Reports/datewiseroute">
                    Travel Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Reports/onedayroute">
                    Trip Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Reports/stoppagesummary">
                    Stoppage Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Reports/idlesummary">
                    Idle Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Reports/inactivesummary">
                    Inactive Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Reports/currentlocation">
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
                  <NavDropdown.Item href="/temperaturestatus">
                    Temperature Status
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
