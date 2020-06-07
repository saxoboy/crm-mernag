import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardContent,
  Fab,
  CardMedia,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";

/*APOLLO*/
import { useQuery, useMutation } from "@apollo/client";
import { USER_GET } from "../../graphql/user/query";
import { USER_INFO_UPDATE } from "../../graphql/user/mutation";

const UserEditImg = () => {
  const classes = useStyles(); //Styles para MUI
  const [image, setImage] = useState(""); //state de imagen
  const [mensaje, setMensaje] = useState(null); // State para el mensaje
  const [submitting, setSubmitting] = useState(false);
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
  const { name, username, email, photo } = data.getUser;
  
  // Actualizar imagen del cliente
  const [updateInfoUser] = useMutation(USER_INFO_UPDATE);

  // funcion para subir imagen a Cloudinary
  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mernag");
    data.append("cloud_name", "delizacakeart");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/delizacakeart/image/upload",
      data
    );
    return res.data.url;
  };

  // descartar imagen
  const handleDeleteDraft = async () => {
    setImage("");
    router.push("/user");
  };

  // subir la imagen
  const handleSubmit = async (event) => {  
    try {
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const photo = { image: url };
      const { data } = await updateInfoUser({
        variables: {
          id,
          input: {
            name,
            username,
            email,
            photo : photo.image
          },
        },
      });
      const { ok, message } = data.updateInfoUser;
      if (ok) {
        setMensaje(message);
        setTimeout(() => {
          setMensaje(null);
          handleDeleteDraft();  
          //router.push("/user");
        }, 3000);
      } else {
        setMensaje(message.replace("User validation failed: ", ""));
        setTimeout(() => {
          setMensaje(null);
          handleDeleteDraft();
        }, 2000);
      }
    } catch (errors) {
      setSubmitting(false);
      console.error("Error en subir imagen", errors);
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  if (loading) return "Cargando...";
  if (error) {
    setTimeout(() => {
      router.push("/error-auth");
    }, 100);
    return null;
  }
  const mostrarMensaje = () => {
    return (
      <Alert variant="filled" severity="info">
        {mensaje}
      </Alert>
    );
  };

  return (
    <>
      {mensaje && mostrarMensaje()}
      <form className={classes.form}>
        <CardContent>
          <CardMedia
            className={classes.media}
            image={photo}
            title={name}
            alt={name}
            component="div"
          />
          <div style={{textAlign: "center"}}>
          <input
            accept="image/*"
            id="image"
            type="file"
            className={classes.input}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <Button
              style={{ color: image && "green" }}
              component="span"
              size="large"
              className={classes.button}
            >
              <AddAPhotoIcon className={classes.leftIcon} /> Upload photo
            </Button>
          </label>
          </div>
          <div>
            <Button
              onClick={handleDeleteDraft}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <ClearIcon className={classes.leftIcon} />
              Discard
            </Button>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="secondary"
              disabled={!image || submitting}
              onClick={handleSubmit}
            >
              Submit
              <SaveIcon className={classes.rightIcon} />
            </Button>
          </div>
        </CardContent>
      </form>
    </>
  );
};

export default UserEditImg;

const useStyles = makeStyles((theme) => ({
  titleTex: {
    flexGrow: 1,
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(1),
  },
  media: {
    width: "200px",
    height: 0,
    paddingTop: "200px",
    borderRadius: theme.spacing(1),
    margin: "auto",
  },
  input: {
    display: "none",
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2, 2, 0, 2),
  },
}));
