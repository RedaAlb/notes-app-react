import React, { useEffect } from 'react';
import SectionItem from './SectionItem';
import SectionsTopBar from './SectionsTopBar';

import { ref, push, set } from "firebase/database";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import db from '../Firebase';
import Animate from './Animate';


const animation = {
  initial: { opacity: 1, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: 0 },
}

function SectionsView(props) {

  // On back button from /notes page.
  useEffect(() => {
    window.onpopstate = () => {
      props.setActiveMenu("main");
    }
  })


  const onAddButtonClick = () => {
    const newSectionKey = push(ref(db)).key;

    const newSection = {
      sectionKey: newSectionKey,
      sectionName: "",
      sectionCount: 0,
    }

    // Add to the database.
    set(ref(db, `/sections/${newSectionKey}`), newSection);

    // Add locally without needing to re-loading all the sections to re-render.
    const newSections = { ...props.sections };
    newSections[newSectionKey] = newSection;
    props.setSections(newSections);

    console.log("Section added");
  }

  return (
    <div>
      <SectionsTopBar />

      <Animate animation={animation}>
        {Object.keys(props.sections).map((key, index) => {
          return (
            <SectionItem key={index}
              section={props.sections[key]}
              deleteSection={props.deleteSection}
              loadSectionNotes={props.loadSectionNotes}
              setSectionInView={props.setSectionInView}
              setActiveMenu={props.setActiveMenu}
            />
          )
        })}
      </Animate>

      <Fab onClick={onAddButtonClick} size="large" color="primary" aria-label="add" sx={{ position: "fixed", bottom: 26, right: 26 }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default SectionsView;