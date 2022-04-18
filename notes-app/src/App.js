import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import './App.css';

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';


function App() {

  return (
    <div>
      <div>
        <NavBar>
          <NavItem icon={<PlusIcon />} />
          <NavItem icon={<BellIcon />} />
          <NavItem icon={<MessengerIcon />} />

          <NavItem icon={<CaretIcon />}>
            <DropdownMenu />
          </NavItem>
        </NavBar>
      </div>
    </div>
  );
}


// NoteMenu()
function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState("main");

  // Two functions, SectionItem, NoteItem.
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.leftIcon ? <span className="icon-button">{props.leftIcon}</span> : null}

        {props.children}

        {props.rightIcon ? <span className="icon-right">{props.rightIcon}</span> : null}
      </a>
    )
  }

  return (

    // The menu primary will be made up of SectionItem.
    // The menu secondary will be made up of NoteItem.
    <div className="dropdown">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={100} classNames="menu-primary">
        <div className="menu">
          <DropdownItem>Load</DropdownItem>
          <DropdownItem rightIcon={<ChevronIcon/>} goToMenu="settings">Settings</DropdownItem>
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "settings"} unmountOnExit timeout={100} classNames="menu-secondary">
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon/>} goToMenu="main"/>
          <DropdownItem>Save</DropdownItem>
          <DropdownItem>Save</DropdownItem>
          <DropdownItem>Save</DropdownItem>
          <DropdownItem>Save</DropdownItem>
          <DropdownItem>Save</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  )
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
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}

    </li>
  )
}


export default App;
