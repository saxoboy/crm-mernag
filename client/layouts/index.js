import React, { useContext } from "react";
import { useRouter } from "next/router";

// Apollo
import { useQuery, gql } from "@apollo/client";

//Components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

//Context
//import { AuthContext } from "../context/auth"

/* MUI */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

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

const Layout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter(); // routing

  const { data, loading, error } = useQuery(ME);

  if (loading && !error) {
    //console.log("Cargando...");
    return <p>Cargando...</p>;
  }
  if (error && !loading) {
    console.log("No hay privilegios...");
    router.push("/login");
    return null
  }
  // if (data && !error && !loading) {
  //   console.log(data);
  // }
  return (
    <>
      <div className={classes.root}>
        <Navbar dataUser={data.me} />
        <Sidebar dataUser={data.me} />
        <Main dataUser={data.me}>{children}</Main>
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
