import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";

import {
  GoogleMap,
  useLoadScript,
  Marker as MarkerF,
  InfoWindow as InfoWindowF,
} from "@react-google-maps/api";
import { Grid, TextField, Paper, Typography, Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface VehicleDetails {
  model: string;
  year: string;
  vehicleNo: string;
}

interface SelectedMarker {
  details: VehicleDetails;
}

interface VehicleData {
  vid: string;
  status: string;
  location: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [autoSuggestions, setAutoSuggestions] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [progressData, setProgressData] = useState({
    value1: 0,
    value2: 0,
  });
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const data = {
    labels: ["2024", "2023", "2022", "2021"],
    datasets: [
      {
        data: [727, 589, 537, 543],
        label: "Line 1",
        backgroundColor: "rgba(63,103,126,1)",
        hoverBackgroundColor: "rgba(50,90,100,1)",
      },
      {
        data: [238, 553, 746, 884],
        label: "Line 2",
        backgroundColor: "rgba(163,103,126,1)",
        hoverBackgroundColor: "rgba(140,85,100,1)",
      },
      {
        data: [1238, 553, 746, 884],
        label: "Line 3",
        backgroundColor: "rgba(63,203,226,1)",
        hoverBackgroundColor: "rgba(46,185,235,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          font: { size: 11, family: "'Open Sans Bold', sans-serif" },
        },
        grid: {},
      },
      y: {
        stacked: true,
        ticks: { font: { size: 11, family: "'Open Sans Bold', sans-serif" } },
        grid: { display: false },
      },
    },
  };

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "pie",
      height: 250,
      width: 250,
    },
    title: null,
    subtitle: null,
    tooltip: { valueSuffix: "%" },
    credits: { enabled: false },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          { enabled: true, distance: 20 },
          {
            enabled: true,
            distance: -30,
            format: "{point.percentage:.1f}%",
            style: { fontSize: "1em", textOutline: "none", opacity: 0.7 },
            filter: { operator: ">", property: "percentage", value: 10 },
          },
        ],
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [
          { name: "1", y: 55.02 },
          { name: "2", sliced: true, selected: true, y: 26.71 },
          { name: "3", y: 15.5 },
        ],
      },
    ],
  });

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

  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(
    null
  );
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

  const Mapoptions = useMemo<google.maps.MapOptions>(
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
        const response = await fetch(
          "http://52.66.172.170:3000/api/v1/fetchCar"
        );
        const data = await response.json();
        const dataArray: { vehicleNo: string }[] = [];

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
          <Sidebar isOpen={false} />
        </div>
        <div className="dashboard-content">
          <Box sx={{ borderBottom: 2, borderColor: "divider", mt: 9, pb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item sm={6} xs={12}>
                <Typography variant="h6">Dashboard</Typography>
              </Grid>
              <Grid sm={6} xs={12}>
                <div
                  style={{
                    padding: 2,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Type model or Vehicle ID"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    InputProps={{
                      sx: {
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  />
                  <Button
                    color="secondary"
                    onClick={handleSearch}
                    style={{
                      height: "40px",
                      minWidth: "120px",
                    }}
                  >
                    Search
                  </Button>
                </div>

                {vehicleData && (
                  <Paper elevation={1} sx={{ marginTop: 2, padding: 2 }}>
                    <Typography variant="body1">
                      Vehicle ID: {vehicleData.vid}
                    </Typography>
                    <Typography variant="body1">
                      Status: {vehicleData.status}
                    </Typography>
                    <Typography variant="body1">
                      Location: {vehicleData.location}
                    </Typography>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Box>

          <div className="divided-by-map">
            <Row>
              <Col sm={12}>
                {/* <h6>MAP</h6> */}
                <div className="map-container">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    // options={options}
                    options={Mapoptions}
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
          <div
            className="another-details underlineStyle"
            style={{ marginTop: "20px" }}
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

                <div
                  className="graph_container"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "16px",
                    padding: "16px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    marginTop: "10px",
                  }}
                >
                  <Bar data={data} options={options} />
                </div>
              </Col>
              <Col sm={6} xs={12} md={6}>
                <div className="pt-2 progress-container">
                  <h6>Fleet Performance</h6>
                  <div
                    className="highcharts-container"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "16px",
                      padding: "16px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                  </div>
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
