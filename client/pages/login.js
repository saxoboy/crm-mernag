import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    flexGrow: 1,
  },
  form: {
    backgroundColor: "#f2f2f2",
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
const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      ok
      message
      token
    }
  }
`;

const Login = () => {
  const classes = useStyles();
  const router = useRouter(); // routing
  const [mensaje, setMensaje] = useState(null); // state de Mensaje
  const [login] = useMutation(LOGIN); // Mutation para hacere Login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await login({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        if (data.login.ok) {
          setMensaje(data.login.message);
          const { token } = data.login;
          localStorage.setItem("token", token);
          setTimeout(() => {
            setMensaje(null);
            router.push("/");
          }, 2000);
        } else {
          setMensaje(
            data.login.message.replace("User validation failed: ", "")
          );
          setTimeout(() => {
            setMensaje(null);
          }, 2000);
        }
      } catch (errors) {
        setMensaje(errors.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          setMensaje(null);
        }, 2000);
      }
    },
  }); // fin de Formik

  const mostrarMensaje = () => {
    return (
      <Alert variant="filled" severity="info" style={{ margin: "0 0 1em 0" }}>
        {mensaje}
      </Alert>
    );
  };
  
  return (
    <div className={classes.root}>
      <Head>
        <title>Log In - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Container component="main" maxWidth="xs" className={classes.form}>
        {mensaje && mostrarMensaje()}
        <Typography variant="h4" component="h1" align="center">
          Iniciar Sesión
        </Typography>

        <form onSubmit={formik.handleSubmit} style={{ margin: "1.25em 0 0" }}>
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
            autoFocus
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
              Iniciar Sesión
            </Button>
          </Box>

          <Grid container>
            <Grid item xs>
              <Link href="#">
                <a>Forgot password?</a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register">
                <a>{"Sign Up"}</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Login;
