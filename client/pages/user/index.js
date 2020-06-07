import React, { useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../layouts";
import { AuthContext } from "../../context/auth"

import { useQuery } from "@apollo/client";
import { USERS_GET } from "../../graphql/user/query";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  TablePagination,
} from "@material-ui/core";

import UserList from "../../components/users/UserList";

const columns = [
  { id: "photo", label: "Imagen", maxWidth: 100 },
  { id: "name", label: "Nombre", minWidth: 100 },
  { id: "username", label: "User Name", minWidth: 100 },
  { id: "email", label: "E-Mail", minWidth: 150 },
  { id: "role", label: "Rol", minWidth: 70, align: "center" },
  { id: "created_at", label: "Creado", minWidth: 100, align: "center" },
  { id: "updated_at", label: "Actualizado", minWidth: 100, align: "center" },
  { id: "actions", label: "Acciones", minWidth: 100, align: "center" },
];

const Users = () => {
  const classes = useStyles(); //Styles para MUI
  const router = useRouter(); // routing
  const [page, setPage] = useState(0); // State Paginación
  const [rowsPerPage, setRowsPerPage] = useState(10); // State Datos por pagina
  const { user } = useContext(AuthContext); //context de UserLogin

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { loading, data, error } = useQuery(USERS_GET);
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
        <title>Usuarios - MERNAG + Apollo + GraphQL</title>
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
            Listado de Usuarios
          </Typography>
          {user.role === "ADMIN" && (
            <Button
              href="/user/new"
              color="primary"
              variant="contained"
              size="small"
            >
              Nuevo Usuario
            </Button>
          )}
        </Box>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.getUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return <UserList key={row.id} userData={row} />;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Layout>
    </>
  );
};

export default Users;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 780,
  },
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
}));
