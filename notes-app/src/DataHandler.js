import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";


class DataHandler {
  constructor() {
    this.initJeepSqlite();

    this.DB_NAME = "notes_db";

    this.SECTIONS_TB_NAME = "sections";  // TB: table
    this.SECTION_TB_ATTRS = {  // ATTRS: attributes
      pk: { name: "sectionKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },  // pk: primary key
      sectionName: { name: "sectionName", sqlType: "TEXT", defaultValue: "" },
      sectionOrder: { name: "sectionOrder", sqlType: "INTEGER", defaultValue: 0 },
    }

    this.NOTES_TB_NAME = "notes";
    this.NOTE_TB_ATTRS = {
      pk: { name: "noteKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      noteTitle: { name: "noteTitle", sqlType: "TEXT", defaultValue: "" },
      noteText: { name: "noteText", sqlType: "TEXT", defaultValue: "" },
      notePrio: { name: "notePrio", sqlType: "INTEGER", defaultValue: 0 },  // notePrio: note priority
      fks: {  // fks: foreign keys
        sectionKey: { name: this.SECTION_TB_ATTRS.pk.name, refTable: this.SECTIONS_TB_NAME, refAttr: this.SECTION_TB_ATTRS.pk.name },
      }
    }
  }


  setStates(sectionNotes, setSectionNotes) {
    this.sectionNotes = sectionNotes;
    this.setSectionNotes = setSectionNotes;
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
      const isConn = (await this.sqlite.isConnection(this.DB_NAME)).result;

      if (ret.result && isConn) {
        this.sqlDb = await this.sqlite.retrieveConnection(this.DB_NAME);
      } else {
        this.sqlDb = await this.sqlite.createConnection(this.DB_NAME, false, "no-encryption", 1);
      }

      await this.sqlDb.open();

    } catch (err) {
      console.log(`Error: ${err}`);
      throw new Error(`Error: ${err}`)
    }

    console.log("SQL DB init")

    await this.runSql("PRAGMA foreign_keys = ON;");

    await this.createTable(this.SECTIONS_TB_NAME, this.SECTION_TB_ATTRS);
    await this.createTable(this.NOTES_TB_NAME, this.NOTE_TB_ATTRS);
  }


  async deleteSqlDb() {
    await CapacitorSQLite.deleteDatabase({ database: this.DB_NAME });
    window.location.reload();
  }


  async runSql(sqlString) {
    const result = await this.sqlDb.run(sqlString);

    if (this.platform === "web") {
      this.sqlite.saveToStore(this.DB_NAME)
    }

    return result;
  }


  async createTable(tableName, tableAttributes) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
      ${this.attrsToCreateTbSqlString(tableAttributes)}
    );
    `

    await this.runSql(createTableQuery);
  }


  attrsToCreateTbSqlString(tableAttributes) {
    var sqlStringLines = []  // Will hold all lines of the sql statement.

    for (var [key, attr] of Object.entries(tableAttributes)) {

      // If attribute is not a foreign key.
      if (key !== "fks") {
        sqlStringLines.push(`${attr.name} ${attr.sqlType}`)
      }
      else {
        for (var [, fk] of Object.entries(attr)) {
          sqlStringLines.push(`${fk.name} INTEGER`);
          sqlStringLines.push(`FOREIGN KEY(${fk.name}) REFERENCES ${fk.refTable}(${fk.refAttr}) ON DELETE CASCADE`)
        }
      }
    }

    return sqlStringLines.join(",\n");
  }


  async loadSections() {
    // Query to get the number of notes each section contains.
    const sectionCountQuery = `
      SELECT COUNT(*)
      FROM ${this.NOTES_TB_NAME}
      WHERE ${this.SECTIONS_TB_NAME}.${this.SECTION_TB_ATTRS.pk.name} =
            ${this.NOTES_TB_NAME}.${this.NOTE_TB_ATTRS.fks.sectionKey.name}
    `

    const loadSectionsQuery = `
      SELECT *,
      (${sectionCountQuery}) AS "sectionCount"
      FROM ${this.SECTIONS_TB_NAME}
      ORDER BY ${this.SECTION_TB_ATTRS.sectionOrder.name}
    `

    const result = await this.sqlDb.query(loadSectionsQuery);

    console.log("Loaded sections");
    return result.values;
  }


  async loadSectionNotes(sectionKey) {
    const loadSectionNotesQuery = `
      SELECT * FROM ${this.NOTES_TB_NAME}
      WHERE ${this.SECTION_TB_ATTRS.pk.name}=${sectionKey}
    `

    const result = await this.sqlDb.query(loadSectionNotesQuery);
    this.setSectionNotes(result.values);

    console.log("Loaded section notes");
  }


  async addSection(sections) {
    // Add section to the database.
    const attrNamesStrList = this.attrNamesToStrList(this.SECTION_TB_ATTRS);
    const attrDefValsStrList = this.attrDefValsToStrList(this.SECTION_TB_ATTRS);

    const addSectionQuery = `
      INSERT INTO ${this.SECTIONS_TB_NAME} (${attrNamesStrList})
      VALUES(${attrDefValsStrList});
    `

    const result = await this.runSql(addSectionQuery);
    const sectionKey = result.changes.lastId;

    // Set section order equal to section key to use for ordering.
    await this.changeSectionOrder(sectionKey, sectionKey);


    // Add locally without needing to re-load all the sections to re-render.
    const newSectionObj = await this.getSection(sectionKey);

    const newSections = [...sections];
    newSections.push(newSectionObj);

    console.log("Section added");

    return newSections
  }


  attrNamesToStrList(attributes) {
    var attrNames = [];

    for (var [key, attr] of Object.entries(attributes)) {
      if (key === "pk") continue;

      if (key !== "fks") {
        attrNames.push(attr.name);
      }
      else {
        for (var [, fk] of Object.entries(attr)) {
          attrNames.push(fk.name);
        }
      }
    }

    return attrNames.join(",");
  }


  attrDefValsToStrList(attributes) {
    var attrDefValues = [];

    for (var [key, attr] of Object.entries(attributes)) {
      if (key === "pk") continue;

      if (key !== "fks") {
        if (attr.defaultValue === "") {
          attrDefValues.push("\"\"");
        } else {
          attrDefValues.push(attr.defaultValue);
        }
      }
    }

    return attrDefValues.join(",");
  }


  async getSection(sectionKey) {
    const getSectionQuery = `
      SELECT * FROM ${this.SECTIONS_TB_NAME}
      WHERE ${this.SECTION_TB_ATTRS.pk.name}=${sectionKey}
    `

    const result = await this.sqlDb.query(getSectionQuery);

    return result.values[0];
  }


  async changeSectionOrder(sectionKey, newSectionOrder) {
    const changeSectionOrderQuery = `
      UPDATE ${this.SECTIONS_TB_NAME}
      SET ${this.SECTION_TB_ATTRS.sectionOrder.name}="${newSectionOrder}"
      WHERE ${this.SECTION_TB_ATTRS.pk.name}=${sectionKey}
      `

    await this.runSql(changeSectionOrderQuery);
  }


  async addNote(sectionInView) {
    const attrNamesStrList = this.attrNamesToStrList(this.NOTE_TB_ATTRS);
    const attrDefValsStrList = this.attrDefValsToStrList(this.NOTE_TB_ATTRS);

    const addNoteQuery = `
      INSERT INTO ${this.NOTES_TB_NAME} (${attrNamesStrList})
      VALUES(${attrDefValsStrList}, ${sectionInView.sectionKey});
    `

    const result = await this.runSql(addNoteQuery);
    const noteKey = result.changes.lastId;

    const newNoteObj = await this.getNote(noteKey);

    const newSectionNotes = [...this.sectionNotes];
    newSectionNotes.push(newNoteObj);
    this.setSectionNotes(newSectionNotes);

    console.log("Note added");
  }


  async getNote(noteKey) {
    const getNoteQuery = `
      SELECT * FROM ${this.NOTES_TB_NAME}
      WHERE ${this.NOTE_TB_ATTRS.pk.name}=${noteKey}
    `

    const result = await this.sqlDb.query(getNoteQuery);

    return result.values[0];
  }


  async changeSectionName(sectionKey, newSectionName) {
    const changeSectionNameQuery = `
      UPDATE ${this.SECTIONS_TB_NAME}
      SET ${this.SECTION_TB_ATTRS.sectionName.name}="${newSectionName}"
      WHERE ${this.SECTION_TB_ATTRS.pk.name}=${sectionKey}
    `

    await this.runSql(changeSectionNameQuery);
  }


  async changeNoteTitle(noteKey, newNoteTitle) {
    const changeNoteNameQuery = `
      UPDATE ${this.NOTES_TB_NAME}
      SET ${this.NOTE_TB_ATTRS.noteTitle.name}="${newNoteTitle}"
      WHERE ${this.NOTE_TB_ATTRS.pk.name}=${noteKey}
    `

    await this.runSql(changeNoteNameQuery);
  }


  async changeNoteText(noteKey, newNoteText) {
    const changeNoteTextQuery = `
      UPDATE ${this.NOTES_TB_NAME}
      SET ${this.NOTE_TB_ATTRS.noteText.name}="${newNoteText}"
      WHERE ${this.NOTE_TB_ATTRS.pk.name}=${noteKey}
    `

    await this.runSql(changeNoteTextQuery);
  }


  async deleteSection(sectionKey) {

    // Delete from DB.
    const deleteSectionQuery = `
      DELETE FROM ${this.SECTIONS_TB_NAME}
      WHERE ${this.SECTION_TB_ATTRS.pk.name}=${sectionKey}
    `
    await this.runSql(deleteSectionQuery);

    const deleteSectionNotesQuery = `
      DELETE FROM ${this.NOTES_TB_NAME}
      WHERE ${this.NOTE_TB_ATTRS.fks.sectionKey.name}=${sectionKey}
    `
    await this.runSql(deleteSectionNotesQuery);


    // Delete locally for re-render without re-loading.
    const sectionIndex = this.sections.findIndex(section => section.sectionKey === sectionKey);

    const newSections = [...this.sections];
    newSections.splice(sectionIndex, 1);
    this.setSections(newSections);

    console.log("Deleted section");
  }


  async deleteNote(noteKey, sectionKey) {
    const deleteNoteQuery = `
      DELETE FROM ${this.NOTES_TB_NAME}
      WHERE ${this.NOTE_TB_ATTRS.pk.name}=${noteKey}
    `
    await this.runSql(deleteNoteQuery);


    const noteIndex = this.sectionNotes.findIndex(note => note.noteKey === noteKey);

    const newSectionNotes = [...this.sectionNotes];
    newSectionNotes.splice(noteIndex, 1);
    this.setSectionNotes(newSectionNotes);
  }


  async moveNote(note, currentSectionKey, newSectionKey) {
    if (newSectionKey !== "" && newSectionKey !== currentSectionKey) {
      // DB: Change note key.
      const moveNoteQuery = `
        UPDATE ${this.NOTES_TB_NAME}
        SET ${this.NOTE_TB_ATTRS.fks.sectionKey.name}=${newSectionKey}
        WHERE ${this.NOTE_TB_ATTRS.pk.name}=${note.noteKey}
      `

      await this.runSql(moveNoteQuery);

      // Delete note locally from sectionNotes for re-render.
      const currNoteKey = note.noteKey;
      const noteIndex = this.sectionNotes.findIndex(note => note.noteKey === currNoteKey);

      const newSectionNotes = [...this.sectionNotes];
      newSectionNotes.splice(noteIndex, 1);
      this.setSectionNotes(newSectionNotes);
    }
  }


  async setNotePriority(noteKey, newPriority) {
    const setNotePrioQuery = `
       UPDATE ${this.NOTES_TB_NAME}
       SET ${this.NOTE_TB_ATTRS.notePrio.name}=${newPriority}
       WHERE ${this.NOTE_TB_ATTRS.pk.name}=${noteKey}
    `

    await this.runSql(setNotePrioQuery);

    const noteIndex = this.sectionNotes.findIndex(note => note.noteKey === noteKey);

    const newSectionNotes = [...this.sectionNotes];
    newSectionNotes[noteIndex].notePrio = newPriority;
    this.setSectionNotes(newSectionNotes);
  }


  async swapSectionsOrder(dragHistory, finalSourceIndex, finalDestIndex) {
    const newSections = [...this.sections];

    for (const drag of dragHistory) {
      const sourceIndex = drag.source.index;
      const destIndex = drag.dest.index;

      const sourceSection = this.sections[sourceIndex];
      const destSection = this.sections[destIndex];

      // Swapping db values.
      await this.changeSectionOrder(sourceSection.sectionKey, destSection.sectionOrder);
      await this.changeSectionOrder(destSection.sectionKey, sourceSection.sectionOrder);

      // Swapping local values.
      const tempSection = newSections[sourceIndex];
      newSections[sourceIndex].sectionOrder = destSection.sectionOrder;
      newSections[destIndex].sectionOrder = tempSection.sectionOrder;
    }

    newSections.splice(finalDestIndex, 0, newSections.splice(finalSourceIndex, 1)[0]);

    this.setSections(newSections);

    this.loadSections();
  }
}


export default DataHandler;