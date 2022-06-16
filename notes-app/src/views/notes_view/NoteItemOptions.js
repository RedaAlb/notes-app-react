import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';

import OptionsMenu from '../../components/OptionsMenu';
import ConfirmDialog from '../../components/ConfirmDialog';
import NoteMoveDialog from './NoteMoveDialog';

import notesContext from './context/notes-context';
import { DELETE_NOTE, LOAD_NOTES } from './context/notes-actions';
import { loadSectionNotes, setNotePriority } from '../../utils/notes-app-utils';

import { NOTE_PRIO_ICON_COLS } from '../../utils/constants';



function NoteItemOptions(props) {
  const { dispatch } = useContext(notesContext);
  const sectionInView = useLocation().state;

  const [menuAnchor, setMenuAnchor] = useState(null);

  const [prioMenuAnchor, setPrioMenuAnchor] = useState(null);
  const prioMenuOpen = Boolean(prioMenuAnchor);

  const [delNoteDialogOpen, setDelNoteDialogOpen] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);


  const onDelNoteConfirmed = () => {
    dispatch({ type: DELETE_NOTE, payload: props.note.current });
  }


  const onPriorityClick = async (priority) => {
    if (priority === props.note.current.notePrio) return;

    await setNotePriority(props.note.current, priority);

    // Re-load section notes to get the correct order again.
    loadSectionNotes(sectionInView).then(sectionNotes => {
      dispatch({ type: LOAD_NOTES, payload: sectionNotes });
    })

    props.setNotePriority(priority);

    setPrioMenuAnchor(null);
    setMenuAnchor(null);
  }


  return (
    <>
      <OptionsMenu
        id="note-options-menu"
        btnContent={<MoreVertIcon />}
        minWidth={180}
        menuAnchor={menuAnchor}
        setMenuAnchor={setMenuAnchor}
      >
        <MenuItem onClick={(e) => setPrioMenuAnchor(e.currentTarget)}>
          <ListItemIcon><FormatLineSpacingIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Priority</ListItemText>
          <ChevronRightIcon />
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => setOpenMoveDialog(true)}>
          <ListItemIcon><DriveFileMoveIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Move</ListItemText>
        </MenuItem>

        <NoteMoveDialog
          note={props.note.current}
          setOpenMoveDialog={setOpenMoveDialog}
          openMoveDialog={openMoveDialog}
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
      </OptionsMenu>

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

export default NoteItemOptions;