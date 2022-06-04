import { deleteNote, moveNote } from "../../../utils/notes-app-utils";
import * as actions from "./notes-actions";

const notesReducer = (state, action) => {
  switch (action.type) {

    case actions.LOAD_NOTES: {
      return { ...state, sectionNotes: action.payload };
    }


    case actions.ADD_NOTE: {
      const newSectionNotes = [...state.sectionNotes];
      newSectionNotes.push(action.payload);

      return { ...state, sectionNotes: newSectionNotes };
    }


    case actions.DELETE_NOTE: {
      deleteNote(action.payload);

      const noteIndex = state.sectionNotes.findIndex(
        note => note.noteKey === action.payload.noteKey
      )

      const newSectionNotes = [...state.sectionNotes];
      newSectionNotes.splice(noteIndex, 1);

      return { ...state, sectionNotes: newSectionNotes };
    }


    case actions.MOVE_NOTE: {
      moveNote(action.payload.note, action.payload.sectionKeySelected);

      const currNoteKey = action.payload.note.noteKey;
      const noteIndex = state.sectionNotes.findIndex(note => note.noteKey === currNoteKey);

      const newSectionNotes = [...state.sectionNotes];
      newSectionNotes.splice(noteIndex, 1);

      return { ...state, sectionNotes: newSectionNotes };
    }


    default:
      throw new Error(`No case for action type ${action.type} in notes reducer.`);
  }
}

export default notesReducer;