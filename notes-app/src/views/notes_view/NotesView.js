import React, { useEffect, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import { App } from '@capacitor/app';

import NotesTopBar from './NotesTopBar';
import NoteItem from './NoteItem';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Animate from '../../components/Animate';

import notesReducer from './context/notes-reducer';
import NotesContext from "./context/notes-context";
import { addNote, loadSectionNotes } from '../../utils/notes-app-utils';
import { ADD_NOTE, LOAD_NOTES } from './context/notes-actions';

import { NOTES_ANIM } from '../../utils/constants';


const initialState = {
  sectionNotes: []
}


function NotesView(props) {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const navigate = useNavigate();


  const onAddButtonClick = () => {
    addNote(props.sectionInView).then(newNote => {
      dispatch({ type: ADD_NOTE, payload: newNote });
    })
  }


  // For phone back button.
  App.addListener('backButton', ({ d }) => {
    navigate("/");
  })


  useEffect(() => {
    loadSectionNotes(props.sectionInView).then(sectionNotes => {
      dispatch({ type: LOAD_NOTES, payload: sectionNotes });
    })
  }, [props.sectionInView])


  return (
    <div className="notes-view">
      <NotesTopBar sectionInView={props.sectionInView} toggleDrawer={props.toggleDrawer} />

      <Animate animation={NOTES_ANIM}>
        <NotesContext.Provider value={{ dispatch: dispatch }}>
          {state.sectionNotes.map((note, index) => {
            return (
              <NoteItem key={note.noteKey}
                note={note}
                sectionInView={props.sectionInView}
              />
            )
          })}
        </NotesContext.Provider>
      </Animate>

      <Fab
        onClick={onAddButtonClick}
        size="large" color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 26, right: 26 }}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}

export default NotesView;