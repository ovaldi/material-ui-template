import useLogout from "./useLogout";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Icon } from "@material-ui/core";
import {
  Fade,
  List,
  Menu,
  Drawer,
  Divider,
  MenuItem,
  ListItem,
  makeStyles,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    color: "rgba(255, 255, 255, 0.7)",
    backgroundSize: "contain",
    backgroundColor: "#051e34",
    backgroundImage: `url(${require("images/sidebar.png")})`
  },
  active: {
    color: "#669df6"
  },
  inactive: {
    color: "rgba(255, 255, 255, 0.7)"
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  toolbar: {
    minHeight: 64,
    paddingLeft: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
  },
  setting: {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

export const Sidebar: FC = () => {
  const logout = useLogout();
  const classes = useStyles();
  const history = useHistory();
  const [anchor, setAnchor] = useState<Element | null>(null);
  const ui = useSelector<StoreReducer, UIReducer>(state => state.ui);
  const fn = (sidebar: string) =>
    ui.sidebar === sidebar ? classes.active : classes.inactive;

  return (
    <Drawer
      open
      anchor="left"
      variant="permanent"
      classes={{
        root: classes.drawer,
        paper: classes.drawer
      }}
    >
      <div className={classes.toolbar}>
        <Typography variant="h5">DaisNotes</Typography>
        <IconButton className={classes.setting} onClick={event => setAnchor(event.currentTarget)}><Icon>settings</Icon></IconButton>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
      <Divider classes={{ root: classes.divider }} />
      <List>
        <ListItem button onClick={() => history.push("/schools")}>
          <ListItemIcon classes={{ root: fn("school") }}>
            <Icon>school</Icon>
          </ListItemIcon>
          <ListItemText classes={{ root: fn("school") }}>School</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/classes")}>
          <ListItemIcon classes={{ root: fn("class") }}>
            <Icon>business</Icon>
          </ListItemIcon>
          <ListItemText classes={{ root: fn("class") }}>Class</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push("/users")}>
          <ListItemIcon classes={{ root: fn("user") }}>
            <Icon>people</Icon>
          </ListItemIcon>
          <ListItemText classes={{ root: fn("user") }}>User</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
