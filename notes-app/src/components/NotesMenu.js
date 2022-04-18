import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import GrowingInput from "./GrowingInput";


import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as ThreeDots } from '../icons/three-dots.svg';


function NotesMenu() {

  const [activeMenu, setActiveMenu] = useState("main");


  function SectionItem(props) {
    return (
      <div>
        <GrowingInput sectionName={props.sectionName} />

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



  // USE THIS: https://www.npmjs.com/package/react-textarea-autosize
  function NoteItem(props) {
    return (
      <a href="/#" className="note-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.leftIcon ? (
          <div className="note-top">
            <span className="note-button">{props.leftIcon}</span>
          </div>
        ) : null}

        <span>{props.noteTitle}</span>

        <span className="note-icon-right">{<ThreeDots />}</span>
      </a>
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
          <NoteItem noteTitle="Habit 1" />
          <NoteItem noteTitle="Habit 2" />
          <NoteItem noteTitle="Habit 3" />
          <NoteItem noteTitle="Habit 4" />
          <NoteItem noteTitle="Habit 5" />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "goals"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteItem noteTitle="Goal 1" />
          <NoteItem noteTitle="Goal 2" />
          <NoteItem noteTitle="Goal 3" />
          <NoteItem noteTitle="Goal 4" />
        </div>
      </CSSTransition>

    </div>
  )
}

export default NotesMenu;