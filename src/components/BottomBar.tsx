import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import IsoIcon from "@mui/icons-material/Iso";

export const BottomBar = () => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
      }}
      style={{ boxShadow: "1px 4px 15px 0px rgba(66, 68, 90, 1)" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <IconButton aria-label="home">
          <HomeIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="home">
          <AddLocationAltIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="home">
          <IsoIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="home">
          <AccountCircleIcon color="secondary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
