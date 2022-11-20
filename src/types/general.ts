export interface Sensor {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  measures: Measures[];
  batteryLevel: number;
  status: string;
  serialNumber: string;
}

export interface Measures {
  acidity: number;
  irradiation: number;
  irrigation: number;
  magnesium: number;
  phosphorus: number;
  potassium: number;
  temperature?: number;
}
