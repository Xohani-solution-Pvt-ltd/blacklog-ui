import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const VehicleTracker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [vehicleLocation, setVehicleLocation] = useState(null);

  const handleDateChange = (e:any) => {
    setSelectedDate(e.target.value);
  };

  const handleVehicleChange = (e:any) => {
    setSelectedVehicle(e.target.value);
  };

  const handleSearch = () => {
    // Assume you have an API to fetch the vehicle location based on selectedDate and selectedVehicle
    // Replace this with your actual API call
    const vehicleLocationData = fetchVehicleLocation(
      selectedDate,
      selectedVehicle
    );

    // Update the vehicle location state
    setVehicleLocation(vehicleLocationData);
  };

  const fetchVehicleLocation = (date, vehicle) => {
    // Replace this with your actual API call to fetch the vehicle location
    // You may need to use the selectedDate and selectedVehicle in the API call
    // Example: fetch(`/api/vehicle-location?date=${date}&vehicle=${vehicle}`)
    // Ensure the API returns the location data in the required format (lat, lng)
    return { lat: 37.7749, lng: -122.4194 }; // Example location (San Francisco)
  };

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
  }; // Default center (San Francisco)

  return (
    <div>
      <h1>Vehicle Tracker</h1>
      <div>
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor="vehicle">Select Vehicle:</label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={handleVehicleChange}
        >
          <option value="vehicle1">Vehicle 1</option>
          <option value="vehicle2">Vehicle 2</option>
        </select>
      </div>
      <button onClick={handleSearch}>Search</button>

      {vehicleLocation && (
        <LoadScript googleMapsApiKey="AIzaSyDNvJ_KbW9RWkxNrwMBv3s4fUzhEygb0KU">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={vehicleLocation}
          >
            <Marker position={vehicleLocation} />
            {/* You can customize the Polyline options as needed */}
            <Polyline
              path={[defaultCenter, vehicleLocation]}
              options={{ strokeColor: "#FF0000" }}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default VehicleTracker;
