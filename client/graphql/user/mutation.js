import { gql } from "@apollo/client"

export const USER_NEW = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      ok
      message
      data
    }
  }
`;
