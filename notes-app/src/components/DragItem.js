import React from 'react';
import { Draggable } from "react-beautiful-dnd"


function DragItem(props) {
  return (
    <Draggable draggableId={"draggable-" + props.itemKey} index={props.index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          {props.children(provided)}
        </div>
      )}
    </Draggable>

  )
}

export default DragItem;