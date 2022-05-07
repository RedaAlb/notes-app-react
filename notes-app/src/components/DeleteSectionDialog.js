import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteSectionDialog(props) {

  const onDelDialogClose = () => {
    props.setDeleteDialogOpen(false);
  }


  const deleteSection = () => {
    props.dataHandler.deleteSection(props.section.sectionKey);
    props.setDeleteDialogOpen(false);
  }


  return (
    <Dialog
      open={props.deleteDialogOpen}
      onClose={onDelDialogClose}
    >
      <DialogTitle>
        {`Delete (${props.section.sectionName}) section?`}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>All section notes will be deleted.</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={deleteSection}>Yes</Button>
        <Button onClick={onDelDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteSectionDialog;