import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState("main");

  function DropdownItem(props) {
    return (
      <a href="/#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.leftIcon ? <span className="icon-button">{props.leftIcon}</span> : null}

        {props.children}

        {props.rightIcon ? <span className="icon-right">{props.rightIcon}</span> : null}
      </a>
    )
  }

  return (
    <div className="dropdown">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary">
        <div className="menu">
          <DropdownItem>Load</DropdownItem>
          <DropdownItem rightIcon={<ChevronIcon />} goToMenu="settings">Settings</DropdownItem>
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "settings"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
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

export default DropdownMenu;