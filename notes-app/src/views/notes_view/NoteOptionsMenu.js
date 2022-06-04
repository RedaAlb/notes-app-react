import React, { useContext, useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';

import NoteMoveDialog from './NoteMoveDialog';
import ConfirmDialog from '../../components/ConfirmDialog';

import notesContext from './context/notes-context';
import { DELETE_NOTE } from './context/notes-actions';
import { setNotePriority } from '../../utils/notes-app-utils';


function NoteOptionsMenu(props) {
  const { dispatch } = useContext(notesContext);

  const [prioMenuAnchor, setPrioMenuAnchor] = useState(null);
  const [delNoteDialogOpen, setDelNoteDialogOpen] = useState(false);
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


  const onDelNoteConfirmed = () => {
    dispatch({ type: DELETE_NOTE, payload: props.note });
    setDelNoteDialogOpen(false);
  }


  const onPriority1Click = () => {
    setNotePriority(props.note, 0);

    props.setNote(prevNote => ({ ...prevNote, notePrio: 0 }));
    setPrioMenuAnchor(null);
  }


  const onPriority2Click = () => {
    setNotePriority(props.note, 1);

    props.setNote(prevNote => ({ ...prevNote, notePrio: 1 }));
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

        <MenuItem onClick={() => setDelNoteDialogOpen(true)}>
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

      <ConfirmDialog
        dialogOpen={delNoteDialogOpen}
        setDialogOpen={setDelNoteDialogOpen}
        diaTitle="Delete note?"
        diaText={props.note.noteTitle}
        onConfirmed={onDelNoteConfirmed}
      />

      {openMoveDialog ? (
        <NoteMoveDialog
          setOpenMoveDialog={setOpenMoveDialog}
          openMoveDialog={openMoveDialog}
          note={props.note}
          sectionInView={props.sectionInView}
        />
      ) : null}
    </>
  )
}

export default NoteOptionsMenu;