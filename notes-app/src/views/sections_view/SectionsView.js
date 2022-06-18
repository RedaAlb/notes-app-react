import React, { useEffect, useState, useReducer } from "react";
import { useSpring } from 'react-spring'

import AddIcon from "@mui/icons-material/Add";

import SectionsContext from "./context/sections-context";
import sectionsReducer from "./context/sections-reducer";
import { ADD_SECTION, LOAD_SECTIONS, SET_SECTIONS } from "./context/sections-actions";

import DragArea from "../../components/DragArea";
import DragItem from "../../components/DragItem";
import FloatingButton from "../../components/FloatingButton";

import SectionItem from "./SectionItem";
import SectionsTopBar from "./SectionsTopBar";

import { addSection, loadSections, swapSectionsOrder } from "../../utils/notes-app-utils";
import { SECTIONS_ANIM } from "../../utils/constants";
import Animate from "../../components/Animate";


const initialState = {
  sections: []
}


function SectionsView(props) {
  const [state, dispatch] = useReducer(sectionsReducer, initialState);

  const [showDragHandle, setShowDragHandle] = useState(false);

  const animation = useSpring(SECTIONS_ANIM);


  const onAddButtonClick = () => {
    addSection().then(newSection => {
      dispatch({ type: ADD_SECTION, payload: newSection });
    })
  }


  const onDragEnd = (dragHistory, sourceIndex, destIndex) => {
    // Swap all the moved sections order for persistence.
    swapSectionsOrder(state.sections, dragHistory, sourceIndex, destIndex).then(newSections => {
      dispatch({ type: SET_SECTIONS, payload: newSections });
    })
  }


  useEffect(() => {
    loadSections().then(sections => {
      dispatch({ type: LOAD_SECTIONS, payload: sections });
    })
  }, [])


  return (
    <>
      <SectionsContext.Provider value={{ dispatch: dispatch }}>
        <SectionsTopBar
          showDragHandle={showDragHandle}
          setShowDragHandle={setShowDragHandle}
        />

        <DragArea onDragEnd={onDragEnd}>
          <Animate animation={animation}>
            {state.sections.map((section, index) => (
              <DragItem key={section.sectionKey} itemKey={section.sectionKey} index={index}>
                {(provided) => (
                  <SectionItem
                    section={section}
                    setSectionInView={props.setSectionInView}
                    showDragHandle={showDragHandle}
                    provided={provided}
                  />
                )}
              </DragItem>
            ))}
          </Animate>
        </DragArea>
      </SectionsContext.Provider>


      <FloatingButton
        onClickHandler={onAddButtonClick}
        icon={<AddIcon />}
      />
    </>
  )
}

export default SectionsView;