import React, { useEffect, useState } from "react"
import { ref, update } from "firebase/database";

import TextareaAutosize from 'react-textarea-autosize';
import NoteSettingsMenu from "./NoteSettingsMenu";

import { ReactComponent as ThreeDots } from '../icons/three-dots.svg';

import db from "../Firebase";

function NoteItem(props) {
  const [noteTitleTB, setNoteTitleTB] = useState(props.noteTitle);
  const [notePrio, setNotePrio] = useState(props.notePrio);
  const [noteSettingsOpen, setNoteSettingsOpen] = useState(false);

  const noteTitleChangeHandler = evt => {
    setNoteTitleTB(evt.target.value);

    const updates = {};
    updates[props.sectionKeyInView + "/" + props.noteKey + "/noteTitle"] = evt.target.value;
    update(ref(db), updates);
  };

  const onNoteSettingsClick = () => {
    setNoteSettingsOpen(!noteSettingsOpen);
  };

  useEffect(() => {
    setNoteTitleTB(props.noteTitle);
    setNotePrio(props.notePrio);
  }, [props.noteTitle, props.notePrio])


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
            <div className={`note-icon-right ${notePrio}`}>
              {<ThreeDots className="three-dots-btn" onClick={onNoteSettingsClick} />}

              {noteSettingsOpen ? (
                <NoteSettingsMenu
                  sectionKeyInView={props.sectionKeyInView}
                  noteKey={props.noteKey}
                  sections={props.sections}
                  sectionNotes={props.sectionNotes}
                  setSectionNotes={props.setSectionNotes}
                />
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