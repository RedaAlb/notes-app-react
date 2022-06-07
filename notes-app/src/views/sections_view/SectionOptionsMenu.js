import React, { useState, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from "@mui/material";

import ConfirmDialog from '../../components/ConfirmDialog';

import sectionsContext from './context/sections-context';
import { DELETE_SECTION } from './context/sections-actions';


function SectionOptionsMenu(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);


  const { dispatch } = useContext(sectionsContext);

  const [delSectionDiaOpen, setDelSectionDiaOpen] = useState(false);


  const onDelSectionConfirmed = () => {
    dispatch({ type: DELETE_SECTION, payload: props.section.current });
  }


  return (
    <>
      <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}> <MoreVertIcon style={{ color: "black" }} /> </IconButton>

      <Menu
        id="section-options-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
        PaperProps={{ style: { minWidth: 180, }, }}
      >
        <MenuItem disabled={true}>{props.section.current.sectionName}</MenuItem>

        <MenuItem onClick={() => setDelSectionDiaOpen(true)}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <ConfirmDialog
          dialogOpen={delSectionDiaOpen}
          setDialogOpen={setDelSectionDiaOpen}
          diaTitle={`Delete (${props.section.current.sectionName}) section?`}
          diaText="All section notes will be deleted."
          onConfirmed={onDelSectionConfirmed}
        />
      </Menu>
    </>
  )
}

export default SectionOptionsMenu;