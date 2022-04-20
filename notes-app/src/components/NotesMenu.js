import React, { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';

import { CSSTransition } from "react-transition-group"

import SectionInput from "./SectionInput";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as ThreeDots } from '../icons/three-dots.svg';


function NotesMenu() {

  const [activeMenu, setActiveMenu] = useState("main");

  function SectionItem(props) {
    return (
      <div>
        <SectionInput sectionName={props.sectionName} />

        <a href="/#" className="section-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          {props.leftIcon ? <div className="section-button">{props.leftIcon}</div> : null}

          <div className="section-right-items">
            <div className="section-count">{props.sectionCount}</div>
            <div className="section-icon-right">{props.rightIcon}</div>
          </div>
        </a>
      </div>
    )
  }


  function NoteItem(props) {

    const [noteTitleTB, setNoteTitleTB] = useState(props.noteTitle);
    const [notePrio, setNotePrio] = useState(props.notePrio);

    const noteTitleChangeHandler = evt => {
      setNoteTitleTB(evt.target.value);
    };

    // This might be needed later.
    // setNotePrio(props.notePrio);

    return (
      <div className="note-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
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
              <div className={`note-icon-right ${props.notePrio}`}>{<ThreeDots />}</div>
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


  return (
    <div className="notes-menu">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary">
        <div className="menu">
          <SectionItem sectionName="⭐ Habits" sectionCount={5} goToMenu="habits" rightIcon={<ChevronIcon />} />
          <SectionItem sectionName="🎯 Goals" sectionCount={4} goToMenu="goals" rightIcon={<ChevronIcon />} />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "habits"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteItem noteTitle="Habit 1" noteText="This is habit 1." notePrio="prio-0" />
          <NoteItem noteTitle="Habit 2" noteText="This is habit 2." notePrio="prio-0" />
          <NoteItem noteTitle="Habit 3" noteText="This is habit 3." notePrio="prio-1" />
          <NoteItem noteTitle="Habit 4" noteText="This is habit 4." notePrio="prio-1" />
          <NoteItem noteTitle="Habit 5" noteText="This is habit 5." notePrio="prio-0" />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "goals"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteItem noteTitle="Goal 1" noteText="This is goal 1." notePrio="prio-0" />
          <NoteItem noteTitle="Goal 2" noteText="This is goal 2." notePrio="prio-1" />
          <NoteItem noteTitle="Goal 3" noteText="This is goal 3." notePrio="prio-0" />
          <NoteItem noteTitle="Goal 4" noteText="This is goal 4." notePrio="prio-1" />
        </div>
      </CSSTransition>

    </div>
  )
}

export default NotesMenu;