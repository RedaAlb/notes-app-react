import React, { useState } from "react"

import { CSSTransition } from "react-transition-group"

import SectionItem from "./SectionItem";
import NoteItem from "./NoteItem";

import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';


function NotesMenu() {

  const [activeMenu, setActiveMenu] = useState("main");

  return (
    <div className="notes-menu">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary">
        <div className="menu">
          <SectionItem sectionName="⭐ Habits" sectionCount={5} goToMenu="habits" setActiveMenuRef={setActiveMenu} />
          <SectionItem sectionName="🎯 Goals" sectionCount={4} goToMenu="goals" setActiveMenuRef={setActiveMenu} />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "habits"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Habit 1" noteText="This is habit 1." notePrio="prio-0" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Habit 2" noteText="This is habit 2." notePrio="prio-0" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Habit 3" noteText="This is habit 3." notePrio="prio-1" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Habit 4" noteText="This is habit 4." notePrio="prio-1" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Habit 5" noteText="This is habit 5." notePrio="prio-0" setActiveMenuRef={setActiveMenu} />
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "goals"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Goal 1" noteText="This is goal 1." notePrio="prio-0" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Goal 2" noteText="This is goal 2." notePrio="prio-1" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Goal 3" noteText="This is goal 3." notePrio="prio-0" setActiveMenuRef={setActiveMenu} />
          <NoteItem noteTitle="Goal 4" noteText="This is goal 4." notePrio="prio-1" setActiveMenuRef={setActiveMenu} />
        </div>
      </CSSTransition>

    </div>
  )
}

export default NotesMenu;