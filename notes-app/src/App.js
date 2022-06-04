import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SectionsView from "./views/sections_view/SectionsView";
import NotesView from "./views/notes_view/NotesView";
import { AnimatePresence } from "framer-motion";

import DrawerComp from "./components/DrawerComp";


function App(props) {
  const [sectionNotes, setSectionNotes] = useState([]);
  const [sectionInView, setSectionInView] = useState({});  // Tracks which was section pressed.

  const [drawerState, setDrawerState] = useState({ left: false });


  props.dataHandler.setStates(sectionNotes, setSectionNotes);


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  }


  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={
            <SectionsView
              setSectionInView={setSectionInView}
              dataHandler={props.dataHandler}
              toggleDrawer={toggleDrawer} />
          } />

          <Route path="/notes" element={
            <NotesView
              sectionNotes={sectionNotes}
              sectionInView={sectionInView}
              dataHandler={props.dataHandler}
              toggleDrawer={toggleDrawer} />
          } />

          <Route path="*" element={<h1>No page found</h1>} />

        </Routes>
      </AnimatePresence>

      <DrawerComp drawerState={drawerState} toggleDrawer={toggleDrawer} />

    </Router>
  )
}

export default App;