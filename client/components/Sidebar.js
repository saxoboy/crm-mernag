import React, { useContext } from "react";
import Link from "next/link";
import clsx from "clsx";

import { AuthContext } from "../context/auth";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import PeopleIcon from "@material-ui/icons/People";
import StoreIcon from "@material-ui/icons/Store";

const drawerWidth = 225;

const Sidebar = ({ open, variant, onClose, className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div {...rest} className={clsx(classes.root, className)}>
          <div className={classes.user}>
            <div>
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
              alt={user.name}
              src={user.photo}
              className={classes.imgUser}
            />
          </div>
        </div>
        <Box className={classes.menu}>
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
        <Divider className={classes.divider} />
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
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  menu: {
    paddingTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
  user: {
    paddingTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
    height: "140px",
  },
  imgUser: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "-20px auto 0 ",
    border: "8px solid #000",
    top: "50px",
    boxSizing: "content-box",
  },
  typography: {
    color: theme.palette.primary.contrastText,
  },
  listItemIcon: {
    paddingLeft: theme.spacing(1),
  },
}));
