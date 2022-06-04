import * as actions from "./sections-actions";
import { deleteSection } from "../../../utils/notes-app-utils";

const sectionsReducer = (state, action) => {
  switch (action.type) {

    case actions.LOAD_SECTIONS: {
      return { ...state, sections: action.payload };
    }


    case actions.ADD_SECTION: {
      const newSections = [...state.sections];
      newSections.push(action.payload);

      return { ...state, sections: newSections };
    }


    case actions.DELETE_SECTION: {
      deleteSection(action.payload);  // Delete from db.

      const sectionIndex = state.sections.findIndex(
        section => section.sectionKey === action.payload.sectionKey
      )

      const newSections = [...state.sections];
      newSections.splice(sectionIndex, 1);

      return { ...state, sections: newSections };
    }


    default:
      throw new Error(`No case for action type ${action.type} in sections reducer.`);
  }
}

export default sectionsReducer;