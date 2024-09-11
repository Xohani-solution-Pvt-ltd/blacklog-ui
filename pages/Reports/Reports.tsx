import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import {
  GoogleMap,
  useLoadScript,
  Marker as MarkerF,
  InfoWindow as InfoWindowF,
} from "@react-google-maps/api";
import axios from "axios";
import Image from "next/image";

export default function ReportContent() {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [FetchData, setFetchData] = useState<any>([]);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ["geometry"], []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carNames, setCarNames] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState<string>("");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("");
  const [startDateInput, setStartDateInput] = useState<string>("");
  const [endDateInput, setEndDateInput] = useState<string>("");
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [visibleMap, setVisibleMap] = useState<string | null>(null);

  const handleStartDateChange = (e: any) => {
    setStartDateInput(e.target.value);
    setSelectedStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDateInput(e.target.value);
    setSelectedEndDate(e.target.value);
  };

  const CarName = ({ car, onSelectCar }) => (
    <li className="carItem" onClick={() => onSelectCar(car)}>
      <p className="carItem">{car.vehicleNo}</p>
    </li>
  );

  function MarkerClicked() {
    setIsInfoWindowOpen(true);
  }

  const handleCarSelection = (selectedCar) => {
    if (visibleMap === selectedCar.vehicleNo) {
      setVisibleMap(null);
    } else {
      setVisibleMap(selectedCar.vehicleNo);
      setVehicleNumber(selectedCar.vehicleNo);
      setSelectedVehicle(selectedCar);

      polylines.forEach((polyline) => {
        polyline.setMap(null);
      });

      setPolylines([]);
    }
  };

  useEffect(() => {
    setIsInfoWindowOpen(false);
  }, [selectedVehicle]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/fetchCar")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setCarNames(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching car list:", error);
      });
  }, []);

  const containerStyle = {
    width: "100%",
    height: "60vh",
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

  const center = useMemo(
    () => ({
      lat: FetchData.length > 0 ? parseFloat(FetchData[0].latitude) : 0,
      lng: FetchData.length > 0 ? parseFloat(FetchData[0].longitude) : 0,
    }),
    [FetchData]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  const drawRouteOnMap = async (data) => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(null);
      });
      setPolylines([]);

      if (data.length > 0) {
        const snappedRoadPath = await Promise.all(
          data.map(async (point) => ({
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
            speed: point.speed,
          }))
        );

        const speedData = snappedRoadPath.map((point) => point.speed);
        const routeColor = await determineRouteColor(speedData);
        let currentColor = routeColor[0];
        let currentSegment = [snappedRoadPath[0]];

        for (let i = 1; i < snappedRoadPath.length; i++) {
          const color = routeColor[i];
          if (color === currentColor) {
            currentSegment.push(snappedRoadPath[i]);
          } else {
            if (i > 1 && routeColor[i - 1] !== color) {
              const route = new google.maps.Polyline({
                path: currentSegment,
                geodesic: true,
                strokeColor: currentColor,
                strokeOpacity: 1.0,
                strokeWeight: 2.5,
                map: googleMap,
              });

              const infoWindow = new google.maps.InfoWindow();
              google.maps.event.addListener(
                route,
                "mouseover",
                async (event: any) => {
                  const hoveredIndex = findHoveredIndex(
                    event,
                    route.getPath().getArray()
                  );
                  const hoveredPoint = FetchData[hoveredIndex];

                  const content = `<div style="background-color: #004d4d ;padding:2px; ">
                                  <div style="color : #ffffff"> Speed :${hoveredPoint.speed}</div>
                                  <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
                                  <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
                                  <div style="color : #ffffff"> Distance :</div>
                                 </div>
                                    `;

                  infoWindow.setContent(content);
                  infoWindow.setPosition(event.latLng);
                  infoWindow.open(googleMap);
                }
              );

              google.maps.event.addListener(route, "mouseout", (event: any) => {
                infoWindow.close();
              });

              setPolylines((prevPolylines) => [...prevPolylines, route]);

              currentSegment = [snappedRoadPath[i - 1], snappedRoadPath[i]];
            } else {
              currentSegment.push(snappedRoadPath[i]);
            }
            currentColor = color;
          }
        }

        const route = new google.maps.Polyline({
          path: currentSegment,
          geodesic: true,
          strokeColor: currentColor,
          strokeOpacity: 1.0,
          strokeWeight: 2.5,
          map: googleMap,
        });

        const infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(
          route,
          "mouseover",
          async (event: any) => {
            const hoveredIndex = findHoveredIndex(
              event,
              route.getPath().getArray()
            );
            const hoveredPoint = FetchData[hoveredIndex];
            const content = `<div style="background-color: #004d4d ;padding:2px; ">
                              <div style="color : #ffffff"> Speed :${hoveredPoint.speed}</div>
                              <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
                              <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
                              <div style="color : #ffffff"> Distance :</div>
                             </div>
                                `;
            infoWindow.setContent(content);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(googleMap);
          }
        );

        google.maps.event.addListener(route, "mouseout", () => {
          infoWindow.close();
        });

        setPolylines((prevPolylines) => [...prevPolylines, route]);

        setMapInitialized(true);
      } else {
        setMapInitialized(true);
      }
    } catch (error) {
      console.error("Error Initializing Map", error);
    }
  };

  useEffect(() => {
    console.log("Selected Start Date:", selectedStartDate);
    console.log("Selected End Date:", selectedEndDate);

    const fetchData = async () => {
      if (
        !selectedVehicle ||
        !selectedStartDate ||
        !selectedEndDate ||
        !isLoaded ||
        !googleMap
      ) {
        return;
      }

      const apiUrl = `http://localhost:8000/api/v1/fetchvehicleGyroData?vehicleNo=${selectedVehicle.vehicleNo}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(
            `HTTP error! Status: ${response.status}, URL: ${response.url}`
          );
          return;
        }
        const data = await response.json();
        const dataArray = [];

        if (data && Array.isArray(data.fetchdata)) {
          data.fetchdata.forEach((object) => {
            if (
              object.Latitude !== undefined &&
              object.Latitude !== 0 &&
              object.Longitude !== undefined &&
              object.Longitude !== 0 &&
              object.Speed !== undefined
            ) {
              if (
                String(object.Latitude).length > 7 &&
                String(object.Longitude).length > 7
              ) {
                const formattedData = {
                  latitude: parseFloat(object.Latitude),
                  longitude: parseFloat(object.Longitude),
                  speed: object.Speed,
                };
                dataArray.push(formattedData);
              }
            }
          });
        }
        setFetchData(dataArray);
        drawRouteOnMap(dataArray);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    fetchData();
  }, [
    selectedVehicle,
    selectedStartDate,
    selectedEndDate,
    isLoaded,
    googleMap,
    vehicleNumber,
  ]);

  useEffect(() => {
    const initMap = async () => {
      try {
        polylines.forEach((polyline) => {
          polyline.setMap(null);
        });

        setPolylines([]);
        if (FetchData.length > 0) {
          const snappedRoadPath = await Promise.all(
            FetchData.map(async (point) => ({
              lat: parseFloat(point.latitude),
              lng: parseFloat(point.longitude),
              speed: point.speed,
            }))
          );

          const speedData = snappedRoadPath.map((point) => point.speed);
          const routeColor = await determineRouteColor(speedData);
          let currentColor = routeColor[0];
          let currentSegment = [snappedRoadPath[0]];

          for (let i = 1; i < snappedRoadPath.length; i++) {
            const color = routeColor[i];
            if (color === currentColor) {
              currentSegment.push(snappedRoadPath[i]);
            } else {
              if (i > 1 && routeColor[i - 1] !== color) {
                const route = new google.maps.Polyline({
                  path: currentSegment,
                  geodesic: true,
                  strokeColor: currentColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 2.5,
                  map: googleMap,
                });

                const infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(
                  route,
                  "mouseover",
                  async (event: any) => {
                    const hoveredIndex = findHoveredIndex(
                      event,
                      route.getPath().getArray()
                    );
                    const hoveredPoint = FetchData[hoveredIndex];

                    const content = `<div style="background-color: #004d4d ;padding:2px;">
                                    <div style="color : #ffffff">Speed :${hoveredPoint.speed}</div>
                                    <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
                                    <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
                                    <div style="color : #ffffff"> Distance :</div>
                                   </div>
                                      `;

                    infoWindow.setContent(content);
                    infoWindow.setPosition(event.latLng);
                    infoWindow.open(googleMap);
                  }
                );

                google.maps.event.addListener(
                  route,
                  "mouseout",
                  (event: any) => {
                    infoWindow.close();
                  }
                );
                setPolylines((prevPolylines) => [...prevPolylines, route]);

                currentSegment = [snappedRoadPath[i - 1], snappedRoadPath[i]];
              } else {
                currentSegment.push(snappedRoadPath[i]);
              }
              currentColor = color;
            }
          }
          const route = new google.maps.Polyline({
            path: currentSegment,
            geodesic: true,
            strokeColor: currentColor,
            strokeOpacity: 1.0,
            strokeWeight: 2.5,
            map: googleMap,
          });

          const infoWindow = new google.maps.InfoWindow();

          google.maps.event.addListener(
            route,
            "mouseover",
            async (event: any) => {
              const hoveredIndex = findHoveredIndex(
                event,
                route.getPath().getArray()
              );
              const hoveredPoint = FetchData[hoveredIndex];
              const content = `<div style="background-color: #004d4d ;padding:2px; ">
                            <div style="color : #ffffff">Speed :${hoveredPoint.speed}</div>
                            <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
                            <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
                            <div style="color : #ffffff"> Distance :</div>
                           </div>
                              `;
              infoWindow.setContent(content);
              infoWindow.setPosition(event.latLng);
              infoWindow.open(googleMap);
            }
          );

          google.maps.event.addListener(route, "mouseout", () => {
            infoWindow.close();
          });
          setPolylines((prevPolylines) => [...prevPolylines, route]);
          setMapInitialized(true);
        } else {
          setMapInitialized(true);
        }
      } catch (error) {
        console.error("Error Initializing Map", error);
      }
    };
    if (FetchData.length > 0 && !mapInitialized && googleMap) {
      initMap();
      setMapInitialized(true);
    }
  }, [FetchData, googleMap, mapInitialized]);

  const findHoveredIndex = (event: any, path: any[]) => {
    const latLng = event.latLng;
    let closestIndex = 0;
    let closestDistance = Number.MAX_VALUE;

    for (let i = 0; i < path.length; i++) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        latLng,
        path[i]
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const determineRouteColor = async (speedData) => {
    const colors = [];
    for (let i = 0; i < speedData.length - 1; i++) {
      const currentSpeed = speedData[i];
      const nextSpeed = speedData[i + 1];

      const color = currentSpeed > 40 ? "#ff0000" : "#6a5acd";

      if (currentSpeed !== nextSpeed) {
        colors.push(color);
      } else {
        colors.push(color);
      }
    }

    colors.push(speedData[speedData.length - 1] > 50 ? "#ff0000" : "#6a5acd");
    return colors;
  };

  const SummaryTable = ({ data }) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Vehicle No</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Start Time</TableCell>
          <TableCell>End Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.vehicleNo}</TableCell>
            <TableCell>{item.startDateInput}</TableCell>
            <TableCell>{item.endDateInput}</TableCell>
            <TableCell>{item.startTime}</TableCell>
            <TableCell>{item.endTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <div className="dashboard-layout">
      <Layout />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="dashboard-content" style={{ marginTop: "65px" }}>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                placeholder="Type Model or Vehicle ID"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                placeholder="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDateInput}
                onChange={handleStartDateChange}
                fullWidth
                InputProps={{
                  endAdornment: <IconButton></IconButton>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                placeholder="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDateInput}
                onChange={handleEndDateChange}
                fullWidth
                InputProps={{
                  endAdornment: <IconButton></IconButton>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={2} container justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            {carNames.map((car) => (
              <Grid item xs={12} key={car.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding={2}
                  borderRadius={1}
                  border="1px solid #e0e0e0"
                  bgcolor="#fff"
                  flexDirection={{ xs: "column", md: "column" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    flexDirection={{ xs: "column", md: "row" }}
                  >
                    <Typography variant="body1">
                      <strong>Jone Doe</strong>
                      <br />

                      <CarName car={car} onSelectCar={handleCarSelection} />
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ justifyContent: "center" }}
                    >
                      Click Vehicle Number to see details
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="body2"
                        style={{ color: "green", marginRight: 16 }}
                      >
                        Vehicle status - Running
                      </Typography>
                      <Button variant="outlined" color="primary">
                        Edit
                      </Button>
                    </Box>
                  </Box>

                  {visibleMap === car.vehicleNo && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Box width={{ xs: "100%", md: "50%" }} mt={2}>
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          options={options}
                          center={center}
                          onLoad={onMapLoad}
                          zoom={15}
                          onClick={() => setIsInfoWindowOpen(false)}
                        >
                          <MarkerF
                            position={center}
                            cursor="pointer"
                            onClick={MarkerClicked}
                          >
                            {isInfoWindowOpen && (
                              <InfoWindowF
                                onCloseClick={() => setIsInfoWindowOpen(false)}
                                position={center}
                              >
                                <div className="w-80 p-2">
                                  <div className="flex items-center mb-2 space-x-5">
                                    <Image
                                      src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                      style={{
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "50%",
                                      }}
                                      alt=""
                                    />
                                    <div>
                                      <h3 className="text-xl font-bold">
                                        some title
                                      </h3>
                                      <p>some subtitle</p>
                                    </div>
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate, dolor nisi
                                    accusantium quia tenetur voluptatum.
                                  </p>
                                </div>
                              </InfoWindowF>
                            )}
                          </MarkerF>
                          <></>
                        </GoogleMap>
                        <Button
                          onClick={() => setVisibleMap(null)}
                          style={{ marginTop: "10px" }}
                        >
                          Close Map
                        </Button>
                      </Box>

                      {/* Summary Table */}
                      <Box
                        width={{ xs: "100%", md: "50%" }}
                        pl={{ xs: 0, md: 2 }}
                      >
                        {/* <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Device ID</TableCell>
                              <TableCell>Start Date</TableCell>
                              <TableCell>End Date</TableCell>
                              <TableCell>Start Time</TableCell>
                              <TableCell>End Time</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(data) && data.length > 0 ? (
                              data.map((row) => (
                                <TableRow key={row.id}>
                                  <TableCell>{row.deviceId}</TableCell>
                                  <TableCell>{row.startDate}</TableCell>
                                  <TableCell>{row.endDate}</TableCell>
                                  <TableCell>{row.startTime}</TableCell>
                                  <TableCell>{row.endTime}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={8}>
                                  No data available
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table> */}
                        <Grid item xs={12}>
                          {FetchData && FetchData.length > 0 && (
                            <SummaryTable data={FetchData} />
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
