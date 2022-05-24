import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import SectionItem from "./SectionItem";
import SectionsTopBar from "./SectionsTopBar";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Animate from "./Animate";


const animation = {
  initial: { opacity: 1, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: 0 },
}


function SectionsView(props) {
  const [showDragHandle, setShowDragHandle] = useState(false)

  const dragHistory = [];  // Used to persist the order of the sections when dragged.


  const onAddButtonClick = () => {
    props.dataHandler.addSection();
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
    props.dataHandler.swapSectionsOrder(dragHistory, source.index, dest.index);
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


  // On back button from /notes page.
  useEffect(() => {
    window.onpopstate = () => {
      props.setActiveMenu("main");
    }
  })


  return (
    <div>
      <SectionsTopBar dataHandler={props.dataHandler} showDragHandle={showDragHandle} setShowDragHandle={setShowDragHandle} />

      <Animate animation={animation}>
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {props.sections.map((section, index) => (
                  <Draggable key={index} draggableId={"draggable-" + index} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <SectionItem
                          section={section}
                          dataHandler={props.dataHandler}
                          setSectionInView={props.setSectionInView}
                          setActiveMenu={props.setActiveMenu}
                          showDragHandle={showDragHandle}
                          provided={provided}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Animate>

      <Fab onClick={onAddButtonClick} size="large" color="primary" aria-label="add" sx={{ position: "fixed", bottom: 26, right: 26 }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default SectionsView;