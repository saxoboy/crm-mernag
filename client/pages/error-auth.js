import React from "react";
import Head from "next/head";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

const ErrorAuth = (props) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Error Authenticated - MERNAG + Apollo + GraphQL</title>
      </Head>
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h3"
          paragraph
          align="center"
          paragraph
        >
          Ups!!
        </Typography>
        <Typography component="p" variant="h5" paragraph align="center">
          You must log in to do this
        </Typography>
        <Typography component="p" variant="h6" paragraph align="center">
          Back to <Link href="/login"><a style={{color: 'yellow'}}>Login</a></Link>
        </Typography>
      </div>
    </>
  );
};

export default ErrorAuth;
