import React, { useState } from "react"

import TextareaAutosize from 'react-textarea-autosize';
import NoteSettingsMenu from "./NoteSettingsMenu";

import { ReactComponent as ThreeDots } from '../icons/three-dots.svg';


function NoteItem(props) {
  const [noteTitleTB, setNoteTitleTB] = useState(props.noteTitle);
  const [notePrio, setNotePrio] = useState(props.notePrio);
  const [noteSettingsOpen, setNoteSettingsOpen] = useState(false);

  const noteTitleChangeHandler = evt => {
    setNoteTitleTB(evt.target.value);
  };

  // This might be needed later.
  // setNotePrio(props.notePrio);


  const onNoteSettingsClick = () => {
    setNoteSettingsOpen(!noteSettingsOpen);
  }


  return (
    <div className="note-item" onClick={() => props.goToMenu && props.setActiveMenuRef(props.goToMenu)}>
      {!props.goToMenu ? (
        <div className="note-content-wrapper">
          <div className="note-header">
            {props.leftIcon ? (
              <div className="note-top">
                <span className="note-button">{props.leftIcon}</span>
              </div>
            ) : null}
            <TextareaAutosize
              cacheMeasurements
              value={noteTitleTB}
              onChange={noteTitleChangeHandler}
              placeholder="Title"
              className={`note-title-textarea ${notePrio}`}
            />
            <div className={`note-icon-right ${props.notePrio}`}>
              {<ThreeDots onClick={onNoteSettingsClick} />}

              {noteSettingsOpen ? (
                <NoteSettingsMenu />  // Will need to pass in note id to move or delete in the note settings menu.
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="note-top">
          <span className="note-button">{props.leftIcon}</span>
        </div>
      )}
    </div>
  )
}

export default NoteItem;