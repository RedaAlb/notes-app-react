import React, { useEffect, useReducer } from 'react';

import ExercisesContext from './exercises_context/exercises-context';
import exercisesReducer from './exercises_context/exercises-reducer';
import { ADD_EXERCISE, LOAD_EXERCISES, SET_EXERCISES } from './exercises_context/exercises-actions';

import { loadExercises, swapExercisesOrder } from '../../utils/gym-weights-utils';

import DragArea from '../../components/DragArea';
import DragItem from '../../components/DragItem';
import ExerciseItem from './ExerciseItem';


const initialState = {
  exercises: []
}


function ExerciseList(props) {
  const [state, dispatch] = useReducer(exercisesReducer, initialState);


  const onDragEnd = (dragHistory, sourceIndex, destIndex) => {
    // Swap all the moved exercises order for persistence.
    swapExercisesOrder(state.exercises, dragHistory, sourceIndex, destIndex).then(newExercises => {
      dispatch({ type: SET_EXERCISES, payload: newExercises });
    })
  }


  useEffect(() => {
    loadExercises(props.bodypart).then(exercises => {
      dispatch({ type: LOAD_EXERCISES, payload: exercises });
    })
  }, [props.bodypart])


  useEffect(() => {
    dispatch({ type: ADD_EXERCISE, payload: props.newExercise });
  }, [props.newExercise])


  return (
    <ExercisesContext.Provider value={{ dispatch: dispatch }}>
      <DragArea onDragEnd={onDragEnd}>
        {state.exercises.map((exercise, index) => (
          <DragItem key={exercise.exerciseKey} itemKey={exercise.exerciseKey} index={index}>
            {(provided) => (
              <ExerciseItem
                exercise={exercise}
                showDragHandle={props.showDragHandle}
                provided={provided}
                bodypartCountState={props.bodypartCountState}
              />
            )}
          </DragItem>
        ))}
      </DragArea>
    </ExercisesContext.Provider>
  )
}

export default ExerciseList;