import React from "react";
import { Form, FormControl, Button, Card, Col, Row } from "react-bootstrap";
import Image from "next/image";
import Car1 from "../public/assets/img/Car1.jpg";
import Car2 from "../public/assets/img/Car2.jpg";

const MapSideBar = ({ onSearch }: { onSearch: (arg0: string) => void }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <Form>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #333",
          marginTop: "10px",
        }}
      >
        <div>
          <Image src={Car1} alt="car1" className="sidebar-img" />
        </div>
        <div style={{ marginLeft: "25px" }}>
          <h6>Hyundai SUV</h6>
          <p className="sidebar-p">Vehicle No. - MP09CA0101</p>
          <p className="sidebar-p">Last Location - Indore</p>
        </div>
        <div style={{ marginTop: "50px", marginLeft: "15px" }}>
          <p>7:26 am</p>
        </div>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid #333" }}>
        <div>
          <Image src={Car2} alt="car2" className="sidebar-img" />
        </div>
        <div style={{ marginLeft: "25px" }}>
          <h6>Hyundai SUV</h6>
          <p className="sidebar-p">Vehicle No. - MP09CA0101</p>
          <p className="sidebar-p">Last Location - Indore</p>
        </div>
        <div style={{ marginTop: "50px", marginLeft: "15px" }}>
          <p>7:26 am</p>
        </div>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid #333" }}>
        <div>
          <Image src={Car1} alt="car1" className="sidebar-img" />
        </div>
        <div style={{ marginLeft: "25px" }}>
          <h6>Hyundai SUV</h6>
          <p className="sidebar-p">Vehicle No. - MP09CA0101</p>
          <p className="sidebar-p">Last Location - Indore</p>
        </div>
        <div style={{ marginTop: "50px", marginLeft: "15px" }}>
          <p>7:26 am</p>
        </div>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid #333" }}>
        <div>
          <Image src={Car2} alt="car2" className="sidebar-img" />
        </div>
        <div style={{ marginLeft: "25px" }}>
          <h6>Hyundai SUV</h6>
          <p className="sidebar-p">Vehicle No. - MP09CA0101</p>
          <p className="sidebar-p">Last Location - Indore</p>
        </div>
        <div style={{ marginTop: "50px", marginLeft: "15px" }}>
          <p>7:26 am</p>
        </div>
      </div>
    </div>
  );
};

export default MapSideBar;
