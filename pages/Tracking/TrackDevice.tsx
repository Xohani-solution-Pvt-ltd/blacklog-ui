import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const car = [
  {
    name: "Hyundai Creta",
    carNo: "MP09ZD2225",
    carType: "Hatchback",
    fuel: 70,
  },
  {
    name: "Hyundai i20",
    carNo: "MP09ZD2225",
    carType: "Flatbed Truck",
    fuel: 35,
  },
  {
    name: "Skoda Kushaq",
    carNo: "MP09ZD2225",
    carType: "Hatchback",
    fuel: 70,
  },
];

const drivers = [
  { name: "Jone Doe", carNo: "MP09ZD2225", avatar: "/path/to/avatar1.jpg" },
  { name: "Jone Doe", carNo: "MP09ZD2225", avatar: "/path/to/avatar2.jpg" },
  { name: "Jone Doe", carNo: "MP09ZD2225", avatar: "/path/to/avatar3.jpg" },
  { name: "Jone Doe", carNo: "MP09ZD2225", avatar: "/path/to/avatar4.jpg" },
];

const TrackDevice = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
  });

  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [FetchData, setFetchData] = useState<any>([]);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ["geometry"], []);
  const [carNames, setCarNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleLocation, setSelectedVehicleLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const CarName = ({ car }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* <Typography variant="h6">{vehicle.name}</Typography> */}
        <Typography onClick={() => onSelectCar(car)}>
          Car No: {car.vehicleNo}
        </Typography>
        {/* <Typography>Car Type: {vehicle.carType}</Typography> */}
        {/* <Typography>Fuel:</Typography> */}
        {/* <LinearProgress variant="determinate" value={vehicle.fuel} /> */}
      </CardContent>
    </Card>
  );

  function MarkerClicked() {
    setIsInfoWindowOpen(true);
  }
  const containerStyle = {
    width: "100%",
    height: "90vh",
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

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://43.205.99.213:3000/api/v1/fetchCar")
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

  const onSelectCar = async (selectedCar) => {
    setSelectedVehicle(selectedCar);
    const vehicleNo = selectedCar.vehicleNo;
    try {
      const response = await fetch(
        `http://43.205.99.213:3000/api/v1/vehicleData?vehicleNo=${vehicleNo}`
      );

      const data = await response.json();
      const dataArray: {
        latitude: number;
        longitude: any;
      }[] = [];

      if (data && Array.isArray(data.selectedVehicle)) {
        data.selectedVehicle.forEach((object) => {
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

      if (dataArray.length > 0) {
        setSelectedVehicleLocation({
          lat: dataArray[0].latitude,
          lng: dataArray[0].longitude,
        });
      }
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  // useEffect(() => {
  //   const initMap = async () => {
  //     try {
  //       if (FetchData.length > 0) {
  //         const snappedRoadPath = await Promise.all(
  //           FetchData.map(
  //             async (point: {
  //               latitude: string;
  //               longitude: string;
  //               speed: any;
  //             }) => ({
  //               lat: parseFloat(point.latitude),
  //               lng: parseFloat(point.longitude),
  //               speed: point.speed,
  //             })
  //           )
  //         );

  //         const speedData = snappedRoadPath.map((point) => point.speed);

  //         const routeColor = await determineRouteColor(speedData);

  //         let currentColor = routeColor[0];
  //         let currentSegment = [snappedRoadPath[0]];

  //         for (let i = 1; i < snappedRoadPath.length; i++) {
  //           const color = routeColor[i];

  //           if (color === currentColor) {
  //             currentSegment.push(snappedRoadPath[i]);
  //           } else {
  //             if (i > 1 && routeColor[i - 1] !== color) {
  //               const route = new google.maps.Polyline({
  //                 path: currentSegment,
  //                 geodesic: true,
  //                 strokeColor: currentColor,
  //                 strokeOpacity: 1.0,
  //                 strokeWeight: 2.5,
  //                 map: googleMap,
  //               });

  //               const infoWindow = new google.maps.InfoWindow();
  //               google.maps.event.addListener(
  //                 route,
  //                 "mouseover",
  //                 async (event: any) => {
  //                   const hoveredIndex = findHoveredIndex(
  //                     event,
  //                     route.getPath().getArray()
  //                   );
  //                   const hoveredPoint = FetchData[hoveredIndex];

  //                   const content = `<div style="background-color: #004d4d ;padding:2px; ">
  //                                   <div style="color : #ffffff">Speed: ${hoveredPoint.speed}</div>
  //                                   <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
  //                                   <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
  //                                   <div style="color : #ffffff"> Distance :</div>
  //                                  </div>
  //                                     `;

  //                   infoWindow.setContent(content);
  //                   infoWindow.setPosition(event.latLng);
  //                   infoWindow.open(googleMap);
  //                 }
  //               );

  //               google.maps.event.addListener(
  //                 route,
  //                 "mouseout",
  //                 (event: any) => {
  //                   infoWindow.close();
  //                 }
  //               );

  //               currentSegment = [snappedRoadPath[i - 1], snappedRoadPath[i]];
  //             } else {
  //               currentSegment.push(snappedRoadPath[i]);
  //             }

  //             currentColor = color;
  //           }
  //         }

  //         const route = new google.maps.Polyline({
  //           path: currentSegment,
  //           geodesic: true,
  //           strokeColor: currentColor,
  //           strokeOpacity: 1.0,
  //           strokeWeight: 2.5,
  //           map: googleMap,
  //         });

  //         const infoWindow = new google.maps.InfoWindow();

  //         google.maps.event.addListener(
  //           route,
  //           "mouseover",
  //           async (event: any) => {
  //             const hoveredIndex = findHoveredIndex(
  //               event,
  //               route.getPath().getArray()
  //             );
  //             const hoveredPoint = FetchData[hoveredIndex];
  //             const content = `<div style="background-color: #004d4d ;padding:2px; ">
  //                           <div style="color : #ffffff">Speed: ${hoveredPoint.speed}</div>
  //                           <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
  //                           <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
  //                           <div style="color : #ffffff"> Distance :</div>
  //                          </div>
  //                             `;
  //             infoWindow.setContent(content);
  //             infoWindow.setPosition(event.latLng);
  //             infoWindow.open(googleMap);
  //           }
  //         );

  //         google.maps.event.addListener(route, "mouseout", () => {
  //           infoWindow.close();
  //         });
  //       }
  //       setMapInitialized(true);
  //     } catch (error) {
  //       console.error("Error Initializing Map", error);
  //     }
  //   };
  //   if (FetchData.length > 0 && !mapInitialized) {
  //     initMap();
  //   }
  // }, [FetchData, googleMap, mapInitialized]);

  // const findHoveredIndex = (event: any, path: any[]) => {
  //   const latLng = event.latLng;
  //   let closestIndex = 0;
  //   let closestDistance = Number.MAX_VALUE;

  //   for (let i = 0; i < path.length; i++) {
  //     const distance = google.maps.geometry.spherical.computeDistanceBetween(
  //       latLng,
  //       path[i]
  //     );
  //     if (distance < closestDistance) {
  //       closestDistance = distance;
  //       closestIndex = i;
  //     }
  //   }
  //   return closestIndex;
  // };

  // const determineRouteColor = async (speedData: string | any[]) => {
  //   const colors = [];
  //   for (let i = 0; i < speedData.length - 1; i++) {
  //     const currentSpeed = speedData[i];
  //     const nextSpeed = speedData[i + 1];
  //     const color = currentSpeed > 40 ? "#ff0000" : "#6a5acd";

  //     if (currentSpeed !== nextSpeed) {
  //       colors.push(color);
  //     } else {
  //       colors.push(color);
  //     }
  //   }

  //   colors.push(speedData[speedData.length - 1] > 50 ? "#ff0000" : "#6a5acd");

  //   return colors;
  // };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <Layout />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="dashboard-content" style={{ marginTop: "50px" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Track Device
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{ width: { xs: "100%", md: "70%" }, mb: { xs: 2, md: 0 } }}
            >
              <Typography variant="h6">Map Overview</Typography>
              <GoogleMap
                zoom={10}
                center={center}
                options={options}
                onLoad={onMapLoad}
                mapContainerStyle={mapContainerStyle}
                onClick={() => setIsInfoWindowOpen(false)}
              >
                <MarkerF
                  position={{
                    lat: selectedVehicleLocation.lat,
                    lng: selectedVehicleLocation.lng,
                  }}
                  cursor="pointer"
                  onClick={MarkerClicked}
                >
                  {isInfoWindowOpen && selectedVehicle && (
                    <InfoWindowF
                      onCloseClick={() => setIsInfoWindowOpen(false)}
                      position={{
                        lat: parseFloat(selectedVehicle.latitude),
                        lng: parseFloat(selectedVehicle.longitude),
                      }}
                    >
                      <div className="w-80 p-2">
                        <div className="flex items-center mb-2 space-x-5">
                          <h3 className="text-xl font-bold">
                            {selectedVehicle.vehicleNo}
                          </h3>
                          <p>{selectedVehicle.model}</p>
                        </div>

                        <p>Speed: {selectedVehicle.speed}</p>
                      </div>
                    </InfoWindowF>
                  )}
                </MarkerF>
              </GoogleMap>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "25%" } }}>
              <Typography variant="h6">All Vehicles</Typography>
              <TextField
                variant="outlined"
                sx={{ mt: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
                placeholder="Type Model or vehicle ID"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {carNames.length > 0 ? (
                  <>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                      }}
                    >
                      {carNames.map((car) => (
                        <CarName
                          key={car.id}
                          car={car}
                          onSelectCar={undefined}
                        />
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>No cars available</p>
                )}
              </Grid>
            </Box>
          </Box>
          <div
            className="another-deatils underlineStyle"
            style={{ marginTop: "10px" }}
          ></div>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="h6">Drivers</Typography>
            <TextField
              variant="outlined"
              placeholder="Search Drivers"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <List>
              {drivers.map((driver, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={driver.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={driver.name}
                    secondary={driver.carNo}
                  />
                  <IconButton edge="end" aria-label="chat">
                    <WhatsAppIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default TrackDevice;
