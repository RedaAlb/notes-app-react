import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteNoteDialog from './DeleteNoteDialog';

function NoteOptionsMenu(props) {

  const [prioMenuAnchor, setPrioMenuAnchor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const noteMenuOpen = Boolean(props.noteOptionsAnchor);
  const prioMenuOpen = Boolean(prioMenuAnchor);

  const onPrioOptionsClick = (event) => {
    setPrioMenuAnchor(event.currentTarget);
  }
  const onPrioMenuClose = () => {
    setPrioMenuAnchor(null);
  }

  const onMenuClose = () => {
    props.setNoteOptionsAnchor(null);
  }

  const onMoveClick = () => {
    console.log("Move pressed");
  }

  const onDeleteClick = () => {
    setDeleteDialogOpen(true);
  }

  const onPriority1Click = () => {
    console.log("Priority 1 pressed");
  }

  const onPriority2Click = () => {
    console.log("Priority 2 pressed");
  }


  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={props.noteOptionsAnchor}
        open={noteMenuOpen}
        onClose={onMenuClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
        PaperProps={{ style: { width: 180, }, }}
      >
        <MenuItem onClick={onPrioOptionsClick}>
          <ListItemIcon><FormatLineSpacingIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Priority</ListItemText>
          <ChevronRightIcon />
        </MenuItem>

        <MenuItem onClick={onMoveClick}>
          <ListItemIcon><DriveFileMoveIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Move</ListItemText>
        </MenuItem>

        <MenuItem onClick={onDeleteClick}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={prioMenuAnchor}
        open={prioMenuOpen}
        onClose={onPrioMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        PaperProps={{ style: { width: 180, }, }}
      >
        <MenuItem onClick={onPriority1Click}>
          <ListItemIcon><CircleIcon fontSize="small" sx={{ color: "#3ad83a" }} /></ListItemIcon>
          <ListItemText>Priority 1</ListItemText>
        </MenuItem>

        <MenuItem onClick={onPriority2Click}>
          <ListItemIcon><CircleIcon fontSize="small" sx={{ color: "#ffcc23" }} /></ListItemIcon>
          <ListItemText>Priority 2</ListItemText>
        </MenuItem>
      </Menu>

      <DeleteNoteDialog
        note={props.note}
        deleteNote={props.deleteNote}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
      />

    </>
  )
}

export default NoteOptionsMenu;