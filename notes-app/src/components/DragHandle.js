import React from 'react';

import DragHandleIcon from "@mui/icons-material/DragHandle";


function DragHandle(props) {
  return (
    <div {...props.dragHandleProps} style={{ height: "100%", display: "flex" }}>
      {props.showDragHandle ? (<DragHandleIcon sx={{ height: "100%", paddingLeft: "10px" }} />) : null}
    </div>
  )
}

export default DragHandle;