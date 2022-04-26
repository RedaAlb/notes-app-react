import React, { useEffect, useState } from "react"
import { ref, update } from "firebase/database";

import TextareaAutosize from 'react-textarea-autosize';
import NoteOptionsMenu from "./NoteOptionsMenu";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import db from "../Firebase";

function NoteItem(props) {
  const [note, setNote] = useState(props.note);
  const [noteOptionsAnchor, setNoteOptionsAnchor] = useState(null);


  const onNoteOptionsClick = (event) => {
    setNoteOptionsAnchor(event.currentTarget);
  }

  const noteTitleChangeHandler = evt => {
    const newNote = { ...note };
    newNote.noteTitle = evt.target.value;
    setNote(newNote);

    const updates = {};
    updates[props.sectionInView.sectionKey + "/" + note.noteKey + "/noteTitle"] = evt.target.value;
    update(ref(db), updates);
  }

  useEffect(() => {
    setNote(props.note);
  }, [props.note])


  return (
    <div className="note-item">
      <div className="note-content-wrapper">
        <div className="note-header">
          {props.leftIcon ? (
            <div className="note-top">
              <span className="note-button">{props.leftIcon}</span>
            </div>
          ) : null}
          <TextareaAutosize
            cacheMeasurements
            value={note.noteTitle}
            onChange={noteTitleChangeHandler}
            placeholder="Title"
            className={`note-title-textarea prio-${note.notePrio}`}
          />
          <div className={`note-icon-right prio-${note.notePrio}`}>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={onNoteOptionsClick}> <MoreVertIcon /> </IconButton>
            </Stack>

            <NoteOptionsMenu
              note={note}
              deleteNote={props.deleteNote}
              moveNote={props.moveNote}
              setNotePriority={props.setNotePriority}
              sections={props.sections}
              noteOptionsAnchor={noteOptionsAnchor}
              setNoteOptionsAnchor={setNoteOptionsAnchor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteItem;