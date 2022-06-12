import React from "react";

function ListItem(props) {
  return (
    <div className="list-item" style={{ height: props.height }}>
      {props.children}
    </div>
  )
}

export default ListItem;