import { gql } from "@apollo/client";

export const SENSORS = gql`
  query Sensors($first: Int!, $page: Int) {
    sensors(
      orderBy: [{ column: CREATED_AT, order: ASC }]
      first: $first
      page: $page
    ) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
      data {
        id
        name
        serialNumber: serial_number
        latitude
        longitude
        batteryLevel
        status
        measures {
          acidity
          irradiation
          irrigation
          magnesium
          phosphorus
          potassium
        }
      }
    }
  }
`;
