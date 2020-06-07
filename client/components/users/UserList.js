import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
moment.locale("es");

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, IconButton, CardMedia } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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

const UserList = ({ userData }) => {
  const classes = useStyles(); //Styles para MUI
  const router = useRouter(); // routing
  const editUser = (id) => {
    router.push({
      pathname: "/user/edit/[id]",
      query: { id },
    });
  };
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={userData.id}>
      {columns.map((column) => {
        const value = userData[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.id === "photo" && (
              <CardMedia
                className={classes.media}
                image={value}
                title="imagen"
                alt="user"
                component="div"
              />
            )}
            {column.id !== "updated_at" &&
              column.id !== "created_at" &&
              column.id !== "actions" &&
              column.id !== "photo" &&
              value}
            {column.id === "created_at" && moment(value).fromNow()}
            {column.id === "updated_at" && moment(value).fromNow()}
            {column.id === "actions" && (
              <>
                <IconButton
                  aria-label="editar"
                  className={classes.margin}
                  onClick={() => editUser(userData.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default UserList;

const useStyles = makeStyles((theme) => ({
  margin: {
    textAlign: "center",
  },
  media: {
    width: "110px",
    height: 0,
    paddingTop: "110px",
    borderRadius: theme.spacing(1),
  },
}));