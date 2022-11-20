import { Box, Button, Typography } from "@mui/material";
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
import { useEffect, useState } from "react";
import { Sensor as SensorProps } from "types/general";
import { useLazyQuery } from "@apollo/client";
import { SENSOR } from "graphql/queries/sensor";
import { DELETE_SENSOR } from "graphql/mutations/deleteSensor";
import { useMutation } from "@apollo/client";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export const Sensor = () => {
  const navigate = useNavigate();
  const { serialNumber } = useParams();
  const [sensor, setSensor] = useState<SensorProps | null>(null);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [sensorQuery, { data }] = useLazyQuery(SENSOR);
  useEffect(() => {
    sensorQuery({
      variables: {
        serialNumber,
      },
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    setSensor(data.sensor);
  }, [data]);

  const [deleteSensor] = useMutation(DELETE_SENSOR, {
    onCompleted: () => {
      setIsPopupOpened(true);
    },
  });

  const handleDelete = () => {
    deleteSensor({ variables: { id: sensor.id } });
  };
  const handleClose = () => {
    setIsPopupOpened(false);
    navigate("/sensors-list");
  };

  if (!sensor) return;
  return (
    <>
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
          {sensor.measures && sensor.measures.length ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <List sx={{ width: "100%" }}>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Acidity: "}</Typography>
                    {/* <Typography>{sensor.measures.acidity}%</Typography> */}
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Irradiation: "}</Typography>
                    {/* <Typography>{sensor.measures.irradiation}</Typography> */}
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Irrigation: "}</Typography>
                    {/* <Typography>{sensor.measures.irrigation} Sv</Typography> */}
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Magnesium: "}</Typography>
                    {/* <Typography>{sensor.measures.magnesium} %</Typography> */}
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Phosphorus: "}</Typography>
                    {/* <Typography>{sensor.measures.phosphorus} %</Typography> */}
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Potassium: "}</Typography>
                    {/* <Typography>{sensor.measures.potassium} %</Typography> */}
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>{"Temperature: "}</Typography>
                    {/* <Typography>{sensor.measures.temperature} C</Typography> */}
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
            </>
          ) : (
            <Typography
              color="secondary"
              fontSize="20px"
              sx={{ textAlign: "center", padding: "15px " }}
            >
              No measures yet
            </Typography>
          )}
          <Divider />
          <Button
            color="secondary"
            sx={{ width: "100%", margin: "30px 0 0 " }}
            variant="contained"
            onClick={handleDelete}
          >
            Delete Sensor
          </Button>
        </Box>
      </Layout>
      <Dialog
        fullScreen={false}
        open={isPopupOpened}
        onClose={handleClose}
        aria-labelledby="sensor-added"
      >
        <DialogTitle id="sensor-added" textAlign={"center"}>
          {"Your sensor has been successfully deleted"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
