import React, { useEffect, useState } from "react"
import { child, get, ref, push, set } from "firebase/database";

import { CSSTransition } from "react-transition-group"

import SectionItem from "./SectionItem";
import NoteItem from "./NoteItem";

import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as AddIcon } from '../icons/add-icon.svg';

import db from "../Firebase";


function NotesMainView(props) {

  const [activeMenu, setActiveMenu] = useState("main");
  const [sections, setSections] = useState({});
  const [sectionNotes, setSectionNotes] = useState({});

  const nodeRef = React.useRef(null);


  const loadSections = () => {
    const dbRef = ref(db);

    get(child(dbRef, "/sections/")).then((snapshot) => {
      if (snapshot.exists()) {
        setSections(snapshot.val());
        console.log("Loaded sections");
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  const loadSectionNotes = (sectionKey) => {
    const dbRef = ref(db);
    get(child(dbRef, `/${sectionKey}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        setSectionNotes(snapshot.val());
        console.log("Section Notes Loaded");

      } else {
        console.log("No data available");
        setSectionNotes({});
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  const onAddButtonClick = () => {
    if (activeMenu === "main") {
      const sectionKey = push(ref(db)).key;

      const newSection = {
        sectionKey: sectionKey,
        sectionName: "",
        sectionCount: 0,
      }

      // Add to the database.
      set(ref(db, `/sections/${sectionKey}`), newSection);

      // Add locally without needing to re-loading all the sections to re-render.
      const newSections = { ...sections };
      newSections[sectionKey] = newSection;
      setSections(newSections);
      console.log("Section added");

    } else if (activeMenu === "sectionNotes") {
      console.log("Note added");
    }
  }

  useEffect(() => {
    if (activeMenu === "main") {
      loadSections()
    }
  }, [activeMenu])


  return (
    <div className="notes-main-view">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary" nodeRef={nodeRef}>
        <div className="menu">
          {Object.keys(sections).map((key, index) => {
            return (
              <SectionItem key={index}
                sectionKey={sections[key].sectionKey}
                sectionName={sections[key].sectionName}
                sectionCount={sections[key].sectionCount}
                loadSectionNotes={loadSectionNotes}
                goToMenu="sectionNotes"
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