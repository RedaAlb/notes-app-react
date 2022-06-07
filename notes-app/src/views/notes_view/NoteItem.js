import React, { useState, memo, useRef } from "react"

import NoteOptionsMenu from "./NoteOptionsMenu";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { changeNoteText, changeNoteTitle } from "../../utils/notes-app-utils";
import AutoSizeTb from "../../components/AutoSizeTb";

import { NOTE_PRIO_BG_COLS } from "../../utils/constants";


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
    <div className="note-item-wrapper">
      <div className="note-item" style={{ background: `${NOTE_PRIO_BG_COLS[notePriority]}` }}>

        <AutoSizeTb
          value={props.note.noteTitle}
          onTextChange={onNoteTitleChange}
          placeholder="Title"
        />

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

      {showNoteText ?
        <AutoSizeTb
          value={props.note.noteText}
          onTextChange={onNoteTextChange}
          placeholder="Note"
        />
        : null}
    </div>
  )
}

export default memo(NoteItem);