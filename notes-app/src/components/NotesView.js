import React from 'react';
import { useNavigate } from "react-router-dom";
import { App } from '@capacitor/app';

import NotesTopBar from './NotesTopBar';
import NoteItem from './NoteItem';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Animate from './Animate';


const animation = {
  initial: { opacity: 1, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: 0 },
}


function NotesView(props) {
  const navigate = useNavigate();

  const onAddButtonClick = () => {
    props.dataHandler.addNote(props.sectionInView);
  }

  App.addListener('backButton', ({ d }) => {
    console.log("Back button pressed");

    props.setActiveMenu("main");
    navigate("/");
  })


  return (
    <div>
      <NotesTopBar sectionInView={props.sectionInView} />

      <Animate animation={animation}>
        {Object.keys(props.sectionNotes).map((key, index) => {
          return (
            <NoteItem key={index}
              note={props.sectionNotes[key]}
              sectionInView={props.sectionInView}
              dataHandler={props.dataHandler}
              sections={props.sections} />
          )
        })}
      </Animate>

      <Fab onClick={onAddButtonClick} size="large" color="primary" aria-label="add" sx={{ position: "fixed", bottom: 26, right: 26 }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default NotesView;