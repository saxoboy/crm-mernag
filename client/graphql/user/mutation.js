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

export const USER_INFO_UPDATE = gql`
  mutation updateInfoUser($id: ID!, $input: UserInput!) {
    updateInfoUser(id: $id, input: $input) {
      ok
      message
      data
    }
  }
`;
