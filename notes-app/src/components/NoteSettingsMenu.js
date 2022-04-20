import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as MoveIcon } from "../icons/move-icon.svg"
import { ReactComponent as DeleteIcon } from "../icons/delete-icon.svg"
import { ReactComponent as PriorityIcon } from "../icons/priority-icon.svg"
import { ReactComponent as Priority1Icon } from "../icons/priority1-icon.svg"
import { ReactComponent as Priority2Icon } from "../icons/priority2-icon.svg"


function NoteSettingsMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");

  function NoteSettingsItem(props) {
    return (
      <a href="/#" className="note-settings-menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.leftIcon ? <span className="note-settings-left-icon">{props.leftIcon}</span> : null}

        {props.children}

        {props.rightIcon ? <span className="note-settings-icon-right">{props.rightIcon}</span> : null}
      </a>
    )
  }

  return (
    <div className="note-settings-menu">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary">
        <div className="menu">
          <NoteSettingsItem leftIcon={<PriorityIcon />} rightIcon={<ChevronIcon />} goToMenu="prioSelection">Priority</NoteSettingsItem>
          <NoteSettingsItem leftIcon={<MoveIcon />}>Move</NoteSettingsItem>
          <NoteSettingsItem leftIcon={<DeleteIcon />}>Delete</NoteSettingsItem>
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "prioSelection"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteSettingsItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteSettingsItem leftIcon={<Priority1Icon />}>Priority 1</NoteSettingsItem>
          <NoteSettingsItem leftIcon={<Priority2Icon />}>Priority 2</NoteSettingsItem>
        </div>
      </CSSTransition>

    </div>
  )
}

export default NoteSettingsMenu;