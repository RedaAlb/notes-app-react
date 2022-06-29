import React, { useState } from 'react';

import GymWeightsTopBar from './GymWeightsTopBar';


function GymWeightsView(props) {
  const [showDragHandle, setShowDragHandle] = useState(false);


  return (
    <>
      <GymWeightsTopBar
        showDragHandle={showDragHandle}
        setShowDragHandle={setShowDragHandle}
      />
    </>
  )
}

export default GymWeightsView;