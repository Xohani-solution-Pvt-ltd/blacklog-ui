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
  ListItemButton,
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

interface Car {
  id: string;
  vehicleNo: string;
  model: string;
  latitude: number;
  longitude: number;
  speed: number;
}

interface CarNameProps {
  car: Car;
  onSelectCar: (car: Car) => void;
}

interface VehicleData {
  Latitude?: number;
  Longitude?: number;
  Speed?: number;
}

interface SelectedCar {
  vehicleNo: string;
  model: string;
  latitude: number;
  longitude: number;
  speed: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

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
  const [carNames, setCarNames] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedCar | null>(
    null
  );
  const [selectedVehicleLocation, setSelectedVehicleLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const CarName: React.FC<CarNameProps> = ({ car, onSelectCar }) => (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onSelectCar(car)}
        sx={{ padding: "8px 12px" }}
      >
        <Typography fontWeight="bold">{car.vehicleNo}</Typography>
      </ListItemButton>
    </ListItem>
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
      .get("http://52.66.172.170:3000/api/v1/fetchCar")
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

  // const onSelectCar = async (selectedCar: SelectedCar) => {
  //   setSelectedVehicle(selectedCar);
  //   const vehicleNo = selectedCar.vehicleNo;

  //   try {
  //     const response = await fetch(
  //       `http://52.66.172.170:3000/api/v1/vehicleData?vehicleNo=${vehicleNo}`
  //     );

  //     const data = await response.json();
  //     const dataArray: {
  //       latitude: number;
  //       longitude: number;
  //       speed: number;
  //     }[] = [];

  //     if (data && Array.isArray(data.selectedVehicle)) {
  //       data.selectedVehicle.forEach((object: VehicleData) => {
  //         if (
  //           object.Latitude !== undefined &&
  //           object.Latitude !== 0 &&
  //           object.Longitude !== undefined &&
  //           object.Longitude !== 0 &&
  //           object.Speed !== undefined
  //         ) {
  //           if (
  //             String(object.Latitude).length > 7 &&
  //             String(object.Longitude).length > 7
  //           ) {
  //             const formattedData = {
  //               latitude: parseFloat(String(object.Latitude)),
  //               longitude: parseFloat(String(object.Longitude)),
  //               speed: object.Speed,
  //             };
  //             dataArray.push(formattedData);
  //           }
  //         }
  //       });
  //     }

  //     setFetchData(dataArray);

  //     if (dataArray.length > 0) {
  //       const lastLocation = dataArray[dataArray.length - 1];
  //       setSelectedVehicleLocation({
  //         lat: lastLocation.latitude,
  //         lng: lastLocation.longitude,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error Fetching Data", error);
  //   }
  // };

  const onSelectCar = async (selectedCar: Car) => {
    try {
      const response = await fetch(
        `http://52.66.172.170:3000/api/v1/vehicleData?vehicleNo=${selectedCar.vehicleNo}`
      );

      const data = await response.json();

      if (
        !data ||
        !data.selectedVehicle ||
        !Array.isArray(data.selectedVehicle)
      ) {
        console.error("Invalid API response format", data);
        return;
      }

      const dataArray: {
        latitude: number;
        longitude: number;
        speed: number;
      }[] = [];

      data.selectedVehicle.forEach((object: VehicleData) => {
        if (
          object.Latitude !== undefined &&
          object.Latitude !== 0 &&
          object.Longitude !== undefined &&
          object.Longitude !== 0 &&
          object.Speed !== undefined
        ) {
          const formattedData = {
            latitude: parseFloat(String(object.Latitude)),
            longitude: parseFloat(String(object.Longitude)),
            speed: object.Speed,
          };
          dataArray.push(formattedData);
        }
      });

      setFetchData(dataArray);

      if (dataArray.length > 0) {
        const lastLocation = dataArray[dataArray.length - 1];

        setSelectedVehicle({
          vehicleNo: selectedCar.vehicleNo,
          model: data.selectedVehicle[0].model || "Unknown Model",
          latitude: lastLocation.latitude,
          longitude: lastLocation.longitude,
          speed: lastLocation.speed,
        });

        setSelectedVehicleLocation({
          lat: lastLocation.latitude,
          lng: lastLocation.longitude,
        });
      }
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <Layout />
      <div className="sidebar-container">
        <Sidebar isOpen={false} />
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
              {/* <Typography variant="h6">Map Overview</Typography> */}
              <GoogleMap
                key={selectedVehicleLocation.lat + selectedVehicleLocation.lng}
                zoom={10}
                center={selectedVehicleLocation}
                options={{
                  mapTypeControl: false,
                  zoomControl: true,
                  streetViewControl: false,
                }}
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
                        lat: selectedVehicle?.latitude
                          ? parseFloat(selectedVehicle.latitude.toString())
                          : 0,
                        lng: selectedVehicle?.longitude
                          ? parseFloat(selectedVehicle.longitude.toString())
                          : 0,
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
              <Typography variant="h6" sx={{ mb: 2 }}>
                All Vehicles
              </Typography>

              <TextField
                variant="outlined"
                fullWidth
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
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                }}
              />

              <List
                sx={{
                  mt: 2,
                  p: 0,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                {loading && <Typography>Loading...</Typography>}
                {error && (
                  <Typography color="error">Error: {error.message}</Typography>
                )}

                {carNames.length > 0 ? (
                  carNames.map((car) => (
                    // <CarName key={car.id} car={car} onSelectCar={onSelectCar} />
                    <CarName
                      key={car.id}
                      car={car}
                      onSelectCar={(car) =>
                        onSelectCar({
                          ...car,
                          model: "",
                          latitude: 0,
                          longitude: 0,
                          speed: 0,
                        })
                      }
                    />
                  ))
                ) : (
                  <Typography sx={{ p: 2 }}>No cars available</Typography>
                )}
              </List>
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
