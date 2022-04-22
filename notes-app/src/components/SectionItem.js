import React, { useEffect, useState } from "react"
import AutowidthInput from "react-autowidth-input";
import { ref, update, remove } from "firebase/database";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';

import db from "../Firebase";
import LongPress from "../LongPress";


function SectionItem(props) {

  const [textboxValue, setTextboxValue] = useState(props.sectionName);
  const [sectionCount, setSectionCount] = useState(props.sectionCount);


  const changeHandler = evt => {
    setTextboxValue(evt.target.value);

    const updates = {};
    updates["/sections/" + props.sectionKey + "/sectionName"] = evt.target.value;
    update(ref(db), updates);
  }


  const onSectionItemLongPress = () => {
    if (window.confirm(`Delete section "${textboxValue}" ?`)) {
      const sectionToDelRef = ref(db, `/sections/${props.sectionKey}`);
      remove(sectionToDelRef);

      const notesToDelRef = ref(db, `/${props.sectionKey}/`);
      remove(notesToDelRef);

      const newSections = { ...props.sections };
      delete newSections[props.sectionKey];
      props.setSections(newSections);

      console.log("Deleted section");
    } else {
      console.log("Deletetion section cancelled");
    }
  };


  const onSectionItemClick = () => {
    props.loadSectionNotes(props.sectionKey);
    props.goToMenu && props.setActiveMenuRef(props.goToMenu)
  }


  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = LongPress(onSectionItemLongPress, onSectionItemClick, defaultOptions);


  useEffect(() => {
    setTextboxValue(props.sectionName);
    setSectionCount(props.sectionCount);
  }, [props.sectionName, props.sectionCount])


  return (
    <div>
      <AutowidthInput
        value={textboxValue}
        onChange={changeHandler}
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
          <div className="section-count">{sectionCount}</div>
          <div className="section-icon-right"><ChevronIcon /></div>
        </div>
      </div>
    </div>
  )
}

export default SectionItem;