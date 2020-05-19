import React from "react";
import { useQuery, gql } from "@apollo/client";

const ME = gql`
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

const UserController = () => {
  const { data, loading, error } = useQuery(ME);
  if (loading) return null;
  if (error) return console.log("hay un error en me" + { error });
  return data;
};
export default UserController({data}) ;