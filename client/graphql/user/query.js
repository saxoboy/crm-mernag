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

export const USER_GET = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      username
      email
      password
      role
      created_at
      updated_at
      status
    }
  }
`;
