import React, { useEffect, useReducer, useState } from 'react';
import { useSpring } from 'react-spring';

import AddIcon from '@mui/icons-material/Add';

import BodypartsContext from "./bodyparts_context/bodyparts-context";
import bodypartsReducer from './bodyparts_context/bodyparts-reducer';
import { ADD_BODYPART, LOAD_BODYPARTS, SET_BODYPARTS } from './bodyparts_context/bodyparts-actions';

import { addBodypart, loadBodyparts, swapBodypartsOrder } from '../../utils/gym-weights-utils';
import { GYM_WEIGHTS_ANIM } from '../../utils/constants';

import Animate from '../../components/Animate';
import DragArea from '../../components/DragArea';
import DragItem from '../../components/DragItem';
import FloatingButton from '../../components/FloatingButton';

import GymWeightsTopBar from './GymWeightsTopBar';
import BodypartItem from './BodypartItem';


const initialState = {
  bodyparts: []
}


function GymWeightsView(props) {
  const [state, dispatch] = useReducer(bodypartsReducer, initialState);

  const [showDragHandle, setShowDragHandle] = useState(false);

  const animation = useSpring(GYM_WEIGHTS_ANIM);


  const onAddButtonClick = () => {
    addBodypart().then(newBodypart => {
      dispatch({ type: ADD_BODYPART, payload: newBodypart });
    })
  }


  const onDragEnd = (dragHistory, sourceIndex, destIndex) => {
    // Swap all the moved bodyparts order for persistence.
    swapBodypartsOrder(state.bodyparts, dragHistory, sourceIndex, destIndex).then(newBodyparts => {
      dispatch({ type: SET_BODYPARTS, payload: newBodyparts });
    })
  }


  useEffect(() => {
    loadBodyparts().then(bodyparts => {
      dispatch({ type: LOAD_BODYPARTS, payload: bodyparts });
    })
  }, [])


  return (
    <>
      <BodypartsContext.Provider value={{ dispatch: dispatch }}>
        <GymWeightsTopBar
          showDragHandle={showDragHandle}
          setShowDragHandle={setShowDragHandle}
        />

        <DragArea onDragEnd={onDragEnd}>
          <Animate animation={animation}>
            {state.bodyparts.map((bodypart, index) => (
              <DragItem key={bodypart.bodypartKey} itemKey={bodypart.bodypartKey} index={index}>
                {(provided) => (
                  <BodypartItem
                    bodypart={bodypart}
                    showDragHandle={showDragHandle}
                    provided={provided}
                  />
                )}
              </DragItem>
            ))}
          </Animate>
        </DragArea>
      </BodypartsContext.Provider>

      <FloatingButton
        onClickHandler={onAddButtonClick}
        icon={<AddIcon />}
      />
    </>
  )
}

export default GymWeightsView;