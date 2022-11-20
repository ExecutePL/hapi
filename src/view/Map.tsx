import L, { LatLngExpression, Map as MapLeaflet } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import userLocation from "../assets/img/user-location.png";
import sensorLocation from "../assets/img/pin.png";
import { Sensor } from "types/general";
import { SENSORS } from "graphql/queries/sensors";
import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getColor } from "utils/getColor";

interface MapProps {
  measure: string;
}

export const Map = ({ measure }: MapProps) => {
  const navigate = useNavigate();
  const height = "50vh";
  const [map, setMap] = useState<MapLeaflet | null>(null);
  const [position, setPosition] = useState<LatLngExpression>([
    50.087795, 19.988131,
  ]);
  const [userPosition, setUserPosition] = useState<LatLngExpression>([
    50.087795, 19.988131,
  ]);

  const [sensorsData, setSensorsData] = useState<Sensor[] | []>([]);
  const [sensors, { data }] = useLazyQuery(SENSORS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    sensors({ variables: { first: 10, page: 1 } });
  }, []);

  useEffect(() => {
    if (!data) return;
    setSensorsData(data.sensors.data);
  }, [data]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
      setUserPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleUserClick = () => {
    navigate(`/scan`);
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={14}
        zoomControl={false}
        attributionControl={true}
        style={{ height: height, width: "100%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={userPosition}
          icon={userPin}
          eventHandlers={{
            click: (e) => {
              handleUserClick();
            },
          }}
        ></Marker>
        {sensorsData.length &&
          sensorsData.map((sensor) => {
            if (!sensor.measures?.length) return;
            return (
              <React.Fragment key={sensor.serialNumber}>
                <Circle
                  center={[sensor.latitude, sensor.longitude]}
                  radius={100}
                  pathOptions={{
                    color: getColor(
                      sensor.measures[sensor.measures?.length - 1]
                        ? sensor.measures[sensor.measures?.length - 1][measure]
                        : 0
                    ),
                  }}
                />
                <Marker
                  position={[sensor.latitude, sensor.longitude]}
                  icon={sensorPin}
                >
                  <Popup>
                    {`Name: ${sensor.name}`} <br />
                    {`${measure}: ${
                      sensor.measures[sensor.measures?.length - 1]
                        ? sensor.measures[sensor.measures?.length - 1][measure]
                        : "-"
                    }`}
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        {/* <Circle
          center={[position[0] + 0.0002, position[1]]}
          radius={10}
          pathOptions={{ color: "blue" }}
        /> */}
        {/* <Marker position={[position[0] + 0.0002, position[1]]} icon={sensorPin}>
          <Popup>
            {`Name: ${sensors[0].name}`} <br />
            {`${measure}: ${sensors[0].measuring[measure]}`} */}
        {/* {selectedMeasure === "ph" && `ph: ${sensor.measuring.ph}`}
              {selectedMeasure === "radiation" &&
                `radiation: ${sensor.measuring.radiation}`} */}
        {/* </Popup>
        </Marker> */}
        {/* <Circle
          center={[position[0] - 0.0003, position[1]]}
          radius={10}
          pathOptions={{ color: "red" }}
        /> */}
        {/* <Marker position={[position[0] - 0.0003, position[1]]} icon={sensorPin}>
          <Popup>
            {`Name: ${sensors[0].name}`} <br />
            {`${measure}: ${sensors[0].measuring[measure]}`} */}
        {/* {selectedMeasure === "ph" && `ph: ${sensor.measuring.ph}`}
              {selectedMeasure === "radiation" &&
                `radiation: ${sensor.measuring.radiation}`} */}
        {/* </Popup>
        </Marker>*/}
      </MapContainer>
    ),
    [position, measure, sensorsData, userPosition]
  );

  useEffect(() => {
    map && position && map.setView(position, 20);
  }, [position]);

  return <div>{displayMap}</div>;
};

const userPin = new L.Icon({
  iconUrl: userLocation,
  iconAnchor: [18, 32],
  iconSize: new L.Point(32, 34),
});
const sensorPin = new L.Icon({
  iconUrl: sensorLocation,
  iconAnchor: [16, 30],
  iconSize: new L.Point(28, 29),
});
