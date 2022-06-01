import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './ConfirmDialog';


function SectionOptionsMenu(props) {
  const [delSectionDiaOpen, setDelSectionDiaOpen] = useState(false);

  const sectionMenuOpen = Boolean(props.sectionOptionsAnchor);


  const onMenuClose = () => {
    props.setSectionOptionsAnchor(null);
  }


  const onDelSectionConfirmed = () => {
    props.dataHandler.deleteSection(props.section.sectionKey);
    setDelSectionDiaOpen(false);
  }


  return (
    <>
      <Menu
        id="section-options-menu"
        anchorEl={props.sectionOptionsAnchor}
        open={sectionMenuOpen}
        onClose={onMenuClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
        PaperProps={{ style: { minWidth: 180, }, }}
      >
        <MenuItem disabled={true}>{props.section.sectionName}</MenuItem>

        <MenuItem onClick={() => setDelSectionDiaOpen(true)}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        dialogOpen={delSectionDiaOpen}
        setDialogOpen={setDelSectionDiaOpen}
        diaTitle={`Delete (${props.section.sectionName}) section?`}
        diaText="All section notes will be deleted."
        onConfirmed={onDelSectionConfirmed}
      />
    </>
  )
}

export default SectionOptionsMenu;