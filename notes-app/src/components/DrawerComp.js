import React from 'react';
import { useNavigate } from "react-router-dom";

import { Drawer, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NoteIcon from '@mui/icons-material/Note';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';


function DrawerComp(props) {
  const navigate = useNavigate();


  const onNotesClick = () => {
    props.setDrawerState(false);

    navigate("/");
  }


  const onGymWeightsClick = () => {
    navigate("/gymweights");
  }


  const onSettingsClick = () => {
    navigate("/settings");
  }


  return (
    <Drawer anchor={"left"} open={props.drawerState} onClose={() => props.setDrawerState(false)}>
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

          <ListItem button onClick={onGymWeightsClick}>
            <ListItemIcon> <FitnessCenterIcon /> </ListItemIcon>
            <ListItemText primary={"Gym weights"} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem>
            <Typography variant="h6" noWrap component="div">App</Typography>
          </ListItem>

          <ListItem button onClick={onSettingsClick}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default DrawerComp;