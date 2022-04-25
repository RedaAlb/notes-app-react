import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteNoteDialog(props) {

  const onDelDialogClose = () => {
    props.setDeleteDialogOpen(false);
  }

  const deleteNote = () => {
    props.deleteNote(props.note.noteKey);
    props.setDeleteDialogOpen(false);
  }


  return (
    <Dialog
      open={props.deleteDialogOpen}
      onClose={onDelDialogClose}
    >
      <DialogTitle>
        {"Delete note?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{props.note.noteTitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteNote}>Yes</Button>
        <Button onClick={onDelDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteNoteDialog;