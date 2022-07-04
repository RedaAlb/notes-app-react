import React, { useEffect, useReducer } from 'react';

import ExerlogContext from './exerlogs_context/exerlogs-context';
import exerlogsReducer from './exerlogs_context/exerlogs-reducer';
import { ADD_EXERLOG, LOAD_EXERLOGS } from './exerlogs_context/exerlogs-actions';

import { loadExerlogs } from '../../utils/gym-weights-utils';

import ExerlogItem from './ExerlogItem';


const initialState = {
  exerlogs: []
}


function ExerlogList(props) {
  const [state, dispatch] = useReducer(exerlogsReducer, initialState);


  useEffect(() => {
    loadExerlogs(props.exercise).then(exerlogs => {
      dispatch({ type: LOAD_EXERLOGS, payload: exerlogs });
    })
  }, [props.exercise])


  useEffect(() => {
    dispatch({ type: ADD_EXERLOG, payload: props.newExerlog });
  }, [props.newExerlog])


  return (
    <ExerlogContext.Provider value={{ dispatch: dispatch }}>
      {state.exerlogs.map((exerlog, index) => {
        if (Object.keys(exerlog).length === 0) return [];

        return (
          <ExerlogItem
            key={exerlog.exerlogKey}
            exerlog={exerlog}
            exerciseCountState={props.exerciseCountState}
          />
        )
      })}
    </ExerlogContext.Provider>
  )
}

export default ExerlogList;