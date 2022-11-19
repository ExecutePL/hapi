export interface Sensor {
  name: string;
  latitude: number;
  longitude: number;
  measuring: Measuring;
  batteryLevel: number;
  status: string;
  serialNumber: string;
}

export interface Measuring {
  water: number;
  ph: number;
  radiation: number;
  phosphorus: number;
  potassium: number;
  magnesium: number;
  temperature: number;
}
