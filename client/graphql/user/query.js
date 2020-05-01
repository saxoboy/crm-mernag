import { gql } from "@apollo/client";

export const USERS_GET = gql`
  query getUsers {
    getUsers {
      id
      name
      username
      email
      created_at
      updated_at
      role
    }
  }
`;
