import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
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

import {
  GoogleMap,
  useLoadScript,
  Marker as MarkerF,
  InfoWindow as InfoWindowF,
} from "@react-google-maps/api";
import Image from "next/image";

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
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      borderCapStyle: "round",
    },
  },
  maintainAspectRatio: false,
  height: 400,
  width: 800,
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
        const response = await fetch("");
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
  // console.log("mapApiKey", mapApiKey);

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

  // pins on map start

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ["geometry"], []);
  const [vehicleNumbers, setVehicleNumbers] = useState<string[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const onMapLoad = async (map: google.maps.Map) => {
    setGoogleMap(map);
  };

  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: process.env.REACT_MAP_ID,
      mapTypeControl: false,
      zoomControl: false,
      fullscreenControl: false,
      clickableIcons: false,
      scrollwheel: true,
      streetViewControl: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://52.66.172.170:3000/api/v1/fetchCar");
        const data = await response.json();
        const dataArray = [];

        if (data && Array.isArray(data.data)) {
          data.data.forEach((object: any) => {
            const formattedData = {
              vehicleNo: object.vehicleNo,
            };
            dataArray.push(formattedData);
          });
          setVehicleNumbers(dataArray.map((item) => item.vehicleNo));
        }
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      if (vehicleNumbers.length === 0) {
        return;
      }
      const markersArray = [];

      for (const vehicleNo of vehicleNumbers) {
        const apiUrl = `http://52.66.172.170:3000/api/v1/vehicleData?vehicleNo=${vehicleNo}`;
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            console.error(
              `HTTP error! Status: ${response.status}, URL: ${response.url}`
            );
            return;
          }
          const data = await response.json();

          const lastVehicle =
            data.selectedVehicle[data.selectedVehicle.length - 1];

          const marker = {
            vehicleNo: lastVehicle.vehicleNo,
            position: {
              lat: parseFloat(lastVehicle.Latitude),
              lng: parseFloat(lastVehicle.Longitude),
            },
          };
          markersArray.push(marker);
        } catch (error) {
          console.error("Error fetching vehicle data:", error);
        }
      }
      setMarkers(markersArray);
    };

    fetchCar();
  }, [vehicleNumbers]);

  const handleMarkerClick = async (marker: any) => {
    try {
      const vehicleNo = marker.vehicleNo;
      const apiUrl = `http://52.66.172.170:3000/api/v1/fetchsingleCar?vehicleNo=${vehicleNo}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      const selectedVehicle = data.vehicleData[data.vehicleData.length - 1];
      setSelectedMarker({
        details: {
          // imageUrl: selectedVehicle.image,
          model: selectedVehicle.model,
          year: selectedVehicle.year,
          vehicleNo: selectedVehicle.vehicleNo,
        },
      });
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  console.log("Image URL:", selectedMarker);

  // pins on map end

  return (
    <>
      <div className="dashboard-layout">
        <Layout />
        <div className="sidebar-container">
          <Sidebar isOpen={undefined} />
        </div>
        <div className="dashboard-content">
          <div className="underlineStyle">
            <Row className="dashboard-style" style={{ marginTop: "70px" }}>
              <Col sm={6} xs={12}>
                <h4>Dashboard</h4>
              </Col>
              <Col sm={6} xs={12}>
                <div className="search-container">
                  <input
                    type="text"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    placeholder="Type model or Vehicle ID"
                  />
                  <button onClick={handleSearch} className="search-button">
                    Search
                  </button>
                  {vehicleData && (
                    <div className="vehicle-data">
                      <p>Vehicle ID: {vehicleData.vid}</p>
                      <p>Status: {vehicleData.status}</p>
                      <p>Location: {vehicleData.location}</p>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div
            className="another-details underlineStyle"
            style={{ marginTop: "10px" }}
          >
            <Row>
              <Col sm={12} md={6}>
                <div className="pt-2">
                  <Button className="me-3 text-black border-0 btn-hover">
                    Daily
                  </Button>
                  <Button className="me-3 text-black border-0 btn-hover">
                    Weekly
                  </Button>
                  <Button className="me-3 text-black border-0 btn-hover">
                    Monthly
                  </Button>
                  <h6 className="float-end mbl-heading">
                    Usage in Total Work Hour
                  </h6>
                </div>
                <Line options={options} data={data} />
              </Col>
              <Col sm={6} xs={12} md={3}>
                <div className="pt-2 progress-container">
                  <h6>Fleet Performance</h6>
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
              </Col>
              <Col sm={6} xs={12} md={3}>
                <div className="pt-2 progress-container">
                  <h6>Vehicle and Fuel Usage</h6>
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
                    <div className="progress-value">{progressData.value2}%</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="divided-by-map">
            <Row>
              <Col sm={12}>
                <h6>MAP</h6>
                <div className="map-container">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={options}
                    center={
                      markers.length > 0
                        ? markers[0].position
                        : { lat: 0, lng: 0 }
                    }
                    onLoad={onMapLoad}
                    zoom={10}
                    onClick={() => setSelectedMarker(null)}
                  >
                    {markers.map((marker) => (
                      <MarkerF
                        key={marker.vehicleNo}
                        position={marker.position}
                        cursor="pointer"
                        onClick={() => handleMarkerClick(marker)}
                      >
                        {selectedMarker &&
                          selectedMarker.details.vehicleNo ===
                            marker.vehicleNo && (
                            <InfoWindowF
                              onCloseClick={() => setSelectedMarker(null)}
                              position={marker.position}
                            >
                              <div className="w-80 p-2">
                                <div className="flex items-center mb-2 space-x-5">
                                  {/* <Image
                                    src={selectedMarker.details.imageUrl}
                                    style={{
                                      width: "56px",
                                      height: "56px",
                                      borderRadius: "50%",
                                    }}
                                    alt=""
                                    width={56}
                                    height={56}
                                  /> */} 
                                  <div>
                                    <h4 className="text-xl-font-bold">
                                      vehicleNo :{" "}
                                      {selectedMarker.details.vehicleNo}
                                    </h4>
                                    <h4 className="text-xl-font-bold">
                                      {" "}
                                      Model : {selectedMarker.details.model}
                                    </h4>
                                    <h4 className="text-xl-font-bold">
                                      {" "}
                                      year : {selectedMarker.details.year}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </InfoWindowF>
                          )}
                      </MarkerF>
                    ))}
                  </GoogleMap>
                </div>
              </Col>
            </Row>
          </div>
          <div className="bottom-controls">
            <Button
              href="/addvehicle"
              className="me-3 text-black border-0 btn-hover"
            >
              Add Vehicle
            </Button>
            <Button
              href="/adddriver"
              className="me-3 text-black border-0 btn-hover"
            >
              Add Driver
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
