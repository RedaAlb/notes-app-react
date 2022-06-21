import { Stack } from "@mui/material";
import React from "react";


function ListItem(props) {
  return (
    <div className="list-item" style={{ height: props.height }}>
      <LeftSide>{props.children[0]}</LeftSide>
      <Middle>{props.children[1]}</Middle>
      <RightSide>{props.children[2]}</RightSide>
    </div>
  )
}


function LeftSide(props) {
  return (
    <Stack className="list-item-left" direction="row" alignItems="center">
      {props.children}
    </Stack>
  )
}


function Middle(props) {
  return (
    <Stack className="list-item-middle" direction="row" onClick={props.onClick}>
      {props.children}
    </Stack>
  )
}


function RightSide(props) {
  return (
    <Stack direction="row">
      {props.children}
    </Stack>
  )
}


ListItem.LeftSide = LeftSide;
ListItem.Middle = Middle;
ListItem.RightSide = RightSide;

export default ListItem;