import React, { useEffect, useState, useReducer } from "react";

import AddIcon from "@mui/icons-material/Add";

import SectionsContext from "./context/sections-context";
import sectionsReducer from "./context/sections-reducer";
import { ADD_SECTION, LOAD_SECTIONS, SET_SECTIONS } from "./context/sections-actions";

import Animate from "../../components/Animate";
import DragArea from "../../components/DragArea";
import DragItem from "../../components/DragItem";
import FloatingButton from "../../components/FloatingButton";

import SectionItem from "./SectionItem";
import SectionsTopBar from "./SectionsTopBar";

import { addSection, loadSections, swapSectionsOrder } from "../../utils/notes-app-utils";
import { SECTIONS_ANIM } from "../../utils/constants";


const initialState = {
  sections: []
}


function SectionsView(props) {
  const [state, dispatch] = useReducer(sectionsReducer, initialState);

  const [showDragHandle, setShowDragHandle] = useState(false)


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
      <SectionsTopBar
        showDragHandle={showDragHandle}
        setShowDragHandle={setShowDragHandle}
      />

      <Animate animation={SECTIONS_ANIM}>
        <DragArea onDragEnd={onDragEnd}>
          <SectionsContext.Provider value={{ dispatch: dispatch }}>
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
          </SectionsContext.Provider>
        </DragArea>
      </Animate>


      <FloatingButton
        onClickHandler={onAddButtonClick}
        icon={<AddIcon />}
      />
    </>
  )
}

export default SectionsView;