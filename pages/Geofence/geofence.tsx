import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
import Layout from "@/components/Layout";


const Geofence = () => {
  const [geofencePath, setGeofencePath] = useState([
    { lat: 37.7749, lng: -122.4194 },
  ]);

  const handleMapClick = (event: any) => {
    const lat1 = event.latLng.lat();
    const lng1 = event.latLng.lng();
    setGeofencePath((marker) => [
      ...marker,
      {
        lat: lat1,
        lng: lng1,
      },
    ]);
  };
  console.log("geofencePath", geofencePath);
  return (
    <>
    <Layout />
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
    >
      <GoogleMap
        zoom={10}
        center={{ lat: 37.7749, lng: -122.4194 }}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
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
    </LoadScript></>
  );
};

export default Geofence;
