interface Position {
  latitude: number;
  longitude: number;
}

export const getAddress = async (position: Position) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.latitude}&lon=${position.longitude}&polygon_geojson=1&format=json`
  );
  const adressData = await response.json();
  return adressData;
};
