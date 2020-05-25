import { gql } from "@apollo/client";

export const USER_NEW = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      ok
      message
      data
    }
  }
`;

export const USER_UPDATE = gql`
  mutation updateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      ok
      message
      data
    }
  }
`;
