import L, { LatLngExpression, Map as MapLeaflet } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import userLocation from "../assets/img/user-location.png";
import sensorLocation from "../assets/img/pin.png";

interface MapProps {
  measure: string;
}

export const Map = ({ measure }: MapProps) => {
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
  const height = 500;
  const [map, setMap] = useState<MapLeaflet | null>(null);
  const [position, setPosition] = useState<LatLngExpression>([
    50.087795, 19.988131,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={14}
        zoomControl={false}
        attributionControl={true}
        style={{ height: height, width: "85%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={userPin}></Marker>

        <Circle
          center={[position[0] + 0.0002, position[1]]}
          radius={10}
          pathOptions={{ color: "blue" }}
        />
        <Marker position={[position[0] + 0.0002, position[1]]} icon={sensorPin}>
          <Popup>
            {`Name: ${sensors[0].name}`} <br />
            {`${measure}: ${sensors[0].measuring[measure]}`}
            {/* {selectedMeasure === "ph" && `ph: ${sensor.measuring.ph}`}
              {selectedMeasure === "radiation" &&
                `radiation: ${sensor.measuring.radiation}`} */}
          </Popup>
        </Marker>
        <Circle
          center={[position[0] - 0.0003, position[1]]}
          radius={10}
          pathOptions={{ color: "red" }}
        />
        <Marker position={[position[0] - 0.0003, position[1]]} icon={sensorPin}>
          <Popup>
            {`Name: ${sensors[0].name}`} <br />
            {`${measure}: ${sensors[0].measuring[measure]}`}
            {/* {selectedMeasure === "ph" && `ph: ${sensor.measuring.ph}`}
              {selectedMeasure === "radiation" &&
                `radiation: ${sensor.measuring.radiation}`} */}
          </Popup>
        </Marker>
      </MapContainer>
    ),
    [position, measure]
  );

  useEffect(() => {
    map && position && map.setView(position, 33);
  }, [position]);

  return <div>{displayMap}</div>;
};

export const sensors = [
  {
    name: "Sensor 1",
    latitude: 50.091795,
    longitude: 19.988131,
    measuring: {
      water: 30,
      ph: 3,
      radiation: 20,
      phosphorus: 12,
      potassium: 8,
      magnesium: 10,
      temperature: 90,
    },
    batteryLevel: 9,
    status: "online",
    serialNumber: "AB1234",
  },
  {
    name: "Sensor 2",
    latitude: 50.091795,
    longitude: 19.988131,
    measuring: {
      water: 30,
      ph: 3,
      radiation: 20,
      phosphorus: 12,
      potassium: 8,
      magnesium: 10,
      temperature: 90,
    },
    batteryLevel: 90,
    status: "offline",
    serialNumber: "CD5678",
  },
];
