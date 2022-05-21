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


  const onAddButtonClick = () => {
    props.dataHandler.addSection();
  }


  const onDragEnd = (param) => {
    console.log(param)
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(props.sections).map((key, index) => (
                  <Draggable key={index} draggableId={"draggable-" + index} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <SectionItem
                          section={props.sections[key]}
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