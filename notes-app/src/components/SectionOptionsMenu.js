import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSectionDialog from './DeleteSectionDialog';


function SectionOptionsMenu(props) {

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const sectionMenuOpen = Boolean(props.sectionOptionsAnchor);


  const onMenuClose = () => {
    props.setSectionOptionsAnchor(null);
  }


  const onDeleteClick = () => {
    setDeleteDialogOpen(true);
  }


  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={props.sectionOptionsAnchor}
        open={sectionMenuOpen}
        onClose={onMenuClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
        PaperProps={{ style: { width: 180, }, }}
      >
        <MenuItem onClick={onDeleteClick}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <DeleteSectionDialog
        section={props.section}
        dataHandler={props.dataHandler}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
    </>
  )
}

export default SectionOptionsMenu;