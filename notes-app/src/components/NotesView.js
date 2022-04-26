import React from 'react';
import NotesTopBar from './NotesTopBar';
import NoteItem from './NoteItem';

import { ref, push, set } from "firebase/database";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import db from '../Firebase';

function NotesView(props) {

  const onAddButtonClick = () => {
    const newNoteKey = push(ref(db)).key;

    const newNote = {
      noteKey: newNoteKey,
      noteTitle: "",
      noteText: "",
      notePrio: 0,
    }

    set(ref(db, `/${props.sectionInView.sectionKey}/${newNoteKey}/`), newNote);

    const newSectionNotes = { ...props.sectionNotes };
    newSectionNotes[newNoteKey] = newNote;
    props.setSectionNotes(newSectionNotes);

    // Adding one to the section count.
    props.changeSectionCount(props.sectionInView.sectionKey, 1);

    console.log("Note added");
  }

  return (
    <div>
      <NotesTopBar sectionInView={props.sectionInView} />

      {Object.keys(props.sectionNotes).map((key, index) => {
        return (
          <NoteItem key={index}
            note={props.sectionNotes[key]}
            sectionInView={props.sectionInView}
            deleteNote={props.deleteNote}
            moveNote={props.moveNote}
            setNotePriority={props.setNotePriority}
            sections={props.sections}
            setActiveMenu={props.setActiveMenu} />
        )
      })}

      <Fab onClick={onAddButtonClick} size="large" color="primary" aria-label="add" sx={{ position: "absolute", bottom: 26, right: 26 }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default NotesView;