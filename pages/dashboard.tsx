import Link from "next/link";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsGearFill } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      // text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "september",
  "october",
  "november",
  "december",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [57, 88, 63, 56, 45, 63]),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => [55, 56, 46, 36, 47, 86]),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 3",
      data: labels.map(() => [45, 68, 63, 86, 45, 63]),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [autoSuggestions, setAutoSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [progressData, setProgressData] = useState({
    value1: 0,
    value2: 0,
  });
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Line 1",
        data: [20, 30, 25, 35, 30, 40, 35],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Line 2",
        data: [40, 30, 35, 25, 30, 20, 25],
        borderColor: "red",
        fill: false,
      },
      {
        label: "Line 3",
        data: [30, 40, 15, 25, 40, 50, 45],
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT_HERE");
        if (response.ok) {
          const data = await response.json();
          setProgressData({
            value1: data.progress1,
            value2: data.progress2,
          });
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  console.log("mapApiKey", mapApiKey);

  const handleInputChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSearchValue(value);

    const suggestions = [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ];
    const newLocal = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setAutoSuggestions(newLocal);
  };

  const handleSuggestionClick = (suggestion: React.SetStateAction<string>) => {
    setSearchValue(suggestion);
    setAutoSuggestions([]);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`YOUR_API_ENDPOINT/${vehicleId}`);
      const data = await response.json();
      setVehicleData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Layout />
      <div className="underlineStyle">
        <Row className="dashboard-style" style={{ marginTop: "70px" }}>
          <Col sm={6}>
            <h4 className="pt-4">Dashboard</h4>
          </Col>
          <Col sm={6}>
            <div className="search-bar-container pt-4">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="what are you looking for"
                className="search-input"
              />
              <ul className="auto-suggestions">
                {autoSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="another-deatils underlineStyle">
        <Row>
          <Col sm={6}>
            <Row>
              <Col sm={6}>
                <h6 className="pt-2">FLEET PERFORMANCE</h6>
              </Col>
              <Col sm={6}>
                <h6 className="pt-2">Vehicle and Fuel Usage</h6>
              </Col>
              <div className="row  ">
                <div className="col-md-6" style={{ display: "flex" }}>
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
                      <div className="progress-value">
                        {progressData.value1}%
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="progress yellow">
                      <span className="progress-left">
                        <span
                          className="progress-bar"
                          style={{ width: `${progressData.value2}%` }}
                        ></span>
                      </span>
                      <span className="progress-right">
                        <span className="progress-bar"></span>
                      </span>
                      <div className="progress-value">
                        {progressData.value2}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
          <Col sm={6}>
            <div className="pt-2">
              <Button className=" me-3 text-black border-0 btn-hover">
                Daily
              </Button>
              <Button className="me-3 text-black border-0 btn-hover">
                Weekly
              </Button>
              <Button className="me-3 text-black border-0 btn-hover">
                Monthly
              </Button>
              <h6 className="float-end">Usage in Total Work Hour</h6>
            </div>
            <Line options={options} data={data} />
          </Col>
        </Row>
      </div>
      <div className="divided-by-map">
        <Row>
          <Col className="pt-2" sm={6}>
            <h6>MAP</h6>
            <div style={{ height: "40vh", padding: "5" }}>
              <APIProvider apiKey={mapApiKey}>
                <Map
                  zoom={5}
                  zoomControl={true}
                  center={{ lat: 20.5937, lng: 78.9629 }}
                  gestureHandling={"greedy"}
                ></Map>
              </APIProvider>
            </div>
          </Col>
          <Col sm={6}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGearFill />
                <span className="mx-2">VEHICLES</span>
              </div>
              <BsGearFill />
            </div>
            <div>
              <input
                type="text"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                placeholder="Type model or Vehicle ID"
                style={{ marginTop: "10px" }}
              />
              <button onClick={handleSearch} style={{ marginLeft: "20px" }}>
                Search
              </button>
              {vehicleData && (
                <div>
                  <p>Vehicle ID: {vehicleData.vid}</p>
                  <p>Status: {vehicleData.status}</p>
                  <p>Location: {vehicleData.location}</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Dashboard;
