import { useState, useEffect } from "react";

const InactiveSummary = () => {
  const [inactiveData, setInactiveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/inactive-summary");
        const data = await response.json();
        setInactiveData(data);
      } catch (error) {
        console.error("Error fetching inactive summary:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Vehicle Inactive Summary</h1>
      <ul>
        {inactiveData.map((item) => (
          <li key={item.vehicleId}>
            Vehicle {item.vehicleId} was off {item.offCount} times.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InactiveSummary;
