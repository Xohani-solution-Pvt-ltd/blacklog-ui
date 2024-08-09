import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";

const temperatureData = [
  {
    deviceId: "MP09ZD1111",
    driver: "Brayden Doe",
    date: "06-07-2024",
    time: "08:10:00 AM",
    location: "Indore NH 16 123 Main st",
    avgTemp: 25,
    minTemp: 21,
    maxTemp: 35,
  },
  {
    deviceId: "MP09ZD2222",
    driver: "Brayden Doe",
    date: "06-07-2024",
    time: "08:10:00 AM",
    location: "Indore NH 16 123 Main st",
    avgTemp: 25,
    minTemp: 21,
    maxTemp: 35,
  },
  {
    deviceId: "MP09ZD3333",
    driver: "Brayden Doe",
    date: "06-07-2024",
    time: "08:10:00 AM",
    location: "Indore NH 16 123 Main st",
    avgTemp: 25,
    minTemp: 21,
    maxTemp: 35,
  },
  {
    deviceId: "MP09ZD4444",
    driver: "Brayden Doe",
    date: "06-07-2024",
    time: "08:10:00 AM",
    location: "Indore NH 16 123 Main st",
    avgTemp: 25,
    minTemp: 21,
    maxTemp: 35,
  },
];

const Temperature = () => {
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
          <div
            className="another-deatils underlineStyle"
            style={{ marginTop: "10px" }}
          ></div>
        </Box>
        <TableContainer component={Paper}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ padding: "8px", marginTop: "10px" }}
          >
            Temperature Summary
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="temperature summary table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "gray" }}>
                <TableCell>Device ID</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Avg Temp</TableCell>
                <TableCell align="right">Min Temp</TableCell>
                <TableCell align="right">Max Temp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {temperatureData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.deviceId}</TableCell>
                  <TableCell>
                    {/* <Avatar
                      alt={row.driver}
                      src={`/static/images/avatar/${row.driver}.jpg`}
                    /> */}
                    {row.driver}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell align="center">{row.avgTemp}</TableCell>
                  <TableCell align="center">{row.minTemp}</TableCell>
                  <TableCell align="center">{row.maxTemp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Temperature;
