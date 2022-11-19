import L, { LatLngExpression, Map as MapLeaflet } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import userLocation from "../assets/img/user-location.png";

export const Map = () => {
  const height = 700;
  const position: LatLngExpression = [50.087795, 19.988131];
  const [map, setMap] = useState<MapLeaflet | null>(null);
  const [selectedMeasure, setSelectedMeasure] = useState<
    "water" | "ph" | "radiation"
  >("water");

  const userPin = new L.Icon({
    iconUrl: userLocation,
    iconAnchor: [22.5, 65],
    iconSize: new L.Point(19, 34),
    className: "leaflet-icon",
  });

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={14}
        zoomControl={false}
        attributionControl={true}
        style={{ height: height }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensors.map((sensor) => (
          <Marker
            position={[sensor.position.latitude, sensor.position.longitude]}
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
  return <div>{displayMap}</div>;
};

const sensors = [
  {
    name: "First",
    position: {
      latitude: 50.087795,
      longitude: 19.988131,
    },
    measuring: {
      water: 30,
      ph: 3,
      radiation: 20,
    },
  },
  {
    name: "Second",
    position: {
      latitude: 50.3,
      longitude: 20,
    },
    measuring: {
      water: 30,
      ph: 3,
      radiation: 20,
    },
  },
];
