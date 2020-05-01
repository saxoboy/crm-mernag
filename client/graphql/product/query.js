import { gql } from "@apollo/client";

export const PRODUCTS_GET = gql`
  query getProducts {
    getProducts {
      id
      code
      name
      description
      image
      stock
      brand
      unit
      status
      created_at
      updated_at
    }
  }
`;
