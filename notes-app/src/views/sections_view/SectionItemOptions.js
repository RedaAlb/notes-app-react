import React, { useState, useContext } from 'react';

import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import OptionsMenu from '../../components/OptionsMenu';
import ConfirmDialog from '../../components/ConfirmDialog';

import sectionsContext from './context/sections-context';
import { DELETE_SECTION } from './context/sections-actions';


function SectionItemOptions(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { dispatch } = useContext(sectionsContext);

  const [delSectionDiaOpen, setDelSectionDiaOpen] = useState(false);


  const onDelSectionConfirmed = () => {
    dispatch({ type: DELETE_SECTION, payload: props.section.current });
  }


  return (
    <OptionsMenu
      id="section-options-menu"
      btnContent={<MoreVertIcon style={{ color: "black" }} />}
      minWidth={180}
      menuAnchor={menuAnchor}
      setMenuAnchor={setMenuAnchor}
    >

      <MenuItem disabled>{props.section.current.sectionName}</MenuItem>

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
    </OptionsMenu>
  )
}

export default SectionItemOptions;