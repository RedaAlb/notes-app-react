import React, { useState } from "react"
import AutowidthInput from "react-autowidth-input";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';

function SectionItem(props) {

  const [textboxValue, setTextboxValue] = useState(props.sectionName);

  const changeHandler = evt => {
    setTextboxValue(evt.target.value);
  };

  const onSectionItemClick = (sectionKey) => {
    props.loadSectionNotes(sectionKey);
    props.goToMenu && props.setActiveMenuRef(props.goToMenu)
  }

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

      <div className="section-item" onClick={() => onSectionItemClick(props.sectionKey)}>
        {props.leftIcon ? <div className="section-icon-left">{props.leftIcon}</div> : null}

        <div className="section-right-items">
          <div className="section-count">{props.sectionCount}</div>
          <div className="section-icon-right"><ChevronIcon /></div>
        </div>
      </div>
    </div>
  )
}

export default SectionItem;