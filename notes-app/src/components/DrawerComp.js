import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Drawer, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NoteIcon from '@mui/icons-material/Note';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import ConfirmDialog from './ConfirmDialog';
import WarningIcon from '@mui/icons-material/Warning';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { deleteSqlDb } from '../utils/sql';


function DrawerComp(props) {
  const navigate = useNavigate();
  const [deleteAllDataDiaOpen, setDeleteAllDataDiaOpen] = useState(false);  // Dia: Dialog


  const onNotesClick = () => {
    props.setDrawerState(false);

    navigate("/");
  }


  const onPlaceholderClick = () => {
    console.log("Place holder pressed.")
  }


  const onDelAllDataConfirmed = () => {
    deleteSqlDb();
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

          <ListItem button onClick={onPlaceholderClick}>
            <ListItemIcon> <FitnessCenterIcon /> </ListItemIcon>
            <ListItemText primary={"Placeholder"} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem>
            <Typography variant="h6" noWrap component="div">Misc</Typography>
          </ListItem>

          <ListItem button>
            <ListItemIcon> <SaveIcon /> </ListItemIcon>
            <ListItemText primary={"Export"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon> <DownloadIcon /> </ListItemIcon>
            <ListItemText primary={"Import"} />
          </ListItem>

          <ListItem button onClick={() => setDeleteAllDataDiaOpen(true)}>
            <ListItemIcon> <FolderDeleteIcon /> </ListItemIcon>
            <ListItemText primary={"Delete all data"} />
          </ListItem>
        </List>

        <ConfirmDialog
          dialogOpen={deleteAllDataDiaOpen}
          setDialogOpen={setDeleteAllDataDiaOpen}
          diaTitle="Delete ALL data?"
          diaText="All data in the app will be deleted."
          diaIcon={<WarningIcon sx={{ color: "#ff0000" }} />}
          onConfirmed={onDelAllDataConfirmed}
        />
      </Box>
    </Drawer>
  )
}

export default DrawerComp;