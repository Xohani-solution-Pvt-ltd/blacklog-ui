import { useState, useEffect } from "react";

const IdleSummary = () => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch("/api/vehicle-data");
        const data = await response.json();
        setVehicleData(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  const calculateIdleTime = () => {
    return vehicleData.filter(
      (vehicle) => vehicle.speed === 0 && vehicle.status === "on"
    ).length;
  };

  return (
    <div>
      <h1>Vehicle Idle Summary</h1>
      <p>Total Idle Time: {calculateIdleTime()} minutes</p>
    </div>
  );
};

export default IdleSummary;
