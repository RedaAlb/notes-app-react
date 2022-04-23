import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { ref, remove, update } from "firebase/database";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as MoveIcon } from "../icons/move-icon.svg"
import { ReactComponent as DeleteIcon } from "../icons/delete-icon.svg"
import { ReactComponent as PriorityIcon } from "../icons/priority-icon.svg"
import { ReactComponent as Priority1Icon } from "../icons/priority1-icon.svg"
import { ReactComponent as Priority2Icon } from "../icons/priority2-icon.svg"

import db from "../Firebase";
import NoteMoveDialog from "./NoteMoveDialog";

function NoteSettingsMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");

  const NoteSettingsItem = (props) => {

    const [open, setOpen] = useState(false);

    const onSettingsItemClick = (buttonPressed) => {
      if (props.goToMenu) setActiveMenu(props.goToMenu);

      if (buttonPressed === "move") {
        setOpen(true);
      }

      else if (buttonPressed === "delete") {
        if (window.confirm("Delete note?")) {
          const noteToDelRef = ref(db, `/${props.props.sectionKeyInView}/${props.props.noteKey}`);
          remove(noteToDelRef);

          const newSectionNotes = { ...props.props.sectionNotes };
          delete newSectionNotes[props.props.noteKey];
          props.props.setSectionNotes(newSectionNotes);

          console.log("Deleted note");
        }
      }

      else if (buttonPressed === "priority1") {
        const updates = {};
        updates["/" + props.props.sectionKeyInView + "/" + props.props.noteKey + "/notePrio"] = 0;
        update(ref(db), updates);

        const newSectionNotes = { ...props.props.sectionNotes };
        newSectionNotes[props.props.noteKey].notePrio = 0;
        props.props.setSectionNotes(newSectionNotes);
      }

      else if (buttonPressed === "priority2") {
        const updates = {};
        updates["/" + props.props.sectionKeyInView + "/" + props.props.noteKey + "/notePrio"] = 1;
        update(ref(db), updates);

        const newSectionNotes = { ...props.props.sectionNotes };
        newSectionNotes[props.props.noteKey].notePrio = 1;
        props.props.setSectionNotes(newSectionNotes);
      }
    }

    return (
      <div>
        <div className="note-settings-menu-item" onClick={() => onSettingsItemClick(props.buttonName)}>
          {props.leftIcon ? <span className="note-settings-left-icon">{props.leftIcon}</span> : null}

          {props.children}

          {props.rightIcon ? <span className="note-settings-icon-right">{props.rightIcon}</span> : null}
        </div>

        <NoteMoveDialog
          open={open}
          setOpen={setOpen}
          sectionKeyInView={props.props.sectionKeyInView}
          noteKey={props.props.noteKey}
          sections={props.props.sections}
          sectionNotes={props.props.sectionNotes}
          setSectionNotes={props.props.setSectionNotes} />

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