import React, { memo, useRef } from "react"
import { useNavigate } from "react-router-dom";

import { Stack } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DragHandleIcon from "@mui/icons-material/DragHandle";

import SectionOptionsMenu from "./SectionOptionsMenu";

import { changeSectionName } from "../../utils/notes-app-utils";
import AutoWidthTb from "../../components/AutoWidthTb";


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
    <div className="section-item">
      <div {...props.provided.dragHandleProps}>
        {props.showDragHandle ? (<DragHandleIcon className="drag-handle" />) : null}
      </div>

      <AutoWidthTb
        value={props.section.sectionName}
        onTextChange={onSectionNameChange}
        placeholder={"Name"}
        minWidth={100}
      />


      <div className="section-middle" onClick={onSectionItemClick}>
        <div className="section-info-items">
          <Stack direction="row">
            <div className="section-count">{props.section.sectionCount ? props.section.sectionCount : 0}</div>
            <ChevronRightIcon fontSize="medium" />
          </Stack>
        </div>
      </div>


      <Stack direction="row" spacing={1}>
        <SectionOptionsMenu section={sectionRef} />
      </Stack>
    </div>
  )
}

export default memo(SectionItem);