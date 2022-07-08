import { deleteBodypart } from "../../../utils/gym-weights-utils";
import * as actions from "./bodyparts-actions";


const bodypartsReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_BODYPARTS: {
      return { ...state, bodyparts: action.payload };
    }


    case actions.ADD_BODYPART: {
      const newBodyparts = [...state.bodyparts];
      newBodyparts.push(action.payload);

      return { ...state, bodyparts: newBodyparts };
    }


    case actions.DELETE_BODYPART: {
      deleteBodypart(action.payload);

      const bodypartIndex = state.bodyparts.findIndex(
        bodypart => bodypart.bodypartKey === action.payload.bodypartKey
      )

      const newBodyparts = [...state.bodyparts];
      newBodyparts.splice(bodypartIndex, 1);

      return { ...state, bodyparts: newBodyparts };
    }


    case actions.SET_BODYPARTS: {
      return { ...state, bodyparts: action.payload }
    }


    default:
      throw new Error(`No case for action type ${action.type} in bodyparts reducer.`);
  }
}

export default bodypartsReducer;