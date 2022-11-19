import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/img/fullLogo.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const TopMenu = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
          >
            <img src={logo} width={100} alt="Hapi Logo" />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <IconButton
              size="medium"
              aria-label="theme change"
              sx={{ padding: 0 }}
            >
              <RemoveRedEyeIcon color="secondary" />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: "4px",
                borderLeft: "2px solid",
                paddingLeft: "7px",
                color: "secondary.main",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "22px",
                }}
              >
                A
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                A
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontWeight: "600",
                  fontSize: "15px",
                  paddingBottom: "2px",
                }}
              >
                A
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
