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
import NoteMoveDialog from './NoteMoveDialog';


function NoteOptionsMenu(props) {

  const [prioMenuAnchor, setPrioMenuAnchor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
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
    setOpenMoveDialog(true);
  }

  const onDeleteClick = () => {
    setDeleteDialogOpen(true);
  }

  const onPriority1Click = () => {
    props.dataHandler.setNotePriority(props.note.noteKey, 0);

    props.setNote(prevNote => ({
      ...prevNote,
      notePrio: 0
    }));
    setPrioMenuAnchor(null);
  }

  const onPriority2Click = () => {
    props.dataHandler.setNotePriority(props.note.noteKey, 1);

    props.setNote(prevNote => ({
      ...prevNote,
      notePrio: 1
    }));
    setPrioMenuAnchor(null);
  }


  return (
    <>
      <Menu
        id="note-options-menu"
        anchorEl={props.noteOptionsAnchor}
        open={noteMenuOpen}
        onClose={onMenuClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
        PaperProps={{ style: { minWidth: 180, }, }}
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
        dataHandler={props.dataHandler}
        sectionInView={props.sectionInView}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
      />

      <NoteMoveDialog
        setOpenMoveDialog={setOpenMoveDialog}
        openMoveDialog={openMoveDialog}
        sections={props.sections}
        note={props.note}
        dataHandler={props.dataHandler}
        sectionInView={props.sectionInView}
      />
    </>
  )
}

export default NoteOptionsMenu;