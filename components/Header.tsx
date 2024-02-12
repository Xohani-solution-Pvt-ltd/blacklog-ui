import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import logoImg from "../public/assets/img/logo_2.png";
import router from "next/router";

export default function Header() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      router.push("/");
    }
  }, [toggle]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Container fluid>
      <Navbar
        expand="lg"
        className="fixed-top bg-dark px-4"
        collapseOnSelect
        variant="white"
      >
        <Navbar.Brand href="/">
          <Image
            className="pr-2"
            src={logoImg}
            height={50}
            width={50}
            alt={`Logo`}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="btn"
          style={{ background: "white" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav-collapse">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/mapview" className="text-white">
              Map
            </Nav.Link>
            <Nav.Link href="/vehicles" className="text-white">
              Vehicles
            </Nav.Link>
            <Nav.Link href="/editprofile" className="text-white">
              Edit Profile
            </Nav.Link>
            <Nav.Link href="/carlist" className="text-white">
              Vehicle List
            </Nav.Link>

            <Nav.Link href="/vehicledetails" className="text-white">
              Vehicle Details
            </Nav.Link>
            <Nav.Link
              href="/trackdevice"
              className="text-white"
              onClick={handleToggle}
            >
              Track Device
            </Nav.Link>
            <Nav.Link href="/rtd" className="text-white">
              RTD
            </Nav.Link>
          </Nav>

          <div className="btns-nav ml-auto">
            {/* <Button className="display-4 me-3">
              <Nav.Link href="/map" className="text-white">
                View Map
              </Nav.Link>
            </Button>
            <Button className="display-4 me-3">
              <Nav.Link href="/signup" className="text-white">
                Signup/Login
              </Nav.Link>
            </Button> */}
            <Button className="ml-auto">
              <Nav.Link href="/login" className="text-white">
                Log Out
              </Nav.Link>
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
