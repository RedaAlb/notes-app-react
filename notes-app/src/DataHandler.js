import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

import { child, get, ref, set, push, update, remove } from "firebase/database";

class DataHandler {
  constructor() {
    this.initFirebase();
  }


  initFirebase() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    }

    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);

    console.log("Firebase init");
  }


  setStates(sections, setSections, sectionNotes, setSectionNotes) {
    this.sections = sections;
    this.setSections = setSections;

    this.sectionNotes = sectionNotes;
    this.setSectionNotes = setSectionNotes;
  }


  loadSections() {
    const dbRef = ref(this.db);

    get(child(dbRef, "/sections/")).then((snapshot) => {
      if (snapshot.exists()) {
        this.setSections(snapshot.val());
        console.log("Loaded sections");
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
  }


  loadSectionNotes(sectionKey) {
    const dbRef = ref(this.db);

    get(child(dbRef, `/${sectionKey}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.setSectionNotes(snapshot.val());
        console.log("Section Notes Loaded");

      } else {
        console.log("No data available");
        this.setSectionNotes({});
      }
    }).catch((error) => {
      console.error(error);
    })
  }


  incrementSectionCount(sectionKey, value) {
    const updates = {};
    updates["/sections/" + sectionKey + "/sectionCount"] = this.sections[sectionKey].sectionCount + value;
    update(ref(this.db), updates);

    const newSections = { ...this.sections };
    newSections[sectionKey].sectionCount = this.sections[sectionKey].sectionCount + value;
    this.setSections(newSections);
  }


  addSection() {
    const newSectionKey = push(ref(this.db)).key;

    const newSection = {
      sectionKey: newSectionKey,
      sectionName: "",
      sectionCount: 0,
    }

    // Add to the database.
    set(ref(this.db, `/sections/${newSectionKey}`), newSection);

    // Add locally without needing to re-loading all the sections to re-render.
    const newSections = { ...this.sections };
    newSections[newSectionKey] = newSection;
    this.setSections(newSections);

    console.log("Section added");
  }


  addNote(sectionInView) {
    const newNoteKey = push(ref(this.db)).key;

    const newNote = {
      noteKey: newNoteKey,
      noteTitle: "",
      noteText: "",
      notePrio: 0,
    }

    set(ref(this.db, `/${sectionInView.sectionKey}/${newNoteKey}/`), newNote);

    const newSectionNotes = { ...this.sectionNotes };
    newSectionNotes[newNoteKey] = newNote;
    this.setSectionNotes(newSectionNotes);

    // Adding one to the section count.
    this.incrementSectionCount(sectionInView.sectionKey, 1);

    console.log("Note added");
  }


  changeSectionName(sectionKey, newSectionName) {
    const updates = {};
    updates["/sections/" + sectionKey + "/sectionName"] = newSectionName;
    update(ref(this.db), updates);
  }


  changeNoteTitle(noteKey, sectionKey, newNoteTitle) {
    const updates = {};
    updates[sectionKey + "/" + noteKey + "/noteTitle"] = newNoteTitle;
    update(ref(this.db), updates);
  }


  deleteSection(sectionKey) {
    const sectionToDelRef = ref(this.db, `/sections/${sectionKey}`);
    remove(sectionToDelRef);

    const notesToDelRef = ref(this.db, `/${sectionKey}/`);
    remove(notesToDelRef);

    const newSections = { ...this.sections };
    delete newSections[sectionKey];
    this.setSections(newSections);

    console.log("Deleted section");
  }


  deleteNote(noteKey, sectionKey) {
    // Delete from DB.
    const noteToDelRef = ref(this.db, `/${sectionKey}/${noteKey}`);
    remove(noteToDelRef);

    // Delete locally.
    const newSectionNotes = { ...this.sectionNotes };
    delete newSectionNotes[noteKey];
    this.setSectionNotes(newSectionNotes);

    // Update section count.
    this.incrementSectionCount(sectionKey, -1);
  }


  moveNote(note, currentSectionKey, newSectionKey) {
    if (newSectionKey !== "" && newSectionKey !== currentSectionKey) {
      // DB: Add note to new section
      set(ref(this.db, `/${newSectionKey}/${note.noteKey}`), note);

      // DB: Delete note from current/old section.
      const noteToDelRef = ref(this.db, `/${currentSectionKey}/${note.noteKey}`);
      remove(noteToDelRef);

      // Local: Delete note from sectionNotes.
      const newSectionNotes = { ...this.sectionNotes };
      delete newSectionNotes[note.noteKey];
      this.setSectionNotes(newSectionNotes);

      this.incrementSectionCount(currentSectionKey, -1);
      this.incrementSectionCount(newSectionKey, 1);
    }
  }


  setNotePriority(noteKey, sectionKey, newPriority) {
    const updates = {};
    updates["/" + sectionKey + "/" + noteKey + "/notePrio"] = newPriority;
    update(ref(this.db), updates);

    const newSectionNotes = { ...this.sectionNotes };
    newSectionNotes[noteKey].notePrio = newPriority;
    this.setSectionNotes(newSectionNotes);
  }
}


export default DataHandler;