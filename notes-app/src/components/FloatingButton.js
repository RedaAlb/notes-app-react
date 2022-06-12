import React from 'react';

import Fab from "@mui/material/Fab";


function FloatingButton(props) {
  return (

    <Fab
      onClick={props.onClickHandler}
      color="primary"
      size="large"
      sx={{ position: "fixed", bottom: 26, right: 26 }}

    >
      {props.icon}
    </Fab>
  )
}

export default FloatingButton;