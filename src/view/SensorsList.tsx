import { Layout } from "components/Layout";
import { sensors } from "view/Map";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SensorsIcon from "@mui/icons-material/Sensors";
import { deepOrange, green } from "@mui/material/colors";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";

export const SensorsList = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Typography
        fontSize="20px"
        color="secondary.main"
        sx={{ padding: "15px 15px 5px" }}
      >
        List of devices:
      </Typography>

      <List sx={{ width: "100%", maxWidth: 360 }}>
        {sensors.map((sensor) => (
          <React.Fragment>
            <ListItem
              key={sensor.serialNumber}
              onClick={() => navigate(`/sensor/${sensor.serialNumber}`)}
            >
              <ListItemAvatar>
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
              <ListItemText primary={sensor.name} secondary={sensor.status} />{" "}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Layout>
  );
};
