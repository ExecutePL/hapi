import { Layout } from "components/Layout";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MEASURING } from "data/measuring";
import { Map } from "./Map";

export const SensorMap = () => {
  const [selectedMeasure, setSelectedMeasure] = React.useState<string>(
    MEASURING[0]
  );
  return (
    <Layout>
      <Map measure={selectedMeasure} />
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
