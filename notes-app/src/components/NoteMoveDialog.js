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

import { ref, set, remove } from "firebase/database";

import db from '../Firebase';

function NoteMoveDialog(props) {


  const [sectionSelected, setSectionSelected] = useState("");

  const handleClose = () => {
    props.setOpen(false);
  }

  const handleMaxWidthChange = (event) => {
    setSectionSelected(event.target.value);
  }

  const onSectionMoveClick = () => {
    if (sectionSelected !== "" && sectionSelected !== props.sectionKeyInView) {
      const noteToMove = props.sectionNotes[props.noteKey];
      // Add to new section then delete from current section.
      set(ref(db, `/${sectionSelected}/${props.noteKey}`), noteToMove);

      const noteToDelRef = ref(db, `/${props.sectionKeyInView}/${props.noteKey}`);
      remove(noteToDelRef);

      const newSectionNotes = { ...props.sectionNotes };
      delete newSectionNotes[props.noteKey];
      props.setSectionNotes(newSectionNotes);
    }
  }


  return (
    <>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Select section to move note to:</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Box noValidate component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content', }}>
            <FormControl sx={{ mt: 2, minWidth: 180 }}>
              <InputLabel htmlFor="section">Sections</InputLabel>
              <Select value={sectionSelected} onChange={handleMaxWidthChange} label="sections" inputProps={{ name: 'section', id: 'section', }}>

                {Object.keys(props.sections).map((key, index) => {
                  return (
                    <MenuItem key={index}
                      value={props.sections[key].sectionKey}
                    >{props.sections[key].sectionName}</MenuItem>
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