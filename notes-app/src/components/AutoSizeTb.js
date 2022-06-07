import React, { useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

function AutoSizeTb(props) {
  const [value, setValue] = useState(props.value);


  const onTextChange = (event) => {
    const tbVal = event.target.value;  // tb: textbox

    setValue(tbVal);

    props.onTextChange(tbVal);
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