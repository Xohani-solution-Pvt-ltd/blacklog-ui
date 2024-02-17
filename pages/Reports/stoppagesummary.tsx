import Tracklayout from "@/components/Tracklayout";
import { useState, useEffect } from "react";

const VehicleStoppageSummary = () => {
  const [stoppageData, setStoppageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoppageData = async () => {
      try {
        const response = await fetch("/api/vehicleStoppage");
        const data = await response.json();
        setStoppageData(data);
      } catch (error) {
        console.error("Error fetching stoppage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoppageData();
  }, []);

  return (
    <>
      <Tracklayout />
      <div style={{ marginTop: "80px" }}>
        <h1>Vehicle Stoppage Summary</h1>
        {loading ? (
          <p>Loading stoppage data...</p>
        ) : (
          <ul>
            {stoppageData.map((stoppage, index) => (
              <li key={index}>
                <p>Start Time: {stoppage.startTime}</p>
                <p>End Time: {stoppage.endTime}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default VehicleStoppageSummary;
