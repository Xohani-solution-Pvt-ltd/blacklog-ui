import React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { Person } from "@mui/icons-material";
import { Box } from "@mui/joy";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdjustIcon from "@mui/icons-material/Adjust";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DashboardSidebar() {
  const classes =
    "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root";

  return (
    <>
      <Box
        sx={{
          "--ListItem-radius": "var(--joy-radius-sm)",
          "--List-gap": "15px",
          marginTop: "60px",
          backgroundColor: "#DAD8C9",
        }}
      >
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
            rowGap: 1,
          }}
        >
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <DashboardIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Dashboard
              </ListItemContent>
            </Link>
          </ListItem>
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/Tracking/TrackDevice"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <SpatialTrackingIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Track Device
              </ListItemContent>
            </Link>
          </ListItem>
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/Reports/Reports"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <SummarizeIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Reports
              </ListItemContent>
            </Link>
          </ListItem>
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/Geofence/geofence"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <AdjustIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Geofence
              </ListItemContent>
            </Link>
          </ListItem>
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/Temperature/Temperature"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <DeviceThermostatIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Temperature
              </ListItemContent>
            </Link>
          </ListItem>
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <LightbulbIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Alerts
              </ListItemContent>
            </Link>
          </ListItem>
          <ListItem
            sx={(theme) => ({
              justifyContent: "center",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                background: theme.colorSchemes.light.palette.background.level2,
              },
            })}
          >
            <Link
              className={classes}
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <ListItemDecorator sx={{ m: 0 }}>
                <LogoutIcon />
              </ListItemDecorator>
              <ListItemContent sx={{ color: "neutral.500", fontWeight: 400 }}>
                Log Out
              </ListItemContent>
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
