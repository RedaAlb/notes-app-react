import React, { useEffect, useState } from "react"
import AutowidthInput from "react-autowidth-input";
import { ref, update } from "firebase/database";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';

import db from "../Firebase";
import LongPress from "../LongPress";


function SectionItem(props) {
  const [section, setSection] = useState(props.section);

  const onSectionNameChange = evt => {
    const newSection = { ...section };
    newSection.sectionName = evt.target.value;
    setSection(newSection);

    const updates = {};
    updates["/sections/" + section.sectionKey + "/sectionName"] = evt.target.value;
    update(ref(db), updates);
  }


  const onSectionItemLongPress = () => {
    if (window.confirm(`Delete section "${section.sectionName}" ?`)) {
      props.deleteSection(section.sectionKey)
    }
  }


  const onSectionItemClick = () => {
    props.loadSectionNotes(section.sectionKey);
    props.setSectionKeyInView(section.sectionKey);

    props.goToMenu && props.setActiveMenuRef(props.goToMenu)
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
          <div className="section-count">{section.sectionCount}</div>
          <div className="section-icon-right"><ChevronIcon /></div>
        </div>
      </div>
    </div>
  )
}

export default SectionItem;