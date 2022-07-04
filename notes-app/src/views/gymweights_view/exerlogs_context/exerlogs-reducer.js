import * as actions from "./exerlogs-actions";
import { deleteExerlog } from "../../../utils/gym-weights-utils";


const exerlogsReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_EXERLOGS: {
      return { ...state, exerlogs: action.payload }
    }


    case actions.ADD_EXERLOG: {
      const newExerlogs = [...state.exerlogs];
      newExerlogs.unshift(action.payload);

      return { ...state, exerlogs: newExerlogs };
    }


    case actions.DELETE_EXERLOG: {
      deleteExerlog(action.payload);

      const exerlogIndex = state.exerlogs.findIndex(
        exerlog => exerlog.exerlogKey === action.payload.exerlogKey
      )

      const newExerlogs = [...state.exerlogs];
      newExerlogs.splice(exerlogIndex, 1);

      return { ...state, exerlogs: newExerlogs };
    }


    case actions.SET_EXERLOGS: {
      return { ...state, exerlogs: action.payload };
    }


    default:
      throw new Error(`No case for action type ${action.type} in exerlogs reducer.`);
  }
}

export default exerlogsReducer;