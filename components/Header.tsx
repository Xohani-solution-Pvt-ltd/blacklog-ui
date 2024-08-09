// import React, { useState, useEffect } from "react";
// import { Button, Container, Nav, Navbar } from "react-bootstrap";
// import Image from "next/image";
// import logoImg from "../public/assets/img/logo_2.png";
// import router from "next/router";
// import { Avatar, Box, IconButton, Typography } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";

// export default function Header() {
//   const [toggle, setToggle] = useState(false);

//   useEffect(() => {
//     if (toggle) {
//       router.push("/");
//     }
//   }, [toggle]);

//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

//   return (
//     <Container fluid>
//       <Navbar
//         expand="lg"
//         className="fixed-top bg-dark px-4"
//         collapseOnSelect
//         variant="white"
//       >
//         <Navbar.Brand href="/">
//           <Image
//             className="pr-2"
//             src={logoImg}
//             height={50}
//             width={50}
//             alt={`Logo`}
//           />
//         </Navbar.Brand>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", borderRadius: 1, mr: 2 }}
//         >
//           <Typography
//             variant="h6"
//             style={{ marginRight: "20px", color: "#FFFFFF" }}
//           >
//             Sun, 21 July 2024
//           </Typography>
//           <Typography
//             variant="h6"
//             style={{ marginRight: "20px", color: "#FFFFFF" }}
//           >
//             15:20:30 PM
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             flexDirection: "row",
//           }}
//         >
//           <Avatar alt="Dev Matthew" src="/path-to-avatar.jpg" />
//           <IconButton>
//             <NotificationsIcon sx={{ color: "white", ml: 1 }} />
//           </IconButton>
//           <IconButton>
//             <SettingsIcon sx={{ color: "white", ml: 1 }} />
//           </IconButton>
//         </Box>
//         <Navbar.Toggle
//           aria-controls="responsive-navbar-nav"
//           className="btn"
//           style={{ background: "white" }}
//         />
//         <Navbar.Collapse
//           id="responsive-navbar-nav"
//           className="nav-collapse"
//         ></Navbar.Collapse>
//       </Navbar>
//     </Container>
//   );
// }

import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import logoImg from "../public/assets/img/logo_2.png";
import router from "next/router";
import { Avatar, Box, IconButton, Typography, Grid } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    if (toggle) {
      router.push("/");
    }
  }, [toggle]);

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
      <Navbar
        expand="lg"
        className="fixed-top bg-dark px-4"
        collapseOnSelect
        variant="white"
      >
        <Grid container alignItems="center">
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Navbar.Brand href="/dashboard">
              <Image
                className="pr-2"
                src={logoImg}
                height={50}
                width={50}
                alt={`Logo`}
              />
            </Navbar.Brand>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            container
            justifyContent="center"
            sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", borderRadius: 5 }}
          >
            {dateTime && (
              <Typography
                variant="h6"
                style={{ color: "#FFFFFF" }}
                align="center"
              >
                {formatDateTime(dateTime)}
              </Typography>
            )}
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            container
            justifyContent="flex-end"
          >
            <IconButton>
              <NotificationsIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <SettingsIcon sx={{ color: "white", marginRight: "10px" }} />
            </IconButton>
            <Avatar alt="Dev Matthew" src="/path-to-avatar.jpg" />
          </Grid>
        </Grid>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="btn"
          style={{ background: "white" }}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="nav-collapse"
        ></Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
