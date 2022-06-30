import { deleteExercise } from "../../../utils/gym-weights-utils";
import * as actions from "./exercises-actions";


const exercisesReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_EXERCISES: {
      return { ...state, exercises: action.payload };
    }


    case actions.ADD_EXERCISE: {
      const newExercises = [...state.exercises];
      newExercises.unshift(action.payload);

      return { ...state, exercises: newExercises };
    }


    case actions.DELETE_EXERCISE: {
      deleteExercise(action.payload);

      const exerciseIndex = state.exercises.findIndex(
        exercise => exercise.exerciseKey === action.payload.exerciseKey
      )

      const newExercises = [...state.exercises];
      newExercises.splice(exerciseIndex, 1);

      return { ...state, exercises: newExercises };
    }


    case actions.SET_EXERCISES: {
      return { ...state, exercises: action.payload };
    }


    default:
      throw new Error(`No case for action type ${action.type} in exercises reducer.`);
  }
}

export default exercisesReducer;