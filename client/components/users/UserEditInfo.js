import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/auth";

/*APOLLO*/
import { useQuery, useMutation } from "@apollo/client";
import { USER_GET } from "../../graphql/user/query";
import { USER_INFO_UPDATE } from "../../graphql/user/mutation";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import UserEditImg from "./UserEditImg";

const UserEditInfo = () => {
  const classes = useStyles(); //Styles para MUI
  const [mensaje, setMensaje] = useState(null); // State para el mensaje
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);
  const router = useRouter();  

  const { query: { id } } = router;
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  // Consultar para obtener el cliente
  const { data, loading, error } = useQuery(USER_GET, {
    variables: {
      id,
    },
  });
  const { getUser } = data;

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
      //router.push("/error-auth");
    }, 100);
    return null;
  } 
  
  //datos del form
  const actualizarInfoUsuario = async (values) => {
    const { name, username, email, role } = values;
    try {
      const { data } = await updateInfoUser({
        variables: {
          id,
          input: {
            name,
            username,
            email,
            photo: getUser.photo,
            role,
          },
        },
      });
      console.log(data);
      const { ok, message } = data.updateInfoUser;
      if (ok) {
        setMensaje(message);
        setTimeout(() => {
          setMensaje(null);
          //router.push("/user");
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
      console.log(errors.message.replace("GraphQL error: ", ""));
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
    <>
      {mensaje && mostrarMensaje()}
      <Grid
        container
        spacing={1}
        className={classes.root}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item lg={6}>
          <Typography
            paragraph
            className={classes.titleTex}
            component="h3"
            variant="h5"
            color="initial"
            align="center"
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
                <form onSubmit={props.handleSubmit}>
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
                  {user.role === "ADMIN" && (
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Role"
                        value={role ? role : props.values.role}
                        onChange={handleChangeRole}
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={"USER"}>USER</MenuItem>
                        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  <Box mb={1}>
                    <Button
                      style={{ margin: "1.5em auto", display: "block" }}
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
        </Grid>
        <Grid item lg={6}>
          <Typography
            paragraph
            className={classes.titleTex}
            component="h3"
            variant="h5"
            color="initial"
            align="center"
            paragraph
          >
            Editar o Subir Imagen de Perfil
          </Typography>
          <UserEditImg />
        </Grid>
      </Grid>
    </>
  );
};

export default UserEditInfo;

const useStyles = makeStyles((theme) => ({
  titleTex: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(2, 1, 1, 0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
