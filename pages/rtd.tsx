import { Table, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

interface GyroData {
  GPSfix: string;
  Date: string;
  Time: string;
  Latitude: number;
  LatitudeDirection: string;
  Longitude: number;
  LongitudeDirection: string;
  Speed: number;
  Heading: number;
  NoOfSatellites: number;
  Altitude: number;
  PDOP: number;
  HDOP: number;
  NetworkOperatorName: string;
  Ignition: string;
  MainPowerStatus: string;
  MainInputVoltage: number;
  EmergencyStatus: string;
  GSMSignalStrength: number;
  MCC: string;
  MNC: string;
  LAC: string;
  CellId: string;
  NMR: string;
  DigitalInputStatus: string;
  acceloX: number;
  acceloY: number;
  acceloZ: number;
  gyroX: number;
  gyroY: number;
  gyroZ: number;
  temperature: number;
}

export default function Rtd() {
  const [fetchdata, setFetchData] = useState<GyroData[]>([]);

  useEffect(() => {
    fetch("http://52.66.172.170:3000/api/v1/fetchGyro")
      .then((response) => response.json())
      .then((data) => setFetchData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Container fluid style={{ overflow: "auto" }}>
        <Row>
          <h1 className="text-center">Real Time Data</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>GPSfix</th>
                <th>Date</th>
                <th>Time</th>
                <th>Latitude</th>
                <th>Latitude Direction</th>
                <th>Longitude</th>
                <th>Longitude Direction</th>
                <th>Speed</th>
                <th>Heading</th>
                <th>No of Satellites</th>
                <th>Altitude</th>
                <th>PDOP</th>
                <th>HDOP</th>
                <th>Network Operator Name</th>
                <th>Ignition</th>
                <th>Main Power Status</th>
                <th>Main Input Voltage</th>
                <th>Emergency Status</th>
                <th>GSM Signal Strength</th>
                <th>MCC</th>
                <th>MNC</th>
                <th>LAC</th>
                <th>Cell ID</th>
                <th>NMR</th>
                <th>Digital Input Status</th>
                <th>acceloX</th>
                <th>acceloY</th>
                <th>acceloZ</th>
                <th>gyroX</th>
                <th>gyroY</th>
                <th>gyroZ</th>
                <th>temperature</th>
              </tr>
            </thead>

            <tbody>
              {fetchdata.map((data, index) => (
                <tr key={index}>
                  <td>{data.GPSfix}</td>
                  <td>{data.Date}</td>
                  <td>{data.Time}</td>
                  <td>{data.Latitude}</td>
                  <td>{data.LatitudeDirection}</td>
                  <td>{data.Longitude}</td>
                  <td>{data.LongitudeDirection}</td>
                  <td>{data.Speed}</td>
                  <td>{data.Heading}</td>
                  <td>{data.NoOfSatellites}</td>
                  <td>{data.Altitude}</td>
                  <td>{data.PDOP}</td>
                  <td>{data.HDOP}</td>
                  <td>{data.NetworkOperatorName}</td>
                  <td>{data.Ignition}</td>
                  <td>{data.MainPowerStatus}</td>
                  <td>{data.MainInputVoltage}</td>
                  <td>{data.EmergencyStatus}</td>
                  <td>{data.GSMSignalStrength}</td>
                  <td>{data.MCC}</td>
                  <td>{data.MNC}</td>
                  <td>{data.LAC}</td>
                  <td>{data.CellId}</td>
                  <td>{data.NMR}</td>
                  <td>{data.DigitalInputStatus}</td>
                  <td>{data.acceloX}</td>
                  <td>{data.acceloY}</td>
                  <td>{data.acceloZ}</td>
                  <td>{data.gyroX}</td>
                  <td>{data.gyroY}</td>
                  <td>{data.gyroZ}</td>
                  <td>{data.temperature}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}
