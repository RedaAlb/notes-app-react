import React, { useState } from "react"
import { child, get } from "firebase/database";

import { CSSTransition } from "react-transition-group"

import SectionItem from "./SectionItem";
import NoteItem from "./NoteItem";

import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as AddIcon } from '../icons/add-icon.svg';

import dbRef from "../Firebase";


function NotesMainView(props) {

  const [activeMenu, setActiveMenu] = useState("main");
  const [sectionNotes, setSectionNotes] = useState({});

  const nodeRef = React.useRef(null);


  const onAddButtonClick = () => {
    console.log("Added");
  }


  const loadSectionNotes = (sectionKey) => {
    get(child(dbRef, `/${sectionKey}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        setSectionNotes(snapshot.val());
        console.log("Section Notes Loaded");

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  return (
    <div className="notes-main-view">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary" nodeRef={nodeRef}>
        <div className="menu">
          {Object.keys(props.sections).map((key, index) => {
            return (
              <SectionItem key={index}
                sectionKey={props.sections[key].sectionKey}
                sectionName={props.sections[key].sectionName}
                sectionCount={props.sections[key].sectionCount}
                loadSectionNotes={loadSectionNotes}
                goToMenu="sectionNotes" // Key
                setActiveMenuRef={setActiveMenu}
              />
            )
          })}
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === "sectionNotes"} unmountOnExit timeout={0} classNames="menu-secondary" nodeRef={nodeRef}>
        <div className="menu">
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" setActiveMenuRef={setActiveMenu} />

          {Object.keys(sectionNotes).map((key, index) => {
            return (
              <NoteItem key={index}
                noteTitle={sectionNotes[key].noteTitle}
                noteText={sectionNotes[key].noteText}
                notePrio={`prio-${sectionNotes[key].notePrio}`}
                setActiveMenuRef={setActiveMenu} />
            )
          })}
        </div>
      </CSSTransition>

      <button className="add-button" onClick={onAddButtonClick}><AddIcon /></button>

    </div>
  )
}

export default NotesMainView;