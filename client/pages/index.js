import React, { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layouts";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

import { useQuery } from "@apollo/client";
import { ME } from "../graphql/auth/query";

//Context
import { AuthContext } from "../context/auth";

const Home = (props) => {
  const classes = useStyles(); //Styles para MUI
  const router = useRouter(); // routing
  const { user } = useContext(AuthContext);

  const { loading, data, error } = useQuery(ME);
  if (loading) return "Cargando...";
  if (error) {
    console.log(error.message.replace("GraphQL error: ", ""));
    router.push("/login");
    return null;
  }
  
  return (
    <>
      <Head>
        <title>Welcome - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <Typography component="h1" variant="h5" color="initial" paragraph>
          Welcome back, {data.me.name}
        </Typography>
        <Divider light variant="middle" />
      </Layout>
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  titleBar: {
    borderBottom: "1px",
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
  },
}));
