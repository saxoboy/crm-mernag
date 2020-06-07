import React, { useState,  useContext  } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../layouts";

// apollo
import { useQuery } from "@apollo/client";
import { USER_GET } from "../../../graphql/user/query";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Paper, Tabs, Tab } from "@material-ui/core";

//Components
import UserEditInfo from "../../../components/users/UserEditInfo";
import UserEditPassword from "../../../components/users/UserEditPassword";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EditUser = () => {
  const classes = useStyles(); //Styles para MUI
  const router = useRouter();
  const [value, setValue] = useState(0);  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {query: { id }} = router;
  
  // Consultar para obtener el cliente
  const { data, loading, error } = useQuery(USER_GET, {
    variables: {
      id,
    },
  });
  if (loading) return "Cargando...";
  if (error) {
    setTimeout(() => {
      router.push("/error-auth");
    }, 100);
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Editar Usuario - {data.getUser.name} - MERNAG + Apollo + GraphQL
        </title>
      </Head>
      <Layout>
        <Box className={classes.title}>
          <Typography
            paragraph
            className={classes.titleTex}
            component="h1"
            variant="h5"
            color="initial"
            paragraph
          >
            Editar Usuario {data.getUser.name}
          </Typography>
        </Box>
        <Paper className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Perfile" {...a11yProps(0)} />
            <Tab label="Password" {...a11yProps(1)} />

          </Tabs>
          <TabPanel value={value} index={0} style={{width: "100%"}} >
            <UserEditInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserEditPassword />
          </TabPanel>        
        </Paper>
      </Layout>
    </>
  );
};

export default EditUser;

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    marginBottom: theme.spacing(3),
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  titleTex: {
    flexGrow: 1,
  },
  root: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
