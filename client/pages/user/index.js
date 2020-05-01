import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../layouts";

import { useQuery } from "@apollo/client";
import { USERS_GET } from "../../graphql/user/query";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const columns = [
  { id: "name", label: "Nombre", minWidth: 100 },
  { id: "username", label: "User Name", minWidth: 100 },
  { id: "email", label: "E-Mail", minWidth: 170 },
  { id: "created_at", label: "Creado", minWidth: 100, align: "center" },
  { id: "updated_at", label: "Actualizado", minWidth: 100, align: "center" },
  { id: "role", label: "Rol", minWidth: 70, align: "center" },
];

const Users = () => {
  const classes = useStyles(); //Styles para MUI
  const [page, setPage] = useState(0); // State Paginación
  const [rowsPerPage, setRowsPerPage] = useState(10); // State Datos por pagina

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { loading, data, error } = useQuery(USERS_GET);
  if (loading) return null;
  if (error) return router.push("/login");

  return (
    <>
      <Head>
        <title>Usuarios - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <h1>Listado de Usuarios</h1>
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
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              { value }
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
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
