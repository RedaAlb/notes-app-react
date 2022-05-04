import React, { useEffect } from 'react';
import SectionItem from './SectionItem';
import SectionsTopBar from './SectionsTopBar';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
    props.dataHandler.addSection();
  }

  return (
    <div>
      <SectionsTopBar />

      <Animate animation={animation}>
        {Object.keys(props.sections).map((key, index) => {
          return (
            <SectionItem key={index}
              section={props.sections[key]}
              dataHandler={props.dataHandler}
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