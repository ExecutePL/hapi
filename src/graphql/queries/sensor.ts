import { gql } from "@apollo/client";

export const SENSOR = gql`
  query Sensor($serialNumber: String!) {
    sensor(serial_number: $serialNumber) {
      id
      name
      serial_number
      latitude
      longitude
      batteryLevel
      status
      measures {
        id
        irrigation
        acidity
        irradiation
        phosphorus
        potassium
        magnesium
      }
    }
  }
`;
