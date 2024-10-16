import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
} from "@mui/material";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const VehicleCard = ({ vehicle }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{vehicle.name}</Typography>
      <Typography>Vehicle No: {vehicle.vehicleNo}</Typography>
      <Typography>Model: {vehicle.model}</Typography>
      <Typography>Fuel:</Typography>
      <LinearProgress variant="determinate" value={vehicle.fuel} />
    </CardContent>
  </Card>
);

type geoFenceTypes = {
  lat: number;
  lng: number;
};

const Geofence = () => {
  const [geofencePath, setGeofencePath] = useState<geoFenceTypes[]>([
    { lat: 37.7749, lng: -122.4194 },
  ]);
  const [vehicles, setVehicles] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
  });

  const fetchVehicleData = async () => {
    try {
      const response = await fetch("http://52.66.172.170:3000/api/v1/fetchCar");
      const result = await response.json();
      if (result.data) {
        setVehicles(result.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const handleMapClick = useCallback((event: any) => {
    const lat1 = event.latLng.lat();
    const lng1 = event.latLng.lng();
    setGeofencePath((marker) => [
      ...marker,
      {
        lat: lat1,
        lng: lng1,
      },
    ]);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <Layout />
      <div className="sidebar-container">
        <Sidebar isOpen={undefined} />
      </div>
      <div className="dashboard-content" style={{ marginTop: "50px" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Geofence
          </Typography>
          <GoogleMap
            zoom={10}
            center={{ lat: 37.7749, lng: -122.4194 }}
            mapContainerStyle={mapContainerStyle}
            onClick={handleMapClick}
          >
            {geofencePath.length > 2 && (
              <Polygon
                paths={geofencePath}
                options={{
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
          <Typography variant="h6" gutterBottom marginTop={"10px"}>
            All Vehicles Show Out of Geofence
          </Typography>
          <Grid container spacing={2}>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <VehicleCard vehicle={vehicle} />
                </Grid>
              ))
            ) : (
              <Typography>No vehicles available</Typography>
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Geofence;
