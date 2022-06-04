import React from 'react';
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NoteIcon from '@mui/icons-material/Note';
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Drawer, Typography } from "@mui/material";


function DrawerComp(props) {
  const navigate = useNavigate();


  const onNotesClick = () => {
    props.toggleDrawer("left", false);

    navigate("/");
  }


  const onPlaceholderClick = () => {
    console.log("Place holder pressed.")
  }


  return (
    <React.Fragment>
      <Drawer anchor={"left"} open={props.drawerState["left"]} onClose={props.toggleDrawer("left", false)}>
        <Box sx={{ width: "left" === "top" || "left" === "bottom" ? "auto" : 250 }} role="presentation">

          <List>
            <ListItem>
              <Typography variant="h6" noWrap component="div">Main</Typography>
            </ListItem>

            <ListItem button onClick={onNotesClick}>
              <ListItemIcon> <NoteIcon /> </ListItemIcon>
              <ListItemText primary={"Notes"} />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem>
              <Typography variant="h6" noWrap component="div">Extensions</Typography>
            </ListItem>

            <ListItem button onClick={onPlaceholderClick}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText primary={"Placeholder"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}

export default DrawerComp;