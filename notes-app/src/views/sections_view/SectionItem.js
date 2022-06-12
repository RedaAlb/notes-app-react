import React, { memo, useRef } from "react"
import { useNavigate } from "react-router-dom";

import { Stack } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DragHandleIcon from "@mui/icons-material/DragHandle";

import SectionItemOptions from "./SectionItemOptions";

import AutoWidthTb from "../../components/AutoWidthTb";
import ListItem from "../../components/ListItem";

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
    props.setSectionInView(props.section);

    navigate("/notes")
  }


  return (
    <ListItem height={SECTION_ITEM_HEIGHT}>
      <div {...props.provided.dragHandleProps}>
        <Stack direction="row">
          {props.showDragHandle ? (<DragHandleIcon className="drag-handle" />) : null}
        </Stack>
      </div>

      <AutoWidthTb
        value={props.section.sectionName}
        onTextChange={onSectionNameChange}
        placeholder={"Name"}
        minWidth={100}
      />

      <div className="section-middle" onClick={onSectionItemClick}>
        <Stack direction="row">
          <div className="section-count">{props.section.sectionCount}</div>
          <ChevronRightIcon fontSize="medium" />
        </Stack>
      </div>


      <Stack direction="row">
        <SectionItemOptions section={sectionRef} />
      </Stack>
    </ListItem>
  )
}

export default memo(SectionItem);