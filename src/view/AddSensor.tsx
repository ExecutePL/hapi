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

export const AddSensor = () => {
  const { serialNumber } = useParams();
  const [address, setAddress] = React.useState<string>("");
  const handleGetLocation = () => {
    console.log("get");
    navigator.geolocation.getCurrentPosition((position) => {
      getAddress({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }).then((result) => {
        if (!result) return;
        setAddress(result.display_name);
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
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
  );
};
