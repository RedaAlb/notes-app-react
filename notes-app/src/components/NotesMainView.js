import React, { useEffect, useState } from "react"
import { child, get, ref, push, set, update, remove } from "firebase/database";

import { CSSTransition } from "react-transition-group"

import SectionItem from "./SectionItem";
import NoteItem from "./NoteItem";

import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

import db from "../Firebase";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function NotesMainView(props) {

  const [activeMenu, setActiveMenu] = useState("main");
  const [sections, setSections] = useState({});
  const [sectionNotes, setSectionNotes] = useState({});
  const [sectionKeyInView, setSectionKeyInView] = useState("");  // Tracks which was section pressed.

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
      const newSectionKey = push(ref(db)).key;

      const newSection = {
        sectionKey: newSectionKey,
        sectionName: "",
        sectionCount: 0,
      }

      // Add to the database.
      set(ref(db, `/sections/${newSectionKey}`), newSection);

      // Add locally without needing to re-loading all the sections to re-render.
      const newSections = { ...sections };
      newSections[newSectionKey] = newSection;
      setSections(newSections);

      console.log("Section added");

    } else if (activeMenu === "sectionNotes") {
      const newNoteKey = push(ref(db)).key;

      const newNote = {
        noteKey: newNoteKey,
        noteTitle: "",
        noteText: "",
        notePrio: 0,
      }

      set(ref(db, `/${sectionKeyInView}/${newNoteKey}/`), newNote);

      const newSectionNotes = { ...sectionNotes };
      newSectionNotes[newNoteKey] = newNote;
      setSectionNotes(newSectionNotes);

      // Adding one to the section count.
      changeSectionCount(sectionKeyInView, 1);

      console.log("Note added");
    }
  }


  const changeSectionCount = (sectionKey, value) => {
    const updates = {};
    updates["/sections/" + sectionKey + "/sectionCount"] = sections[sectionKey].sectionCount + value;
    update(ref(db), updates);

    const newSections = { ...sections };
    newSections[sectionKey].sectionCount = sections[sectionKey].sectionCount + value;
    setSections(newSections);
  }


  const deleteSection = (sectionKey) => {
    const sectionToDelRef = ref(db, `/sections/${sectionKey}`);
    remove(sectionToDelRef);

    const notesToDelRef = ref(db, `/${sectionKey}/`);
    remove(notesToDelRef);

    const newSections = { ...sections };
    delete newSections[sectionKey];
    setSections(newSections);

    console.log("Deleted section");
  }


  const deleteNote = (noteKey) => {
    // Delete from DB.
    const noteToDelRef = ref(db, `/${sectionKeyInView}/${noteKey}`);
    remove(noteToDelRef);

    // Delete locally.
    const newSectionNotes = { ...sectionNotes };
    delete newSectionNotes[noteKey];
    setSectionNotes(newSectionNotes);

    // Update section count.
    changeSectionCount(sectionKeyInView, -1);
  }


  const moveNote = (noteKey, newSectionKey) => {
    if (newSectionKey !== "" && newSectionKey !== sectionKeyInView) {
      // DB: Add note to new section
      const noteToMove = sectionNotes[noteKey];
      set(ref(db, `/${newSectionKey}/${noteKey}`), noteToMove);

      // DB: Delete note from current/old section.
      const noteToDelRef = ref(db, `/${sectionKeyInView}/${noteKey}`);
      remove(noteToDelRef);

      // Local: Delete note from sectionNotes.
      const newSectionNotes = { ...sectionNotes };
      delete newSectionNotes[noteKey];
      setSectionNotes(newSectionNotes);

      changeSectionCount(sectionKeyInView, -1);
      changeSectionCount(newSectionKey, 1);
    }
  }


  const setNotePriority = (noteKey, newPriority) => {
    const updates = {};
    updates["/" + sectionKeyInView + "/" + noteKey + "/notePrio"] = newPriority;
    update(ref(db), updates);

    const newSectionNotes = { ...sectionNotes };
    newSectionNotes[noteKey].notePrio = newPriority;
    setSectionNotes(newSectionNotes);
  }


  useEffect(() => {
    if (activeMenu === "main") {
      loadSections()
    }
  }, [activeMenu])


  return (
    <div>
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary" nodeRef={nodeRef}>
        <div>
          {Object.keys(sections).map((key, index) => {
            return (
              <SectionItem key={index}
                section={sections[key]}
                deleteSection={deleteSection}
                loadSectionNotes={loadSectionNotes}
                setSectionKeyInView={setSectionKeyInView}
                goToMenu="sectionNotes"
                setActiveMenuRef={setActiveMenu}
              />
            )
          })}
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === "sectionNotes"} unmountOnExit timeout={0} classNames="menu-secondary" nodeRef={nodeRef}>
        <div>
          <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" setActiveMenuRef={setActiveMenu} />

          {Object.keys(sectionNotes).map((key, index) => {
            return (
              <NoteItem key={index}
                note={sectionNotes[key]}
                sectionKeyInView={sectionKeyInView}
                deleteNote={deleteNote}
                moveNote={moveNote}
                setNotePriority={setNotePriority}
                sections={sections}
                setActiveMenuRef={setActiveMenu} />
            )
          })}
        </div>
      </CSSTransition>

      <Fab onClick={onAddButtonClick} size="large" color="primary" aria-label="add" sx={{ position: "absolute", bottom: 26, right: 26 }}>
        <AddIcon />
      </Fab>

    </div>
  )
}

export default NotesMainView;