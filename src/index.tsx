import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SensorMap } from "./view/SensorMap";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SensorsList } from "view/SensorsList";
import { Sensor } from "view/Sensor";
import { AddSensor } from "view/AddSensor";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://hapibe.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

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
  {
    path: "/add-sensor/:serialNumber",
    element: <AddSensor />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
