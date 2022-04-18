import React, { useState } from "react"

import DropdownMenu from "./components/DropdownMenu";
import NotesMenu from "./components/NotesMenu";

import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as ThreeDots } from './icons/three-dots.svg';

function App() {

  return (
    <div>

      <NavBar>
        <h1 className="navbar-title">Notes</h1>
        <NavItem icon={<SearchIcon />} />

        <NavItem icon={<ThreeDots />}>
          <DropdownMenu />
        </NavItem>

      </NavBar>

      <NotesMenu />

    </div>
  );
}


function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}


function NavItem(props) {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="/#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}

    </li>
  )
}


export default App;