import React, { useState } from "react";
import { Button, Row, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { PieChart } from "react-minimal-pie-chart";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import Car1 from "../public/assets/img/Car1.jpg";

const VehicleDetails = ({ onSearch }: { onSearch: (arg0: string) => void }) => {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  const [activeSection, setActiveSection] = useState("history");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [progressData, setProgressData] = useState({
    value1: 0,
    value2: 0,
  });

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleDateChange = (date: Date | null) => {
    setSearchDate(date);
  };

  return (
    <>
      <Row className="">
        <div style={{ position: "relative", height: "100vh" }}>
          <APIProvider apiKey={mapApiKey}>
            <Map
              zoom={5}
              zoomControl={true}
              center={{ lat: 20.5937, lng: 78.9629 }}
              gestureHandling={"greedy"}
            ></Map>
          </APIProvider>
        </div>
      </Row>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 20,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <div>
          <h3 className="text-center">Hyundai SUV</h3>
          <Image src={Car1} alt="car1" />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            variant={activeSection === "history" ? "primary" : "light"}
            onClick={() => handleSectionChange("history")}
          >
            History
          </Button>{" "}
          <Button
            variant={activeSection === "details" ? "primary" : "light"}
            onClick={() => handleSectionChange("details")}
          >
            Details
          </Button>{" "}
          <Button
            variant={activeSection === "statistics" ? "primary" : "light"}
            onClick={() => handleSectionChange("statistics")}
          >
            Statistics
          </Button>{" "}
        </div>
        <div style={{ marginTop: 20 }}>
          {activeSection === "history" && <p>History Content Goes Here</p>}
          {activeSection === "details" && (
            <div>
              <Form.Group>
                <DatePicker
                  selected={searchDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
            </div>
          )}
          {activeSection === "statistics" && (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <div className="progress blue">
                    <span className="progress-left">
                      <span
                        className="progress-bar"
                        style={{ width: `${progressData.value1}%` }}
                      ></span>
                    </span>
                    <span className="progress-right">
                      <span className="progress-bar"></span>
                    </span>
                    <div className="progress-value">{progressData.value1}%</div>
                  </div>
                </div>
                <div>
                  <p className="statistics-p">
                    Engine coolant temperature : 100
                  </p>
                  <p className="statistics-p">Engine oil temperature : 150</p>
                  <p className="statistics-p">Engine fuel rate : 2000</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
