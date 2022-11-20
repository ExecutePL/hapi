import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Layout } from "components/Layout";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { getAddress } from "utils/getAddress";
import { useParams } from "react-router-dom";
import { CREATE_SENSOR } from "graphql/mutations/createSensor";
import { useMutation } from "@apollo/client";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

interface NewSensor {
  name?: string;
  serialNumber?: string;
  latitude?: number;
  longitude?: number;
}

export const AddSensor = () => {
  const navigate = useNavigate();
  const { serialNumber } = useParams();
  const [address, setAddress] = React.useState<string>("");
  const [newSensor, setNewSensor] = React.useState<NewSensor | null>(null);
  const [isPopupOpened, setIsPopupOpened] = React.useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = React.useState(false);
  const [createSensor] = useMutation(CREATE_SENSOR, {
    onCompleted: (data) => {
      setIsPopupOpened(true);
    },
    onError: () => {
      setIsErrorPopupOpened(true);
    },
  });
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      getAddress({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }).then((result) => {
        if (!result) return;
        setAddress(result.display_name);
        setNewSensor((prev) => {
          return {
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createSensor({
      variables: {
        ...newSensor,
      },
    });
  };
  React.useEffect(() => {
    setNewSensor((prev) => {
      return { ...prev, serialNumber };
    });
  }, [serialNumber]);

  const handleClose = () => {
    setIsPopupOpened(false);
    navigate("/");
  };
  return (
    <>
      <Layout>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "15px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography fontSize="20px" color="secondary.main">
            Add new sensor:
          </Typography>
          <TextField
            required
            id="sensor-name"
            label="Name"
            placeholder="Enter Sensor Name"
            color="secondary"
            onChange={(e) =>
              setNewSensor((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <TextField
            required
            id="sensor-serai-number"
            label="Serial Number"
            placeholder="Enter Serial Number"
            color="secondary"
            disabled
            defaultValue={serialNumber}
          />
          <FormControl variant="outlined" color="secondary">
            <InputLabel htmlFor="sensor-location" required>
              Location
            </InputLabel>
            <OutlinedInput
              id="sensor-location"
              disabled
              value={address}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle location"
                    onClick={handleGetLocation}
                    onMouseDown={handleGetLocation}
                    edge="end"
                  >
                    <MyLocationIcon color="secondary" />
                  </IconButton>
                </InputAdornment>
              }
              label="location"
            />
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "20px" }}
            type="submit"
          >
            Add
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
          {"Your sensor has been successfully added"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={false}
        open={isErrorPopupOpened}
        onClose={() => setIsErrorPopupOpened(false)}
        aria-labelledby="sensor-added"
      >
        <DialogTitle id="sensor-added" textAlign={"center"}>
          {"New sensor is too close to other sensor"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setIsErrorPopupOpened(false)}
            autoFocus
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
