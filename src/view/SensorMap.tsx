import { Layout } from "components/Layout";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { MEASURING } from "data/measuring";
import { Map } from "./Map";
import { Box } from "@mui/material";

export const SensorMap = () => {
  const [selectedMeasure, setSelectedMeasure] = React.useState<string>(
    MEASURING[0]
  );
  return (
    <Layout>
      <Box>
        <Map measure={selectedMeasure} />
        <Box
          sx={{
            marginTop: "10px",
            width: "100%",
            height: "20px",
            backgroundImage:
              "linear-gradient(to right, #660000,#ca0000,#ff6600,#ffff01,#ccff00,#00cc33,#008c59, #006699, #0233b2, #000099,  #000099)",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0",
          }}
        >
          <Typography fontSize="12px">Low</Typography>
          <Typography fontSize="12px">heigh</Typography>
        </Box>
      </Box>
      <FormControl fullWidth sx={{ margin: "20px 0" }}>
        <InputLabel id="measure" color="secondary">
          Measure
        </InputLabel>
        <Select
          labelId="measure"
          id="demo-simple-select"
          value={selectedMeasure}
          label="measure"
          sx={{ textTransform: "capitalize" }}
          onChange={(e) => setSelectedMeasure(e.target.value)}
        >
          {MEASURING.map((measure) => (
            <MenuItem value={measure} sx={{ textTransform: "capitalize" }}>
              {measure}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Layout>
  );
};
