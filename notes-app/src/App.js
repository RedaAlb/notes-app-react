import React from "react"

import NotesMainView from "./components/NotesMainView";

import TopBar from "./components/TopBar";


function App() {
  return (
    <div>
      <TopBar />

      <NotesMainView />
    </div>
  );
}

export default App;