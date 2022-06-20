import React, { useState } from 'react';
import AutowidthInput from "react-autowidth-input";

function AutoWidthTb(props) {
  const [value, setValue] = useState(props.value);


  const onTextChange = (event) => {
    const tbVal = event.target.value;  // tb: textbox

    // This is needed to be able to insert quotes (") into sql insert statement.
    const apostropheRemoved = tbVal.replace(/'/g, "");

    setValue(apostropheRemoved);
    props.onTextChange(apostropheRemoved);
  }


  return (
    <AutowidthInput
      value={value}
      onChange={onTextChange}
      placeholder={props.placeholder}
      minWidth={props.minWidth}
      placeholderIsMinWidth={true}
      extraWidth={2}
      className="auto-width-tb"
      wrapperClassName="auto-width-tb-wrapper"
    />
  )
}

export default AutoWidthTb;