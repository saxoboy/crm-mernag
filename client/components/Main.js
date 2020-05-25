import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const Main = ({ user, children }) => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Container user={user}>{children}</Container>
    </main>
  );
};

export default Main;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "100px",
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      marginTop: theme.spacing(4),
    },
  },
}));
