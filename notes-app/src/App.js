import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { child, get, ref, set, update, remove } from "firebase/database";

import db from "./Firebase";


import SectionsView from "./components/SectionsView";
import NotesView from "./components/NotesView";


function App() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [sections, setSections] = useState({});
  const [sectionNotes, setSectionNotes] = useState({});
  const [sectionInView, setSectionInView] = useState({});  // Tracks which was section pressed.


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
    const noteToDelRef = ref(db, `/${sectionInView.sectionKey}/${noteKey}`);
    remove(noteToDelRef);

    // Delete locally.
    const newSectionNotes = { ...sectionNotes };
    delete newSectionNotes[noteKey];
    setSectionNotes(newSectionNotes);

    // Update section count.
    changeSectionCount(sectionInView.sectionKey, -1);
  }


  const moveNote = (noteKey, newSectionKey) => {
    if (newSectionKey !== "" && newSectionKey !== sectionInView.sectionKey) {
      // DB: Add note to new section
      const noteToMove = sectionNotes[noteKey];
      set(ref(db, `/${newSectionKey}/${noteKey}`), noteToMove);

      // DB: Delete note from current/old section.
      const noteToDelRef = ref(db, `/${sectionInView.sectionKey}/${noteKey}`);
      remove(noteToDelRef);

      // Local: Delete note from sectionNotes.
      const newSectionNotes = { ...sectionNotes };
      delete newSectionNotes[noteKey];
      setSectionNotes(newSectionNotes);

      changeSectionCount(sectionInView.sectionKey, -1);
      changeSectionCount(newSectionKey, 1);
    }
  }


  const setNotePriority = (noteKey, newPriority) => {
    const updates = {};
    updates["/" + sectionInView.sectionKey + "/" + noteKey + "/notePrio"] = newPriority;
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
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SectionsView
            sections={sections}
            setSections={setSections}
            deleteSection={deleteSection}
            loadSectionNotes={loadSectionNotes}
            setSectionInView={setSectionInView}
            setActiveMenu={setActiveMenu}
          />} />

          <Route path="/notes" element={<NotesView
            sectionInView={sectionInView}
            sectionNotes={sectionNotes}
            setSectionNotes={setSectionNotes}
            changeSectionCount={changeSectionCount}
            deleteNote={deleteNote}
            moveNote={moveNote}
            setNotePriority={setNotePriority}
            sections={sections}
            setActiveMenu={setActiveMenu}
          />} />

          <Route path="*" element={<h1>No page found</h1>} />

        </Routes>
      </Router>
    </>
  )
}

export default App;