import React, { useState } from "react"

import DropdownMenu from "./components/DropdownMenu";
import NotesMenu from "./components/NotesMenu";

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';


function App() {

  return (
    <div>
      
      <NavBar>
        <h1 className="navbar-title">Notes</h1>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />

        <NavItem icon={<CaretIcon />}>
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