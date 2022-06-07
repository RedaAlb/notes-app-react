import React, { useState, memo, useRef } from "react"

import NoteOptionsMenu from "./NoteOptionsMenu";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { changeNoteText, changeNoteTitle } from "../../utils/notes-app-utils";
import AutoSizeTb from "../../components/AutoSizeTb";


const NOTE_PRIORITIES = {
  0: "#a3ffb0",
  1: "#f9ffa1"
}


function NoteItem(props) {
  const noteRef = useRef(props.note);

  const [showNoteText, setShowNoteText] = useState(false);
  const [notePriority, setNotePriority] = useState(props.note.notePrio);


  const onNoteTitleChange = (textboxValue) => {
    noteRef.current.noteTitle = textboxValue;
    changeNoteTitle(props.note, textboxValue);
  }


  const onNoteTextChange = (textboxValue) => {
    noteRef.current.noteText = textboxValue;
    changeNoteText(props.note, textboxValue);
  }


  return (
    <div className="note-item">
      <div className="note-content-wrapper">
        <div className="note-header" style={{ background: `${NOTE_PRIORITIES[notePriority]}` }}>

          <AutoSizeTb
            value={props.note.noteTitle}
            onTextChange={onNoteTitleChange}
            placeholder="Title"
          />

          <div className={`note-icon-right`}>
            <Stack direction="row">
              <IconButton onClick={() => setShowNoteText(!showNoteText)}>
                {showNoteText ? <KeyboardArrowUpIcon pr={0} /> : <KeyboardArrowDownIcon />}
              </IconButton>

              <NoteOptionsMenu
                note={noteRef}
                setNotePriority={setNotePriority}
                sectionInView={props.sectionInView}
              />
            </Stack>

          </div>
        </div>

        {showNoteText ?
          <AutoSizeTb
            value={props.note.noteText}
            onTextChange={onNoteTextChange}
            placeholder="Note"
          />
          : null}
      </div>
    </div>
  )
}

export default memo(NoteItem);