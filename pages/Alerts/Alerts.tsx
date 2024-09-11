import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "error", message: "Device disconnected!", time: "10:30 AM" },
    { id: 2, type: "warning", message: "Battery level low", time: "11:00 AM" },
    {
      id: 3,
      type: "info",
      message: "Software update available",
      time: "11:30 AM",
    },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dismissAlert = (alertId) => {
    const newAlerts = alerts.filter((alert) => alert.id !== alertId);
    const dismissedAlert = alerts.find((alert) => alert.id === alertId);
    setAlerts(newAlerts);
    setSnackbarMessage(`Alert "${dismissedAlert.message}" dismissed.`);
    setOpenSnackbar(true);
  };

  return (
    <div className="dashboard-layout">
      <Layout />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="dashboard-content" style={{ marginTop: "65px" }}>
    <Container>
      <Typography variant="h6" gutterBottom>
        Tracking Device Alerts
      </Typography>

      <Grid container spacing={3}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <Grid item xs={12} sm={6} md={4} key={alert.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    {alert.type === "error" && "Error Alert"}
                    {alert.type === "warning" && "Warning Alert"}
                    {alert.type === "info" && "Info Alert"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Alert Time: {alert.time}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      Dismiss
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" gutterBottom>
            No active alerts at the moment.
          </Typography>
        )}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpenSnackbar(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
    </div></div>
  );
};

export default Alerts;
