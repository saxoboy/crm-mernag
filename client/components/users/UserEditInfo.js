import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";

/*APOLLO*/
import { useQuery, useMutation } from "@apollo/client";
import { USER_GET } from "../../graphql/user/query";
import { USER_INFO_UPDATE } from "../../graphql/user/mutation";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Box, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const UserEditInfo = () => {
  const classes = useStyles(); //Styles para MUI
  const [mensaje, setMensaje] = useState(null); // State para el mensaje
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar para obtener el cliente
  const { data, loading, error } = useQuery(USER_GET, {
    variables: {
      id,
    },
  });
  // Actualizar el cliente
  const [updateInfoUser] = useMutation(USER_INFO_UPDATE);

  // Schema de validacion
  const schemaValidacion = Yup.object({
    name: Yup.string().required("El Nombre no puede ir vacio"),
    username: Yup.string().required("El Usuario no puede ir vacio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email no puede ir vacio"),
  });
  if (loading) return "Cargando...";
  if (error) {
    setTimeout(() => {
      router.push("/error-auth");
    }, 100);
    return null;
  }
  const { getUser } = data;

  //datos del form
  const actualizarInfoUsuario = async (values) => {
    const { name, username, email } = values;
    try {
      const { data } = await updateInfoUser({
        variables: {
          id,
          input: {
            name,
            username,
            email,
            photo: getUser.photo
          },
        },
      });  
      const { ok, message } = data.updateInfoUser;
      if (ok) {
        setMensaje(message);
        setTimeout(() => {
          setMensaje(null);
          router.push("/user");
        }, 3000);
      } else {
        setMensaje(message.replace("User validation failed: ", ""));
        setTimeout(() => {
          setMensaje(null);
        }, 2000);
      }
    } catch (errors) {
      setMensaje(errors.message.replace("GraphQL error: ", ""));
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
      console.log(errors);
    }
  };
  const mostrarMensaje = (errors) => {
    return (
      <Alert variant="filled" severity="info">
        {mensaje}
      </Alert>
    );
  };

  return (
    <div>
      {mensaje && mostrarMensaje()}
      <Typography
        paragraph
        className={classes.titleTex}
        component="h3"
        variant="h5"
        color="initial"
        paragraph
      >
        Editar Usuario
      </Typography>
      <Formik
        enableReinitialize
        initialValues={getUser}
        validationSchema={schemaValidacion}
        onSubmit={(values) => {
          actualizarInfoUsuario(values);
        }}
      >
        {(props) => {
          return (
            <form
              onSubmit={props.handleSubmit}
              style={{ margin: "1.25em 0 0" }}
            >
              <TextField
                onChange={props.handleChange}
                value={props.values.name}
                error={props.errors.name ? true : false}
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
                onChange={props.handleChange}
                value={props.values.username}
                error={props.errors.username ? true : false}
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
                onChange={props.handleChange}
                value={props.values.email}
                error={props.errors.email ? true : false}
                variant="outlined"
                margin="normal"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                required
                fullWidth
              />
              <Box mb={1}>
                <Button
                  style={{ margin: "1.5em 0" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Editar Usuario
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserEditInfo;

const useStyles = makeStyles((theme) => ({
  titleTex: {
    flexGrow: 1,
  },
}));
