import { Box, Typography } from "@mui/material";
import { sensors } from "./Map";
import { useParams } from "react-router-dom";
import { Layout } from "components/Layout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SensorsIcon from "@mui/icons-material/Sensors";
import { deepOrange, green } from "@mui/material/colors";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";
import Divider from "@mui/material/Divider";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import Battery4BarIcon from "@mui/icons-material/Battery4Bar";
import Battery3BarIcon from "@mui/icons-material/Battery3Bar";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";

export const Sensor = () => {
  const { serialNumber } = useParams();
  const sensor = sensors.find((sensor) => sensor.serialNumber === serialNumber);
  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <ListItemText
            primary={sensor.name}
            secondary={sensor.status}
            primaryTypographyProps={{ style: { fontSize: "26px" } }}
          />
          <ListItemAvatar
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>{sensor.batteryLevel}%</Typography>
              {sensor.batteryLevel <= 10 && <BatteryAlertIcon />}
              {sensor.batteryLevel <= 30 && sensor.batteryLevel > 10 && (
                <Battery3BarIcon />
              )}
              {sensor.batteryLevel <= 50 && sensor.batteryLevel > 30 && (
                <Battery4BarIcon />
              )}
              {sensor.batteryLevel <= 70 && sensor.batteryLevel > 50 && (
                <Battery5BarIcon />
              )}
              {sensor.batteryLevel >= 70 && <BatteryFullIcon />}
            </Box>
            <Avatar
              sx={{
                bgcolor: `${
                  sensor.status === "online" ? green[500] : deepOrange[500]
                }`,
              }}
            >
              {sensor.status === "online" ? (
                <SensorsIcon />
              ) : (
                <SensorsOffIcon />
              )}
            </Avatar>
          </ListItemAvatar>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <List sx={{ width: "100%" }}>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"Water: "}</Typography>
              <Typography>{sensor.measuring.water}%</Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"PH: "}</Typography>
              <Typography>{sensor.measuring.ph}</Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"Radiation: "}</Typography>
              <Typography>{sensor.measuring.radiation} Sv</Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"Phosphorus: "}</Typography>
              <Typography>{sensor.measuring.phosphorus} %</Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"Potassium: "}</Typography>
              <Typography>{sensor.measuring.potassium} %</Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"Magnesium: "}</Typography>
              <Typography>{sensor.measuring.magnesium} %</Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Typography>{"Temperature: "}</Typography>
              <Typography>{sensor.measuring.temperature} C</Typography>
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 32px",
          }}
        >
          <Typography>{"Last measurement: "}</Typography>
          <Typography>2022-11-13</Typography>
        </Box>
        <Divider />
      </Box>
    </Layout>
  );
};
