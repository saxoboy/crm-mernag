import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../../layouts";

import { useMutation } from "@apollo/client";
import { USER_NEW } from "../../graphql/user/mutation";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Usernew = () => {
  const classes = useStyles(); // Styles para MUI
  const router = useRouter(); // Routing
  const [mensaje, setMensaje] = useState(null); // State para el mensaje
  const [createUser] = useMutation(USER_NEW); // Mutation para crear nuevos usuarios

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El Nombre no puede ir vacio"),
      username: Yup.string().required("El Usuario no puede ir vacio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { name, username, email, password } = values;
      try {
        const { data } = await createUser({
          variables: {
            input: {
              name,
              username,
              email,
              password,
              role: "USER",
            },
          },
        });

        if (data.createUser.ok) {
          setMensaje(data.createUser.message);
          setTimeout(() => {
            setMensaje(null);
            router.push("/user");
          }, 3000);
        } else {
          setMensaje(
            data.createUser.message.replace("User validation failed: ", "")
          );
          setTimeout(() => {
            setMensaje(null);
          }, 3000);
        }
      } catch (errors) {
        setMensaje(errors.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  }); // fin de Formik

  const mostrarMensaje = () => {
    return (
      <Alert variant="filled" severity="info">
        {mensaje}
      </Alert>
    );
  };

  return (
    <>
      <Head>
        <title>Crear Nuevo Usuario - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <Container component="main" maxWidth="xs" className={classes.form}>
          {mensaje && mostrarMensaje()}
          <Typography variant="h4" component="h1" align="center">
            Nuevo Usuario
          </Typography>

          <form onSubmit={formik.handleSubmit} style={{ margin: "1.25em 0 0" }}>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name ? true : false}
              variant="outlined"
              margin="normal"
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              required
              fullWidth
              autoFocus
            />
            <TextField
              onChange={formik.handleChange}
              value={formik.values.username}
              error={formik.errors.username ? true : false}
              variant="outlined"
              margin="normal"
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              required
              fullWidth
            />
            <TextField
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email ? true : false}
              variant="outlined"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              required
              fullWidth
            />
            <TextField
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password ? true : false}
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
            />
            <Box className={classes.paper} mb={1}>
              <Button
                className={classes.submit}
                style={{ margin: "1.5em 0" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Nuevo Usuario
              </Button>
            </Box>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default Usernew;

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
  },
  title: {
    flexGrow: 1,
  },
  form: {
    backgroundColor: "#fff",
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
