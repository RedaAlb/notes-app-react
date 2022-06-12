import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SectionsView from "./views/sections_view/SectionsView";
import NotesView from "./views/notes_view/NotesView";
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<SectionsView />} />
          <Route path="/notes" element={<NotesView />} />
          <Route path="*" element={<h1>No page found</h1>} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App;