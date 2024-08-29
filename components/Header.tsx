import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import Image from "next/image";
import logoImg from "../public/assets/img/logo_2.png";
import { Avatar, IconButton, Typography, Grid, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ onToggleSidebar }) {
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    if (!date) return "";
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const dateString = date.toLocaleDateString(undefined, options);
    const timeString = date.toLocaleTimeString(undefined, { hour12: false });

    return `${dateString} - ${timeString}`;
  };

  return (
    <Container fluid>
      <Navbar expand="lg" className="fixed-top bg-dark px-4" variant="dark">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} sm={3}>
            <Navbar.Brand href="/dashboard">
              <Image src={logoImg} height={50} width={50} alt="Logo" />
            </Navbar.Brand>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {dateTime && (
              <Typography variant="body1" style={{ color: "#FFFFFF" }}>
                {formatDateTime(dateTime)}
              </Typography>
            )}
          </Grid>

          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton size="large">
                <NotificationsIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton size="large">
                <SettingsIcon sx={{ color: "white", marginRight: "10px" }} />
              </IconButton>
              <Avatar alt="Dev Matthew" src="/path-to-avatar.jpg" />
              <IconButton
                onClick={onToggleSidebar}
                sx={{ display: { xs: "flex", sm: "flex", md: "none" }, ml: 1 }}
              >
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Navbar>
    </Container>
  );
}
