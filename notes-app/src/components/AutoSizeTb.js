import React, { useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

function AutoSizeTb(props) {
  const [value, setValue] = useState(props.value);


  const onTextChange = (event) => {
    const tbVal = event.target.value;  // tb: textbox

    // This is needed to be able to insert quotes (") into sql insert statement.
    const apostropheRemoved = tbVal.replace(/'/g, "");

    setValue(apostropheRemoved);
    props.onTextChange(apostropheRemoved);
  }


  return (
    <TextareaAutosize
      cacheMeasurements
      value={value}
      onChange={onTextChange}
      placeholder={props.placeholder}
      className="autosize-textarea"
    />
  )
}

export default AutoSizeTb;