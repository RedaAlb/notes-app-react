import { initializeApp } from 'firebase/app';
import { getDatabase, child, get, ref, set, push, update, remove } from "firebase/database";

import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";


class DataHandler {
  constructor() {
    this.initFirebase();
    this.initJeepSqlite();
  }


  initJeepSqlite() {
    applyPolyfills().then(() => {
      jeepSqlite(window);
    });
  }


  async initSqlDb() {
    this.platform = Capacitor.getPlatform();
    this.sqlite = new SQLiteConnection(CapacitorSQLite)

    try {
      if (this.platform === "web") {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        await customElements.whenDefined('jeep-sqlite');
        await this.sqlite.initWebStore();
      }

      const ret = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection("notes_db")).result;

      if (ret.result && isConn) {
        this.sqlDb = await this.sqlite.retrieveConnection("notes_db");
      } else {
        this.sqlDb = await this.sqlite.createConnection("notes_db", false, "no-encryption", 1);
      }

      await this.sqlDb.open();

    } catch (err) {
      console.log(`Error: ${err}`);
      throw new Error(`Error: ${err}`)
    }
    console.log("SQL DB init")
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
    this.firebaseDb = getDatabase(this.app);

    console.log("Firebase init");
  }


  setStates(sections, setSections, sectionNotes, setSectionNotes) {
    this.sections = sections;
    this.setSections = setSections;

    this.sectionNotes = sectionNotes;
    this.setSectionNotes = setSectionNotes;
  }


  loadSections() {
    const dbRef = ref(this.firebaseDb);

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
    const dbRef = ref(this.firebaseDb);

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
    update(ref(this.firebaseDb), updates);

    const newSections = { ...this.sections };
    newSections[sectionKey].sectionCount = this.sections[sectionKey].sectionCount + value;
    this.setSections(newSections);
  }


  addSection() {
    const newSectionKey = push(ref(this.firebaseDb)).key;

    const newSection = {
      sectionKey: newSectionKey,
      sectionName: "",
      sectionCount: 0,
    }

    // Add to the database.
    set(ref(this.firebaseDb, `/sections/${newSectionKey}`), newSection);

    // Add locally without needing to re-loading all the sections to re-render.
    const newSections = { ...this.sections };
    newSections[newSectionKey] = newSection;
    this.setSections(newSections);

    console.log("Section added");
  }


  addNote(sectionInView) {
    const newNoteKey = push(ref(this.firebaseDb)).key;

    const newNote = {
      noteKey: newNoteKey,
      noteTitle: "",
      noteText: "",
      notePrio: 0,
    }

    set(ref(this.firebaseDb, `/${sectionInView.sectionKey}/${newNoteKey}/`), newNote);

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
    update(ref(this.firebaseDb), updates);
  }


  changeNoteTitle(noteKey, sectionKey, newNoteTitle) {
    const updates = {};
    updates[sectionKey + "/" + noteKey + "/noteTitle"] = newNoteTitle;
    update(ref(this.firebaseDb), updates);
  }


  changeNoteText(noteKey, sectionKey, newNoteText) {
    const updates = {};
    updates[sectionKey + "/" + noteKey + "/noteText"] = newNoteText;
    update(ref(this.firebaseDb), updates);
  }


  deleteSection(sectionKey) {
    const sectionToDelRef = ref(this.firebaseDb, `/sections/${sectionKey}`);
    remove(sectionToDelRef);

    const notesToDelRef = ref(this.firebaseDb, `/${sectionKey}/`);
    remove(notesToDelRef);

    const newSections = { ...this.sections };
    delete newSections[sectionKey];
    this.setSections(newSections);

    console.log("Deleted section");
  }


  deleteNote(noteKey, sectionKey) {
    // Delete from DB.
    const noteToDelRef = ref(this.firebaseDb, `/${sectionKey}/${noteKey}`);
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
      set(ref(this.firebaseDb, `/${newSectionKey}/${note.noteKey}`), note);

      // DB: Delete note from current/old section.
      const noteToDelRef = ref(this.firebaseDb, `/${currentSectionKey}/${note.noteKey}`);
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
    update(ref(this.firebaseDb), updates);

    const newSectionNotes = { ...this.sectionNotes };
    newSectionNotes[noteKey].notePrio = newPriority;
    this.setSectionNotes(newSectionNotes);
  }
}


export default DataHandler;