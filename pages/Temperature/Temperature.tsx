import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";

const Temperature = () => {
  const [gyroData, setGyroData] = useState([]);

  useEffect(() => {
    const fetchGyroData = async () => {
      try {
        const response = await fetch(
          "http://52.66.172.170:3000/api/v1/fetchGyro"
        );
        const result = await response.json();
        if (Array.isArray(result.data)) {
          const lastData = getLastData(result.data);
          setGyroData(lastData);
        }
      } catch (error) {
        console.error("Error fetching gyro data:", error);
      }
    };

    fetchGyroData();
  }, []);

  const getLastData = (data) => {
    const vehicleMap = {};

    data.forEach((entry) => {
      vehicleMap[entry.vehicleNo] = entry;
    });

    return Object.values(vehicleMap);
  };

  return (
    <div className="dashboard-layout">
      <Layout />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="dashboard-content" style={{ marginTop: "50px" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Temperature
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ padding: "8px", marginTop: "10px" }}
          >
            Last Temperature Summary (per Vehicle)
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="temperature summary table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "gray" }}>
                <TableCell>Vehicle No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Temperature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gyroData.length > 0 ? (
                gyroData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.vehicleNo}</TableCell>
                    <TableCell>{row.Date}</TableCell>
                    <TableCell>{row.Time}</TableCell>
                    <TableCell>{row.temperature}°C</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Temperature;
