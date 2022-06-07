import React, { useContext, useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import NoteMoveDialog from './NoteMoveDialog';
import ConfirmDialog from '../../components/ConfirmDialog';

import notesContext from './context/notes-context';
import { DELETE_NOTE } from './context/notes-actions';
import { setNotePriority } from '../../utils/notes-app-utils';

import { NOTE_PRIO_ICON_COLS } from '../../utils/constants';


function NoteOptionsMenu(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);


  const { dispatch } = useContext(notesContext);

  const [prioMenuAnchor, setPrioMenuAnchor] = useState(null);
  const prioMenuOpen = Boolean(prioMenuAnchor);

  const [delNoteDialogOpen, setDelNoteDialogOpen] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);


  const onDelNoteConfirmed = () => {
    dispatch({ type: DELETE_NOTE, payload: props.note.current });
  }


  const onPriorityClick = (priority) => {
    setNotePriority(props.note.current, priority);

    props.setNotePriority(priority);
    setPrioMenuAnchor(null);
    setMenuAnchor(null);
  }


  return (
    <>
      <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}> <MoreVertIcon /> </IconButton>

      <Menu
        id="note-options-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
        PaperProps={{ style: { minWidth: 180, }, }}
      >
        <MenuItem onClick={(e) => setPrioMenuAnchor(e.currentTarget)}>
          <ListItemIcon><FormatLineSpacingIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Priority</ListItemText>
          <ChevronRightIcon />
        </MenuItem>

        <MenuItem onClick={() => setOpenMoveDialog(true)}>
          <ListItemIcon><DriveFileMoveIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Move</ListItemText>
        </MenuItem>

        <NoteMoveDialog
          note={props.note.current}
          setOpenMoveDialog={setOpenMoveDialog}
          openMoveDialog={openMoveDialog}
          sectionInView={props.sectionInView}
        />


        <MenuItem onClick={() => setDelNoteDialogOpen(true)}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <ConfirmDialog
          dialogOpen={delNoteDialogOpen}
          setDialogOpen={setDelNoteDialogOpen}
          diaTitle="Delete note?"
          diaText={props.note.current.noteTitle}
          onConfirmed={onDelNoteConfirmed}
        />
      </Menu>

      <Menu
        id="note-priority-options"
        anchorEl={prioMenuAnchor}
        open={prioMenuOpen}
        onClose={() => setPrioMenuAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        PaperProps={{ style: { width: 180, }, }}
      >
        <MenuItem onClick={() => onPriorityClick(0)}>
          <ListItemIcon><CircleIcon fontSize="small" sx={{ color: NOTE_PRIO_ICON_COLS[0] }} /></ListItemIcon>
          <ListItemText>Priority 1</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => onPriorityClick(1)}>
          <ListItemIcon><CircleIcon fontSize="small" sx={{ color: NOTE_PRIO_ICON_COLS[1] }} /></ListItemIcon>
          <ListItemText>Priority 2</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default NoteOptionsMenu;