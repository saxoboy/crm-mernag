import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../layouts/";

import { useQuery } from "@apollo/client";
import { PRODUCTS_GET } from "../../graphql/product/query";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";

const columns = [
  { id: "code", label: "Código", align: "center", minWidth: 100 },
  {
    id: "image",
    label: "Imagen",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  { id: "name", label: "Nombre", minWidth: 130 },
  { id: "description", label: "Descripción", minWidth: 200 },
  { id: "stock", label: "Stock", minWidth: 70, align: "center" },
  { id: "brand", label: "Marca", minWidth: 100 },
  { id: "created_at", label: "Creado", minWidth: 120, align: "center" },
  { id: "updated_at", label: "Actualizado", minWidth: 120, align: "center" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    minHeight: 440,
  },
  foto: {
    width: "80px",
    height: "80px",
    borderRadius: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles(); //Styles para MUI
  const router = useRouter(); // Routing
  const [page, setPage] = useState(0); // State Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5); // State Datos por pagina

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Loading = () => (
    <Typography variant="h3" component="p">
      Loading...
    </Typography>
  );

  const { data, loading, error } = useQuery(PRODUCTS_GET);
  if (loading) {
    return "Cargando...";
  }
  if (error) {
    console.log(error.message.replace("GraphQL error: ", ""));
    setTimeout(() => {
      router.push("/error-auth");
    }, 500);
    return null;
  }
  return (
    <>
      <Head>
        <title>Dashboard - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <Typography variant="h4" component="h1" paragraph>
          Listado de Productos
        </Typography>
        {loading && Loading()}
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
                {data.getProducts
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
                          if (column.id === "image") {
                            const foto = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <img
                                  src={foto}
                                  className={classes.foto}
                                  alt="Producto"
                                />
                              </TableCell>
                            );
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value ? value : ""}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data.getProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Layout>
    </>
  );
};

export default Home;

/*
if (column.id === "image") {
                            const foto = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <img
                                  src={foto}
                                  className={classes.foto}
                                  alt="Producto"
                                />
                              </TableCell>
                            );
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value ? value : ""}
                              </TableCell>
                            );
                          }
*/
