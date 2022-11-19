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

export const SensorsList = () => {
  return (
    <Layout>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {sensors.map((sensor) => (
          <ListItem key={sensor.serialNumber}>
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
            <ListItemText primary={sensor.name} secondary={sensor.status} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};
