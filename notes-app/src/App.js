import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SectionsView from "./views/sections_view/SectionsView";
import NotesView from "./views/notes_view/NotesView";
import SettingsView from "./views/settings_view/SettingsView";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SectionsView />} />
        <Route path="/notes" element={<NotesView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="*" element={<h1>No page found</h1>} />
      </Routes>
    </Router>
  )
}

export default App;