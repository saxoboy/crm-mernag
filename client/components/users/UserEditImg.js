import React from "react";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Box, Button } from "@material-ui/core";

const UserEditImg = () => {
  const classes = useStyles(); //Styles para MUI
  return (
    <>
      <Typography
        paragraph
        className={classes.titleTex}
        component="h3"
        variant="h5"
        color="initial"
        paragraph
      >
        Editar o Subir Imagen de Perfil
      </Typography>
    </>
  );
};

export default UserEditImg;

const useStyles = makeStyles((theme) => ({
  titleTex: {
    flexGrow: 1,
  },
}));
