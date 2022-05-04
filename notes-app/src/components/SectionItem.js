import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AutowidthInput from "react-autowidth-input";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LongPress from "../LongPress";

import { Stack } from "@mui/material";


function SectionItem(props) {
  const navigate = useNavigate();

  const [section, setSection] = useState(props.section);

  const onSectionNameChange = evt => {
    const tVal = evt.target.value;

    setSection(prevSection => ({
      ...prevSection,
      sectionName: tVal
    }));

    props.dataHandler.changeSectionName(section.sectionKey, tVal);
  }


  const onSectionItemLongPress = () => {
    if (window.confirm(`Delete section "${section.sectionName}" ?`)) {
      props.dataHandler.deleteSection(section.sectionKey);
    }
  }


  const onSectionItemClick = () => {
    props.dataHandler.loadSectionNotes(section.sectionKey);
    props.setSectionInView(section);

    navigate("/notes")

    props.setActiveMenu("notes");
  }


  const sectionItemClickOptions = {
    shouldPreventDefault: true,
    delay: 700,
  }


  const longPressEvent = LongPress(onSectionItemLongPress, onSectionItemClick, sectionItemClickOptions);


  useEffect(() => {
    setSection(props.section);
  }, [props.section])


  return (
    <div>
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

      <div className="section-item" {...longPressEvent}>
        {props.leftIcon ? <div className="section-icon-left">{props.leftIcon}</div> : null}

        <div className="section-right-items">

          <Stack direction="row" spacing={0} marginRight={2}>
            <div className="section-count">{section.sectionCount}</div>
            <ChevronRightIcon fontSize="medium" />
          </Stack>

          {/* <div className="section-icon-right"><ChevronIcon /></div> */}
        </div>
      </div>
    </div>
  )
}

export default SectionItem;