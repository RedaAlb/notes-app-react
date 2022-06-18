import React, { useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { App } from '@capacitor/app';
import { useSpring } from 'react-spring'

import NotesTopBar from './NotesTopBar';
import NoteItem from './NoteItem';

import AddIcon from '@mui/icons-material/Add';

import FloatingButton from '../../components/FloatingButton';

import notesReducer from './context/notes-reducer';
import NotesContext from "./context/notes-context";
import { ADD_NOTE, LOAD_NOTES } from './context/notes-actions';

import { addNote, loadSectionNotes } from '../../utils/notes-app-utils';
import { NOTES_ANIM } from '../../utils/constants';
import Animate from '../../components/Animate';


const initialState = {
  sectionNotes: []
}


function NotesView(props) {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const navigate = useNavigate();
  const sectionInView = useLocation().state;

  const animation = useSpring(NOTES_ANIM);


  const onAddButtonClick = () => {
    addNote(sectionInView).then(newNote => {
      dispatch({ type: ADD_NOTE, payload: newNote });
    })
  }


  // For phone back button.
  App.addListener('backButton', ({ d }) => {
    navigate("/");
  })


  useEffect(() => {
    loadSectionNotes(sectionInView).then(sectionNotes => {
      dispatch({ type: LOAD_NOTES, payload: sectionNotes });
    })
  }, [sectionInView])


  return (
    <>
      <NotesContext.Provider value={{ dispatch: dispatch }}>
        <NotesTopBar />

        <Animate animation={animation}>
          {state.sectionNotes.map((note, index) => {
            return (
              <NoteItem
                key={note.noteKey}
                note={note}
              />
            )
          })}
        </Animate>
      </NotesContext.Provider>


      <FloatingButton
        onClickHandler={onAddButtonClick}
        icon={<AddIcon />}
      />
    </>
  )
}

export default NotesView;