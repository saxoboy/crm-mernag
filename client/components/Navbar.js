import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Hidden,
  useScrollTrigger,
  IconButton,
  Slide,
  Divider,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import MoneyIcon from "@material-ui/icons/Money";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const drawerWidth = 250;

const Navbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  return (
    <HideOnScroll {...props}>
      <AppBar position="absolute" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="estado"
              onClick={onSidebarOpen}
            >
              <MenuIcon />
            </IconButton>
            <Divider variant="middle" orientation="vertical" flexItem />
          </Hidden>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="link logo"
            onClick={() => {
              router.push("/");
            }}
            className={classes.headIcon}
          >
            <MoneyIcon className={classes.headIcon} />
          </IconButton>
          <Typography variant="h6" className={classes.title} color="inherit">
            MERNAG
          </Typography>
          <Hidden xsDown>
            <Typography color="inherit">
              Hola {user.name} {""}
              <Hidden smDown>
                <Typography component="span" variant="caption" color="inherit">
                  ({""}
                  {user.username}
                  {""})
                </Typography>
              </Hidden>
            </Typography>
          </Hidden>
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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "0",
    [theme.breakpoints.up("md")]: {
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
    [theme.breakpoints.up("xs")]: {
      padding: theme.spacing(0, 2, 0, 2),
    },
  },
  headIcon: {
    margin: "0",
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
