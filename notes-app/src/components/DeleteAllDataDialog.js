import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';

function DeleteAllDataDialog(props) {

  const onDelDialogClose = () => {
    props.setDeleteAllDataDiaOpen(false);
  }


  const deleteSection = () => {
    props.dataHandler.deleteSqlDb();
    props.setDeleteAllDataDiaOpen(false);
  }


  return (
    <Dialog
      open={props.deleteAllDataDiaOpen}
      onClose={onDelDialogClose}
    >
      <DialogTitle>
        {"Delete ALL data?"}
      </DialogTitle>

      <DialogContent>
        <WarningIcon sx={{ color: "#ff0000" }} />
        <DialogContentText>All sections and all notes will be deleted.</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={deleteSection}>Yes</Button>
        <Button onClick={onDelDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAllDataDialog;