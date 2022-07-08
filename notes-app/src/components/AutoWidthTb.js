import React, { useState } from 'react';
import AutowidthInput from "react-autowidth-input";

function AutoWidthTb(props) {
  const [value, setValue] = useState(props.value);


  const onTextChange = (event) => {
    const tbVal = event.target.value;  // tb: textbox

    setValue(tbVal);

    props.onTextChange(tbVal);
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
      style={{ fontSize: `${props.fontSize}` }}
    />
  )
}

export default AutoWidthTb;