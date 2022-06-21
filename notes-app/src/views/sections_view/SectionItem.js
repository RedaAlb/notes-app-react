import React, { memo, useRef } from "react"
import { useNavigate } from "react-router-dom";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import SectionItemOptions from "./SectionItemOptions";

import AutoWidthTb from "../../components/AutoWidthTb";
import ListItem from "../../components/ListItem";
import DragHandle from "../../components/DragHandle";

import { changeSectionName } from "../../utils/notes-app-utils";
import { SECTION_ITEM_HEIGHT } from "../../utils/constants";


function SectionItem(props) {
  const navigate = useNavigate();

  const sectionRef = useRef(props.section);


  const onSectionNameChange = (textboxValue) => {
    sectionRef.current.sectionName = textboxValue;
    changeSectionName(props.section, textboxValue);
  }


  const onSectionItemClick = () => {
    navigate("/notes", { state: props.section });
  }


  return (
    <ListItem height={SECTION_ITEM_HEIGHT}>
      <ListItem.LeftSide>
        <DragHandle
          dragHandleProps={props.provided.dragHandleProps}
          showDragHandle={props.showDragHandle}
        />

        <AutoWidthTb
          value={props.section.sectionName}
          onTextChange={onSectionNameChange}
          placeholder={"Name"}
          minWidth={100}
        />
      </ListItem.LeftSide>

      <ListItem.Middle onClick={onSectionItemClick}>
        <div style={{ color: "gray" }}>{props.section.sectionCount}</div>
        <ChevronRightIcon fontSize="medium" />
      </ListItem.Middle>

      <ListItem.RightSide>
        <SectionItemOptions section={sectionRef} />
      </ListItem.RightSide>
    </ListItem>
  )
}

export default memo(SectionItem);