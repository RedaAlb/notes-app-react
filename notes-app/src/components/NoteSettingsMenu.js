import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { ref, remove } from "firebase/database";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as MoveIcon } from "../icons/move-icon.svg"
import { ReactComponent as DeleteIcon } from "../icons/delete-icon.svg"
import { ReactComponent as PriorityIcon } from "../icons/priority-icon.svg"
import { ReactComponent as Priority1Icon } from "../icons/priority1-icon.svg"
import { ReactComponent as Priority2Icon } from "../icons/priority2-icon.svg"

import db from "../Firebase";

function NoteSettingsMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");

  const NoteSettingsItem = (props) => {

    const onSettingsItemClick = (buttonPressed) => {
      if (props.goToMenu) setActiveMenu(props.goToMenu);

      if (buttonPressed === "move") {
        console.log("Moved");
      } else if (buttonPressed === "delete") {

        if (window.confirm("Delete note?")) {
          const noteToDelRef = ref(db, `/${props.props.sectionKeyInView}/${props.props.noteKey}`);
          remove(noteToDelRef);

          const newNotes = { ...props.props.sectionNotes };
          delete newNotes[props.props.noteKey];
          props.props.setSectionNotes(newNotes);

          console.log("Deleted section");
        } else {
          console.log("Deletetion section cancelled");
        }
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
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={100} classNames="menu-primary">
        <div className="menu">
          <NoteSettingsItem props={props}
            leftIcon={<PriorityIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="prioSelection">Priority</NoteSettingsItem>

          <NoteSettingsItem
            props={props}
            leftIcon={<MoveIcon />}
            buttonName="move">Move</NoteSettingsItem>

          <NoteSettingsItem
            props={props}
            leftIcon={<DeleteIcon />}
            buttonName="delete">Delete</NoteSettingsItem>
        </div>
      </CSSTransition>


      <CSSTransition in={activeMenu === "prioSelection"} unmountOnExit timeout={100} classNames="menu-secondary">
        <div className="menu">
          <NoteSettingsItem
            props={props}
            leftIcon={<ArrowIcon />}
            goToMenu="main" />

          <NoteSettingsItem
            props={props}
            leftIcon={<Priority1Icon />}
            buttonName="priority1">Priority 1</NoteSettingsItem>

          <NoteSettingsItem
            props={props}
            leftIcon={<Priority2Icon />}
            buttonName="priority2">Priority 2</NoteSettingsItem>
        </div>
      </CSSTransition>

    </div>
  )
}

export default NoteSettingsMenu;