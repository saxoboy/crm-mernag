import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "100px",
    width: "100%",
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Container>{children}</Container>
    </main>
  );
};

export default Main;
