import React, { useState } from "react"
import AutowidthInput from "react-autowidth-input";

import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';

function SectionItem(props) {

  const [textboxValue, setTextboxValue] = useState(props.sectionName);

  const changeHandler = evt => {
    setTextboxValue(evt.target.value);
  };

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

      <a href="/#" className="section-item" onClick={() => props.goToMenu && props.setActiveMenuRef(props.goToMenu)}>
        {props.leftIcon ? <div className="section-icon-left">{props.leftIcon}</div> : null}

        <div className="section-right-items">
          <div className="section-count">{props.sectionCount}</div>
          <div className="section-icon-right"><ChevronIcon /></div>
        </div>
      </a>
    </div>
  )
}

export default SectionItem;