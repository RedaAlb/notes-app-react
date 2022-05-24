import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SectionsView from "./components/SectionsView";
import NotesView from "./components/NotesView";
import { AnimatePresence } from "framer-motion";


function App(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [sections, setSections] = useState([]);
  const [sectionNotes, setSectionNotes] = useState([]);
  const [sectionInView, setSectionInView] = useState({});  // Tracks which was section pressed.

  props.dataHandler.setStates(sections, setSections, sectionNotes, setSectionNotes);


  useEffect(() => {
    if (activeMenu === "main") {
      props.dataHandler.loadSections()
    }
  }, [activeMenu, props.dataHandler])


  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={
            <SectionsView
              sections={sections}
              setSectionInView={setSectionInView}
              dataHandler={props.dataHandler}
              setActiveMenu={setActiveMenu} />
          } />

          <Route path="/notes" element={
            <NotesView
              sectionNotes={sectionNotes}
              sections={sections}
              sectionInView={sectionInView}
              dataHandler={props.dataHandler}
              setActiveMenu={setActiveMenu} />
          } />

          <Route path="*" element={<h1>No page found</h1>} />

        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App;