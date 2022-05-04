import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SectionsView from "./components/SectionsView";
import NotesView from "./components/NotesView";
import { AnimatePresence } from "framer-motion";

import DataHandler from "./DataHandler";

const dataHandler = new DataHandler();

function App() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [sections, setSections] = useState({});
  const [sectionNotes, setSectionNotes] = useState({});
  const [sectionInView, setSectionInView] = useState({});  // Tracks which was section pressed.


  dataHandler.setStates(sections, setSections, sectionNotes, setSectionNotes);


  useEffect(() => {
    if (activeMenu === "main") {
      dataHandler.loadSections()
    }
  }, [activeMenu])


  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={
            <SectionsView
              sections={sections}
              setSectionInView={setSectionInView}
              dataHandler={dataHandler}
              setActiveMenu={setActiveMenu} />
          } />

          <Route path="/notes" element={
            <NotesView
              sectionNotes={sectionNotes}
              sections={sections}
              sectionInView={sectionInView}
              dataHandler={dataHandler}
              setActiveMenu={setActiveMenu} />
          } />

          <Route path="*" element={<h1>No page found</h1>} />

        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App;