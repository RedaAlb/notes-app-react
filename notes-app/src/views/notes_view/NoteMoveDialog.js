import React, { useContext, useEffect, useState } from 'react';

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
import { FormHelperText } from '@mui/material';

import notesContext from './context/notes-context';
import { MOVE_NOTE } from './context/notes-actions';
import { loadSections } from '../../utils/notes-app-utils';


function NoteMoveDialog(props) {
  const { dispatch } = useContext(notesContext);

  const [sections, setSections] = useState([]);
  const [sectionKeySelected, setSectionKeySelected] = useState("");
  const [error, setError] = useState(false);


  const handleClose = () => {
    props.setOpenMoveDialog(false);
  }


  const handleMaxWidthChange = (event) => {
    setSectionKeySelected(event.target.value);
  }


  const onNoteMoveClick = () => {
    if (sectionKeySelected === "" || sectionKeySelected === props.sectionInView.sectionKey) {
      setError(true);
      return;
    }
    setError(false);

    dispatch({ type: MOVE_NOTE, payload: { note: props.note, sectionKeySelected: sectionKeySelected } })
    props.setOpenMoveDialog(false);
  }


  useEffect(() => {
    if (props.openMoveDialog) {
      loadSections().then(sections => {
        setSections(sections);
      })
    }
  }, [props.openMoveDialog])


  return (
    <Dialog open={props.openMoveDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Select section to move note to:</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        <Box noValidate component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content', }}>
          <FormControl sx={{ mt: 2, minWidth: 250 }} error={error}>
            <InputLabel htmlFor="section">Sections</InputLabel>
            <Select
              value={sectionKeySelected}
              onChange={handleMaxWidthChange}
              label="sections"
              inputProps={{ name: 'section', id: 'section', }}
            >
              {sections.map((section, index) => {
                return (
                  <MenuItem key={index} value={section.sectionKey}>
                    {section.sectionName}
                  </MenuItem>
                )
              })}
            </Select>
            {error ? (<FormHelperText>No section or same section selected</FormHelperText>) : null}
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onNoteMoveClick}>Move</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NoteMoveDialog;