import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function NoteMoveDialog(props) {

  const [sectionSelected, setSectionSelected] = useState("");

  const handleClose = () => {
    props.setOpenMoveDialog(false);
  }

  const handleMaxWidthChange = (event) => {
    setSectionSelected(event.target.value);
  }

  const onSectionMoveClick = () => {
    props.dataHandler.moveNote(props.note, props.sectionInView.sectionKey, sectionSelected);
    props.setOpenMoveDialog(false);
  }


  return (
    <>
      <Dialog open={props.openMoveDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Select section to move note to:</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Box noValidate component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content', }}>
            <FormControl sx={{ mt: 2, minWidth: 180 }}>
              <InputLabel htmlFor="section">Sections</InputLabel>
              <Select
                value={sectionSelected}
                onChange={handleMaxWidthChange}
                label="sections"
                inputProps={{ name: 'section', id: 'section', }}
              >
                {props.sections.map((section, index) => {
                  return (
                    <MenuItem key={index} value={section.sectionKey}>
                      {section.sectionName}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onSectionMoveClick}>Move</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NoteMoveDialog;