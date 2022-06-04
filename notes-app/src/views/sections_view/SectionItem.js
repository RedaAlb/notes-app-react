import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AutowidthInput from "react-autowidth-input";

import { IconButton, Stack } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragHandleIcon from "@mui/icons-material/DragHandle";

import SectionOptionsMenu from "./SectionOptionsMenu";

import { changeSectionName } from "../../utils/notes-app-utils";


function SectionItem(props) {

  const navigate = useNavigate();

  const [section, setSection] = useState(props.section);
  const [sectionOptionsAnchor, setSectionOptionsAnchor] = useState(null);


  const onSectionNameChange = (event) => {
    const tbVal = event.target.value;  // tb: textbox

    setSection(prevSection => ({ ...prevSection, sectionName: tbVal }));

    changeSectionName(section, tbVal);
  }


  const onSectionItemClick = () => {
    props.dataHandler.loadSectionNotes(section.sectionKey);
    props.setSectionInView(section);

    navigate("/notes")
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
            <div className="section-count">{section.sectionCount ? section.sectionCount : 0}</div>
            <ChevronRightIcon fontSize="medium" />
          </Stack>
        </div>
      </div>

      <Stack direction="row" spacing={1}>
        <IconButton onClick={onSectionOptionsPress}> <MoreVertIcon style={{ color: "black" }} /> </IconButton>
      </Stack>

      <SectionOptionsMenu
        section={section}
        sectionOptionsAnchor={sectionOptionsAnchor}
        setSectionOptionsAnchor={setSectionOptionsAnchor}
      />
    </div>
  )
}

export default SectionItem;