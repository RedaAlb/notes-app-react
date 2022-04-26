import React from 'react';
import NotesTopBar from './NotesTopBar';
import NoteItem from './NoteItem';


import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';


function NotesView(props) {
  return (
    <div>
      <NotesTopBar sectionInView={props.sectionInView} />
      <NoteItem leftIcon={<ArrowIcon />} goToMenu="main" setActiveMenu={props.setActiveMenu} />

      {Object.keys(props.sectionNotes).map((key, index) => {
        return (
          <NoteItem key={index}
            note={props.sectionNotes[key]}
            sectionInView={props.sectionInView}
            deleteNote={props.deleteNote}
            moveNote={props.moveNote}
            setNotePriority={props.setNotePriority}
            sections={props.sections}
            setActiveMenu={props.setActiveMenu} />
        )
      })}
    </div>
  )
}

export default NotesView;