import React, { useState, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { ME } from "../graphql/auth/query";

//Components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

//Context
import { AuthContext } from "../context/auth";

/* MUI */
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

const Layout = ({ children }) => {
  const classes = useStyles(); // clases de styles
  const router = useRouter(); // routing
  const context = useContext(AuthContext); //context
  const theme = useTheme(); //theme de MUI
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });  

  // responsive
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  // Query ME
  const { loading, data, error } = useQuery(ME);
  if (loading) return "Cargando...";
  if (error) {
    console.log(error.message.replace("GraphQL error: ", ""));
    router.push("/login");
    return null;
  }
  if (data) context.user = data.me;
  return (
    <>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop,
        })}
      >
        <Navbar onSidebarOpen={handleSidebarOpen} />
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? "persistent" : "temporary"}
        />
        <Main user={data.me} className={classes.content}>
          {children}
        </Main>
      </div>
    </>
  );
};

export default Layout;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: "100%",
  },
}));
