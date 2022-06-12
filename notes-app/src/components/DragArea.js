import React from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd"


function DragArea(props) {

  const dragHistory = [];  // Used to persist the order of the sections when dragged.


  const onDragEnd = async (result) => {
    const source = result.source;
    const dest = result.destination;

    if (!dest) {
      return;
    }

    if (dest.droppableId === source.droppableId && dest.index === source.index) {
      return;
    }

    await props.onDragEnd(dragHistory, source.index, dest.index);
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


  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragArea;