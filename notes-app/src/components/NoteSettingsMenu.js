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

  const NoteSettingsItem = (props) => {

    const onSettingsItemClick = (buttonPressed) => {
      if (props.goToMenu) setActiveMenu(props.goToMenu);

      if (buttonPressed === "move") {
        console.log("Moved");
      } else if (buttonPressed === "delete") {
        console.log("Deleted");
      } else if (buttonPressed === "priority1") {
        console.log("Priority1");
      } else if (buttonPressed === "priority2") {
        console.log("Priority2");
      }
    }

    return (
      <div className="note-settings-menu-item" onClick={() => onSettingsItemClick(props.buttonName)}>
        {props.leftIcon ? <span className="note-settings-left-icon">{props.leftIcon}</span> : null}

        {props.children}

        {props.rightIcon ? <span className="note-settings-icon-right">{props.rightIcon}</span> : null}
      </div>
    )
  }

  return (
    <div className="note-settings-menu">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={0} classNames="menu-primary">
        <div className="menu">
          <NoteSettingsItem leftIcon={<PriorityIcon />} rightIcon={<ChevronIcon />} goToMenu="prioSelection">Priority</NoteSettingsItem>
          <NoteSettingsItem leftIcon={<MoveIcon />} buttonName="move">Move</NoteSettingsItem>
          <NoteSettingsItem leftIcon={<DeleteIcon />} buttonName="delete">Delete</NoteSettingsItem>
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "prioSelection"} unmountOnExit timeout={0} classNames="menu-secondary">
        <div className="menu">
          <NoteSettingsItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <NoteSettingsItem leftIcon={<Priority1Icon />} buttonName="priority1">Priority 1</NoteSettingsItem>
          <NoteSettingsItem leftIcon={<Priority2Icon />} buttonName="priority2">Priority 2</NoteSettingsItem>
        </div>
      </CSSTransition>

    </div>
  )
}

export default NoteSettingsMenu;