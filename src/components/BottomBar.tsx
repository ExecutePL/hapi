import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import IsoIcon from "@mui/icons-material/Iso";

export const BottomBar = () => {
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
          icon={<RestoreIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="home"
        />
        <BottomNavigationAction
          icon={<AddLocationAltIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="addLocationAlt"
        />
        <BottomNavigationAction
          icon={<IsoIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="Iso"
        />
        <BottomNavigationAction
          icon={<AccountCircleIcon />}
          sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
          value="account"
        />
      </BottomNavigation>
    </Paper>
    // <AppBar
    //   position="fixed"
    //   color="primary"
    //   sx={{
    //     top: "auto",
    //     bottom: 0,
    //   }}
    //   style={{ boxShadow: "1px 4px 15px 0px rgba(66, 68, 90, 1)" }}
    // >
    //   <Toolbar
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-around",
    //     }}
    //   >
    //     <IconButton aria-label="home">
    //       <HomeIcon color="secondary" />
    //     </IconButton>
    //     <IconButton aria-label="home">
    //       <AddLocationAltIcon color="secondary" />
    //     </IconButton>
    //     <IconButton aria-label="home">
    //       <IsoIcon color="secondary" />
    //     </IconButton>
    //     <IconButton aria-label="home">
    //       <AccountCircleIcon color="secondary" />
    //     </IconButton>
    //   </Toolbar>
    // </AppBar>
  );
};
