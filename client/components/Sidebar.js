import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import { AuthContext } from '../context/auth';

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import MoneyIcon from "@material-ui/icons/Money";
import MenuIcon from "@material-ui/icons/Menu";
//import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import StoreIcon from "@material-ui/icons/Store";

const drawerWidth = 250;

const Sidebar = ({ dataUser }) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const handleDrawerOpen = () => {
    setOpen(true);
    //console.log("abierto");
  };
  const handleDrawerClose = () => {
    setOpen(false);
    //console.log("cerrado");
  };

  return (
    <nav>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        anchor="left"
        open={open}
        onMouseEnter={handleDrawerOpen}
      >
        <div className={clsx(classes.toolbar, classes.head)}>
          <div
            className={clsx(open ? classes.headLogo : classes.headLogoClose)}
          >
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
            <Typography
              variant="body1"
              component="p"
              align="center"
              className={classes.typography}
            >
              MERNAG
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              className={clsx(open ? classes.headIcon : classes.hidden)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={classes.user}>
            <div className={clsx(open ? "" : classes.hidden)}>
              <Typography align="center" className={classes.typography}>
                {user.name}
              </Typography>
              <Typography
                align="center"
                variant="caption"
                component="p"
                className={classes.typography}
              >
                {user.email}
              </Typography>
            </div>

            <Avatar
              alt="NombreUser"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              className={classes.imgUser}
              className={clsx(open ? classes.imgUser : classes.imgUserClose)}
            />
          </div>
        </div>
        <Divider />

        <Box className={classes.menu} bgcolor="#dedede">
          <List component="nav">
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}>
                <StoreIcon />
              </ListItemIcon>
              <Link href="/">
                <ListItemText primary="Dashboard" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}>
                <StoreIcon />
              </ListItemIcon>
              <Link href="/product">
                <ListItemText primary="Productos" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <Link href="/user">
                <ListItemText primary="Usuarios" />
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Sidebar;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  head: {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    height: "215px",
  },
  typography: {
    color: theme.palette.primary.contrastText,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  headLogo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "start",
    padding: theme.spacing(0.8),
  },
  headLogoClose: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "start",
    padding: theme.spacing(0.8),
  },
  headIcon: {
    margin: "0",
  },
  user: {
    marginTop: theme.spacing(3),
  },
  imgUser: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "-20px auto 0 ",
    border: "8px solid #000",
    top: "50px",
    boxSizing: "content-box",
  },
  imgUserClose: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: "-20px auto 0 ",
    border: "5px solid #000",
    top: "20px",
    boxSizing: "content-box",
  },
  hidden: {
    display: "none",
  },
  menu: {
    paddingTop: theme.spacing(7),
    backgroundColor: theme.palette.background.paper,
  },
  listItemIcon: {
    paddingLeft: theme.spacing(1),
  },
}));