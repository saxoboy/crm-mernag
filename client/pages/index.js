import React from "react";
import Head from "next/head";
import Layout from "../layouts";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleBar: {
    borderBottom: "1px",
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
  },
}));

const Home = (props) => {
  const classes = useStyles(); //Styles para MUI
  return (
    <>
      <Head>
        <title>Welcome - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <Typography component="h1" variant="h5" color="initial" paragraph>
          Welcome back, !
        </Typography>

        <Divider light variant="middle" />
      </Layout>
    </>
  );
};

export default Home;
/*<div className={classes.titleBar}></div>*/
