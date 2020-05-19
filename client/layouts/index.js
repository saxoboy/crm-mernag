import React, { useEffect, useContext } from "react";
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
import { makeStyles } from "@material-ui/core/styles";

const Layout = ({ children }) => {
  const classes = useStyles(); // clases de styles
  const router = useRouter(); // routing
  const context = useContext(AuthContext);

  const { loading, data, error } = useQuery(ME);
  if (loading) return "Cargando...";
  if (error) {
    console.log(error.message.replace("GraphQL error: ", ""));
    router.push("/login");
    return null;
  }
  if (data) {
    context.user = data.me;
  }
  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Sidebar />
        <Main user={data.me}>{children}</Main>
      </div>
    </>
  );
};

export default Layout;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
