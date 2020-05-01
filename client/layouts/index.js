import React from "react";

/* MUI */
import { makeStyles } from "@material-ui/core/styles";

//Components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Sidebar />
        <Main>{children}</Main>
      </div>
    </>
  );
};

export default Layout;

/*
forms: {
    display: "flex",
    height: "calc(100vh - 100px)",
    flexDirection: "column",
    justifyContent: "center",
  },

{router.pathname === "/login" ? (
        <div className={classes.forms}>
          <Main>{children}</Main>
        </div>
      ) : (
*/
