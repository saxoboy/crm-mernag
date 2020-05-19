import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      name
      username
      email
      role
    }
  }
`;
