import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as ThreeDots } from '../icons/three-dots.svg';


function NotesMenu() {

  const [activeMenu, setActiveMenu] = useState("main");


  function SectionItem(props) {
    return (
      <a href="/#" className="section-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.leftIcon ? <span className="section-button">{props.leftIcon}</span> : null}

        <span>{props.sectionName}</span>

        {props.rightIcon ? <span className="section-icon-right">{props.rightIcon}</span> : null}
      </a>
    )
  }


  function NoteItem(props) {
    return (
      <a href="/#" className="note-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.leftIcon ? <span className="note-button">{props.leftIcon}</span> : null}

        <span>{props.noteTitle}</span>

        <span className="note-icon-right">{<ThreeDots/>}</span>
      </a>
    )
  }


  return (
    <div className="notes-menu">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={100} classNames="menu-primary">
        <div className="menu">
          <SectionItem sectionName="Habits" goToMenu="habits" rightIcon={<ChevronIcon />} />
          <SectionItem sectionName="Goals" goToMenu="goals" rightIcon={<ChevronIcon />} />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "habits"} unmountOnExit timeout={100} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteItem noteTitle="Habit 1" />
          <NoteItem noteTitle="Habit 2" />
          <NoteItem noteTitle="Habit 3" />
          <NoteItem noteTitle="Habit 4" />
          <NoteItem noteTitle="Habit 5" />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "goals"} unmountOnExit timeout={100} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteItem noteTitle="Goal 1"/>
          <NoteItem noteTitle="Goal 2"/>
          <NoteItem noteTitle="Goal 3"/>
          <NoteItem noteTitle="Goal 4"/>
        </div>
      </CSSTransition>

    </div>
  )
}

export default NotesMenu;