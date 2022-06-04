import React, { useEffect, useState } from "react"

import TextareaAutosize from 'react-textarea-autosize';
import NoteOptionsMenu from "./NoteOptionsMenu";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function NoteItem(props) {
  const [note, setNote] = useState(props.note);
  const [noteOptionsAnchor, setNoteOptionsAnchor] = useState(null);
  const [showNoteText, setShowNoteText] = useState(false);


  const onNoteOptionsClick = (event) => {
    setNoteOptionsAnchor(event.currentTarget);
  }


  const noteTitleChangeHandler = (event) => {
    const tVal = event.target.value;

    setNote(prevNote => ({
      ...prevNote,
      noteTitle: tVal
    }));

    props.dataHandler.changeNoteTitle(note.noteKey, tVal);
  }


  const noteTextChangeHandler = (event) => {
    const tVal = event.target.value;

    setNote(prevNote => ({
      ...prevNote,
      noteText: tVal
    }));

    props.dataHandler.changeNoteText(note.noteKey, tVal);
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
            <Stack direction="row">
              <IconButton onClick={() => setShowNoteText(!showNoteText)}>
                {showNoteText ? <KeyboardArrowUpIcon pr={0} /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <IconButton onClick={onNoteOptionsClick}> <MoreVertIcon /> </IconButton>
            </Stack>

            <NoteOptionsMenu
              note={note}
              setNote={setNote}
              dataHandler={props.dataHandler}
              sectionInView={props.sectionInView}
              noteOptionsAnchor={noteOptionsAnchor}
              setNoteOptionsAnchor={setNoteOptionsAnchor}
            />
          </div>
        </div>

        {showNoteText ?
          <TextareaAutosize
            cacheMeasurements
            value={note.noteText}
            onChange={noteTextChangeHandler}
            placeholder="Note"
            className="note-text-textarea"
          />
          : null}
      </div>
    </div>
  )
}

export default NoteItem;