import React from "react"
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NavItem from "./components/NavItem";
import DropdownMenu from "./components/DropdownMenu";
import NotesMenu from "./components/NotesMenu";

import { ReactComponent as ThreeDots } from './icons/three-dots.svg';

function App() {

  // Remember to only load the notes for that section neeeded, and not all notes for all sections...

  return (
    <div>

      <NavBar>
        <h1 className="navbar-title">Notes</h1>

        <Search />

        <NavItem icon={<ThreeDots />}>
          <DropdownMenu />
        </NavItem>

      </NavBar>

      <NotesMenu />

    </div>
  );
}

export default App;