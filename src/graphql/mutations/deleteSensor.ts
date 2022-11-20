import { gql } from "@apollo/client";

export const DELETE_SENSOR = gql`
  mutation DeleteSensor($id: ID!) {
    deleteSensor(id: $id) {
      id
    }
  }
`;
