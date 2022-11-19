import L, { LatLngExpression, Map as MapLeaflet } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import userLocation from "../assets/img/user-location.png";
import sensorLocation from "../assets/img/sensor-pin.png";
import { Layout } from "components/Layout";

export const Map = () => {
  const height = 500;
  const width = 500;
  // const position: LatLngExpression = [50.087795, 19.988131];
  const [map, setMap] = useState<MapLeaflet | null>(null);
  const [selectedMeasure, setSelectedMeasure] = useState<
    "water" | "ph" | "radiation"
  >("water");

  const [position, setPosition] = useState<LatLngExpression>([
    50.087795, 19.988131,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const userPin = new L.Icon({
    iconUrl: userLocation,
    iconAnchor: [22.5, 65],
    iconSize: new L.Point(32, 34),
  });
  const sensorPin = new L.Icon({
    iconUrl: sensorLocation,
    iconAnchor: [22.5, 65],
    iconSize: new L.Point(30, 34),
  });

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={14}
        zoomControl={false}
        attributionControl={true}
        style={{ height: height, width: width }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={userPin}></Marker>
        {sensors.map((sensor) => (
          <Marker
            position={[sensor.position.latitude, sensor.position.longitude]}
            icon={sensorPin}
          >
            <Popup>
              {`Name: ${sensor.name}`} <br />
              {selectedMeasure === "water" &&
                `water: ${sensor.measuring.water}`}
              {selectedMeasure === "ph" && `ph: ${sensor.measuring.ph}`}
              {selectedMeasure === "radiation" &&
                `radiation: ${sensor.measuring.radiation}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [position]
  );
  useEffect(() => {
    map && position && map.setView(position, 14);
  }, [position]);
  return <Layout>'test'</Layout>;
};

const sensors = [
  {
    name: "Sensor 1",
    position: {
      latitude: 50.091795,
      longitude: 19.988131,
    },
    measuring: {
      water: 30,
      ph: 3,
      radiation: 20,
    },
  },
];
