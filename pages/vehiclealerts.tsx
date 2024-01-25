import axios from "axios";

export async function getServerSideProps() {
  const apiUrl = "http://localhost:8000/api/v1/fetchGyro";

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: null },
    };
  }
}

function HomePage({ data }) {
  const overSpeedingThreshold = 80;
  const lowTemperatureThreshold = 10;
  const highTemperatureThreshold = 40;

  const isOverSpeeding = data.Speed > overSpeedingThreshold;

  const isLowTemperature = data.temperature < lowTemperatureThreshold;

  return (
    <div>
      {isOverSpeeding && <p>Over Speeding Alert!</p>}
      {isLowTemperature && <p>Low Temperature Alert!</p>}
    </div>
  );
}

export default HomePage;
