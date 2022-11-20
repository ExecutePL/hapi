import { gql } from "@apollo/client";

export const CREATE_SENSOR = gql`
  mutation CreateSensor(
    $serialNumber: String!
    $name: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createSensor(
      input: {
        serial_number: $serialNumber
        name: $name
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      id
    }
  }
`;
