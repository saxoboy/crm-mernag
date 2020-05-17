import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger"; //responder a las acciones de desplazamiento del usuario.
import Slide from "@material-ui/core/Slide";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Divider from "@material-ui/core/Divider";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  root: {
    paddingLeft: "0",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "32px",
    },
    color: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBar: {
    padding: 0,
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 16,
  },
  menuButtonHidden: {
    display: "none",
  },
  typography: {
    color: theme.palette.primary.contrastText,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const router = useRouter(); // Routing

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <HideOnScroll {...props}>
      <AppBar position="absolute" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title} color="inherit">
            Nombre Page
          </Typography>
          <Typography color="inherit">
            Hola {props.dataUser.name} (
            <Typography component="span" variant="caption" color="inherit">
              {props.dataUser.username}
            </Typography>
            )
          </Typography>
          <Divider
            variant="middle"
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <IconButton
            color="inherit"
            aria-label="cerrar sesión"
            onClick={() => logout()}
          >
            <ExitToAppIcon />
          </IconButton>
          <Divider variant="middle" orientation="vertical" flexItem />
          <IconButton color="inherit" aria-label="estado">
            <FormatListBulletedIcon />
          </IconButton>
          <Divider variant="middle" orientation="vertical" flexItem />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default Navbar;
