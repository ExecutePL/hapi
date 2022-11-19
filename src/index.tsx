import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SensorMap } from "./view/SensorMap";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SensorsList } from "view/SensorsList";
import { Sensor } from "view/Sensor";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e1f3f0",
    },
    secondary: {
      main: "#00aa95",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <SensorMap />,
  },
  {
    path: "/sensors-list",
    element: <SensorsList />,
  },
  {
    path: "/sensor/:serialNumber",
    element: <Sensor />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
