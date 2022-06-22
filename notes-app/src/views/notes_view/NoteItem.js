import React, { useState, memo, useRef } from "react"

import NoteItemOptions from "./NoteItemOptions";

import { changeNoteText, changeNoteTitle } from "../../utils/notes-app-utils";
import AutoSizeTb from "../../components/AutoSizeTb";

import { NOTE_PRIO_BG_COLS } from "../../utils/constants";
import Accordion from "../../components/Accordion";


function NoteItem(props) {
  const noteRef = useRef(props.note);

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
    <Accordion>
      <Accordion.Primary background={NOTE_PRIO_BG_COLS[notePriority]}>
        <AutoSizeTb
          value={props.note.noteTitle}
          onTextChange={onNoteTitleChange}
          placeholder="Title"
        />

        <Accordion.Primary.Toggle useToggleButton={true} />

        <NoteItemOptions
          note={noteRef}
          setNotePriority={setNotePriority}
        />
      </Accordion.Primary>

      <Accordion.Secondary>
        <AutoSizeTb
          value={props.note.noteText}
          onTextChange={onNoteTextChange}
          placeholder="Note"
        />
      </Accordion.Secondary>
    </Accordion>
  )
}

export default memo(NoteItem);