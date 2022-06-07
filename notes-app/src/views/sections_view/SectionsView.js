import React, { useEffect, useState, useReducer } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import SectionsContext from "./context/sections-context";
import sectionsReducer from "./context/sections-reducer";
import { ADD_SECTION, LOAD_SECTIONS } from "./context/sections-actions";

import Animate from "../../components/Animate";

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

  const dragHistory = [];  // Used to persist the order of the sections when dragged.


  const onAddButtonClick = () => {
    addSection().then(newSection => {
      dispatch({ type: ADD_SECTION, payload: newSection });
    })
  }


  const onDragEnd = (result) => {
    const source = result.source;
    const dest = result.destination;

    if (!dest) {
      return;
    }

    if (dest.droppableId === source.droppableId && dest.index === source.index) {
      return;
    }

    // Swap all the moved sections order for persistence.
    swapSectionsOrder(state.sections, dragHistory, source.index, dest.index);
  }


  const onDragUpdate = (result) => {
    const source = result.source;
    const dest = result.destination;

    if (!dest) {
      return;
    }

    if (dest.droppableId === source.droppableId && dest.index === source.index) {
      dragHistory.splice(0, dragHistory.length)  // Reset drag history as section was dragged to the same starting position.
      return;
    }

    const dragHistoryObj = { source: source, dest: dest };

    // This removes unnecessary drags from the drag history.
    const indexOfOldDrag = dragHistory.findIndex(drag => drag.dest.index === dest.index);
    if (indexOfOldDrag !== -1) {
      dragHistory.splice(indexOfOldDrag + 1, dragHistory.length);
    } else {
      dragHistory.push(dragHistoryObj);
    }
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
        toggleDrawer={props.toggleDrawer}
      />

      <Animate animation={SECTIONS_ANIM}>
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <SectionsContext.Provider value={{ dispatch: dispatch }}>
                  {state.sections.map((section, index) => (
                    <Draggable key={section.sectionKey} draggableId={"draggable-" + index} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <SectionItem
                            section={section}
                            setSectionInView={props.setSectionInView}
                            showDragHandle={showDragHandle}
                            provided={provided}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </SectionsContext.Provider>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Animate>

      <Fab
        onClick={onAddButtonClick}
        size="large"
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 26, right: 26 }}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default SectionsView;