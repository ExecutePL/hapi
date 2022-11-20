import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SensorsIcon from "@mui/icons-material/Sensors";
import { useNavigate } from "react-router-dom";

export const BottomBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<HomeIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="home"
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          icon={<AddLocationAltIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="addLocationAlt"
        />
        <BottomNavigationAction
          icon={<SensorsIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="Iso"
          onClick={() => navigate("/sensors-list")}
        />
        <BottomNavigationAction
          icon={<AccountCircleIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="account"
          disabled
        />
      </BottomNavigation>
    </Paper>
  );
};
