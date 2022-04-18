import React, { useState } from "react"
import AutowidthInput from "react-autowidth-input";


function GrowingInput(props) {
  const [textboxValue, setTextboxValue] = useState(props.sectionName);

  const changeHandler = evt => {
    setTextboxValue(evt.target.value);
  };


  return (
    <>
      <AutowidthInput
        value={textboxValue}
        onChange={changeHandler}
        extraWidth={2}
        placeholderIsMinWidth={true}
        minWidth={200}
        placeholder="Title"
        className="section-textbox"
        wrapperClassName="section-textbox-wrapper"
      />
    </>
  );
}

export default GrowingInput;