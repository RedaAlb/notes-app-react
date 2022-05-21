import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AutowidthInput from "react-autowidth-input";

import { IconButton, Stack } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragHandleIcon from "@mui/icons-material/DragHandle";

import SectionOptionsMenu from "./SectionOptionsMenu";


function SectionItem(props) {
  const navigate = useNavigate();

  const [section, setSection] = useState(props.section);
  const [sectionOptionsAnchor, setSectionOptionsAnchor] = useState(null);


  const onSectionNameChange = evt => {
    const tVal = evt.target.value;

    setSection(prevSection => ({
      ...prevSection,
      sectionName: tVal
    }));

    props.dataHandler.changeSectionName(section.sectionKey, tVal);
  }


  const onSectionItemClick = () => {
    props.dataHandler.loadSectionNotes(section.sectionKey);
    props.setSectionInView(section);

    navigate("/notes")

    props.setActiveMenu("notes");
  }


  const onSectionOptionsPress = (event) => {
    setSectionOptionsAnchor(event.currentTarget);
  }


  useEffect(() => {
    setSection(props.section);
  }, [props.section])


  return (
    <div className="section-item">

      <div {...props.provided.dragHandleProps}>
        {props.showDragHandle ? (
          <DragHandleIcon className="drag-handle" />
        ) : null}
      </div>


      <AutowidthInput
        value={section.sectionName}
        onChange={onSectionNameChange}
        extraWidth={2}
        placeholderIsMinWidth={true}
        minWidth={100}
        placeholder="Title"
        className="section-textbox"
        wrapperClassName="section-textbox-wrapper"
      />

      <div className="section-middle" onClick={onSectionItemClick}>
        <div className="section-info-items">
          <Stack direction="row">
            <div className="section-count">{section.sectionCount}</div>
            <ChevronRightIcon fontSize="medium" />
          </Stack>
        </div>
      </div>

      <Stack direction="row" spacing={1}>
        <IconButton onClick={onSectionOptionsPress}> <MoreVertIcon style={{ color: "black" }} /> </IconButton>
      </Stack>

      <SectionOptionsMenu
        section={section}
        dataHandler={props.dataHandler}
        sectionOptionsAnchor={sectionOptionsAnchor}
        setSectionOptionsAnchor={setSectionOptionsAnchor}
      />
    </div>
  )
}

export default SectionItem;