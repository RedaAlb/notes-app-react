import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";


class DataHandler {
  constructor() {
    this.initJeepSqlite();

    this.DB_NAME = "notes_db";

    this.SECTIONS_TB_NAME = "sections";  // TB: table
    this.SECTION_PK_NAME = "sectionKey";  // PK: Primary key

    this.SECTION_ATTRIBUTES = [
      { name: "sectionName", sqlType: "TEXT", defaultValue: "" },
      { name: "sectionCount", sqlType: "INTEGER", defaultValue: 0 },
      { name: "sectionOrder", sqlType: "INTEGER", defaultValue: 0 }
    ]

    this.NOTES_TB_NAME = "notes";
    this.NOTE_PK_NAME = "noteKey";

    this.NOTE_ATTRIBUTES = [
      { name: "noteTitle", sqlType: "TEXT", defaultValue: "" },
      { name: "noteText", sqlType: "TEXT", defaultValue: "" },
      { name: "notePrio", sqlType: "INTEGER", defaultValue: 0 },
    ]

    this.NOTE_FOREIGN_KEYS = [
      { fkAttrName: this.SECTION_PK_NAME, fkRefTable: this.SECTIONS_TB_NAME, fkRefAttr: this.SECTION_PK_NAME }
    ]
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

    await this.createTable(this.SECTIONS_TB_NAME, this.SECTION_PK_NAME, this.SECTION_ATTRIBUTES);
    await this.createTable(this.NOTES_TB_NAME, this.NOTE_PK_NAME, this.NOTE_ATTRIBUTES, this.NOTE_FOREIGN_KEYS);

    if (this.platform === "web") {
      this.sqlite.saveToStore(this.DB_NAME)
    }
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


  async createTable(tableName, tablePk, tableAttributes, foreignKeys = []) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${tablePk} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${this.attributesToSqlString(tableAttributes)}
        ${this.foreignKeysToSqlString(foreignKeys)}
      );
    `

    await this.runSql(createTableQuery);
  }


  attributesToSqlString(tableAttributes) {
    const sqlAttributeString = tableAttributes.map(attr => (
      `${attr.name} ${attr.sqlType}`
    ));

    return sqlAttributeString.join(",\n")
  }


  foreignKeysToSqlString(foreignKeys) {
    if (foreignKeys.length !== 0) {
      const sqlForeignKeysString = foreignKeys.map(fk => (
        `${fk.fkAttrName} INTEGER,\n` +
        `FOREIGN KEY(${fk.fkAttrName}) REFERENCES ${fk.fkRefTable}(${fk.fkRefAttr})` +
        `ON DELETE CASCADE`
      ));

      return "," + sqlForeignKeysString.join(",\n");
    }
    return ""
  }


  setStates(sections, setSections, sectionNotes, setSectionNotes) {
    this.sections = sections;
    this.setSections = setSections;

    this.sectionNotes = sectionNotes;
    this.setSectionNotes = setSectionNotes;
  }


  async loadSections() {
    const loadSectionsQuery = `
      SELECT * FROM ${this.SECTIONS_TB_NAME}
      ORDER BY sectionOrder
    `

    const result = await this.sqlDb.query(loadSectionsQuery);
    this.setSections(result.values);

    console.log("Loaded sections");
  }


  async loadSectionNotes(sectionKey) {
    const loadSectionNotesQuery = `
      SELECT * FROM ${this.NOTES_TB_NAME}
      WHERE ${this.SECTION_PK_NAME}=${sectionKey}
    `

    const result = await this.sqlDb.query(loadSectionNotesQuery);
    const resultObj = Object.fromEntries(result.values.map(note => [note.noteKey, note]));

    this.setSectionNotes(resultObj);

    console.log("Loaded section notes");
  }


  async addSection() {
    // Add section to the database.
    const attrNamesStrList = this.attrNamesToStrList(this.SECTION_ATTRIBUTES);
    const attrDefValsStrList = this.attrDefValsToStrList(this.SECTION_ATTRIBUTES);

    const addSectionQuery = `
      INSERT INTO ${this.SECTIONS_TB_NAME} (${attrNamesStrList})
      VALUES(${attrDefValsStrList});
    `

    const result = await this.runSql(addSectionQuery);
    const sectionKey = result.changes.lastId;

    // Set section order equal to section key to use for ordering.
    this.changeSectionOrder(sectionKey, sectionKey);


    // Add locally without needing to re-load all the sections to re-render.
    const newSectionObj = {}
    newSectionObj[this.SECTION_PK_NAME] = sectionKey;

    for (let attribute of this.SECTION_ATTRIBUTES) {
      newSectionObj[attribute.name] = attribute.defaultValue
    }

    newSectionObj["sectionOrder"] = sectionKey;


    const newSections = [...this.sections];
    newSections.push(newSectionObj);
    this.setSections(newSections);

    console.log("Section added");
  }

  async changeSectionOrder(sectionKey, newSectionOrder) {
    const changeSectionOrderQuery = `
      UPDATE ${this.SECTIONS_TB_NAME}
      SET sectionOrder="${newSectionOrder}"
      WHERE ${this.SECTION_PK_NAME}=${sectionKey}
    `

    await this.runSql(changeSectionOrderQuery);
  }


  async addNote(sectionInView) {
    const attrNamesStrList = this.attrNamesToStrList(this.NOTE_ATTRIBUTES);
    const attrDefValsStrList = this.attrDefValsToStrList(this.NOTE_ATTRIBUTES);

    const addNoteQuery = `
      INSERT INTO ${this.NOTES_TB_NAME} (${attrNamesStrList}, ${this.SECTION_PK_NAME})
      VALUES(${attrDefValsStrList}, ${sectionInView.sectionKey});
    `

    const result = await this.runSql(addNoteQuery);

    const newNoteObj = {}
    newNoteObj[this.NOTE_PK_NAME] = result.changes.lastId;

    for (let attribute of this.NOTE_ATTRIBUTES) {
      newNoteObj[attribute.name] = attribute.defaultValue
    }

    newNoteObj[this.SECTION_PK_NAME] = sectionInView.sectionKey;

    const newSectionNotes = { ...this.sectionNotes };
    newSectionNotes[result.changes.lastId] = newNoteObj;
    this.setSectionNotes(newSectionNotes);

    // Adding one to the section count.
    this.incrementSectionCount(sectionInView.sectionKey, 1);

    console.log("Note added");
  }


  attrNamesToStrList(attributes) {
    const attrNamesStrList = attributes.map(attr => (
      `${attr.name}`
    ))

    return attrNamesStrList.join(",")
  }


  attrDefValsToStrList(attributes) {
    const attrDefValsStrList = attributes.map(attr => {
      if (attr.defaultValue === "") {
        return "\"\""
      } else {
        return `${attr.defaultValue}`
      }
    })

    return attrDefValsStrList.join(",")
  }


  async incrementSectionCount(sectionKey, value) {
    const sectionIndex = this.sections.findIndex(section => section.sectionKey === sectionKey);

    const updateSectionCountQuery = `
      UPDATE ${this.SECTIONS_TB_NAME}
      SET sectionCount=${this.sections[sectionIndex].sectionCount + value}
      WHERE ${this.SECTION_PK_NAME}=${sectionKey}
    `

    await this.runSql(updateSectionCountQuery);

    const newSections = [...this.sections];
    newSections[sectionIndex].sectionCount = this.sections[sectionIndex].sectionCount + value
    this.setSections(newSections);
  }


  async changeSectionName(sectionKey, newSectionName) {
    const changeSectionNameQuery = `
      UPDATE ${this.SECTIONS_TB_NAME}
      SET sectionName="${newSectionName}"
      WHERE ${this.SECTION_PK_NAME}=${sectionKey}
    `

    await this.runSql(changeSectionNameQuery);
  }


  async changeNoteTitle(noteKey, newNoteTitle) {
    const changeNoteNameQuery = `
      UPDATE ${this.NOTES_TB_NAME}
      SET noteTitle="${newNoteTitle}"
      WHERE ${this.NOTE_PK_NAME}=${noteKey}
    `

    await this.runSql(changeNoteNameQuery);
  }


  async changeNoteText(noteKey, newNoteText) {
    const changeNoteTextQuery = `
      UPDATE ${this.NOTES_TB_NAME}
      SET noteText="${newNoteText}"
      WHERE ${this.NOTE_PK_NAME}=${noteKey}
    `

    await this.runSql(changeNoteTextQuery);
  }


  async deleteSection(sectionKey) {

    // Delete from DB.
    const deleteSectionQuery = `
      DELETE FROM ${this.SECTIONS_TB_NAME}
      WHERE ${this.SECTION_PK_NAME}=${sectionKey}
    `
    await this.runSql(deleteSectionQuery);

    const deleteSectionNotesQuery = `
      DELETE FROM ${this.NOTES_TB_NAME}
      WHERE ${this.SECTION_PK_NAME}=${sectionKey}
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
      WHERE ${this.NOTE_PK_NAME}=${noteKey}
    `
    await this.runSql(deleteNoteQuery);

    // Delete locally.
    const newSectionNotes = { ...this.sectionNotes };
    delete newSectionNotes[noteKey];
    this.setSectionNotes(newSectionNotes);

    // Update section count.
    this.incrementSectionCount(sectionKey, -1);
  }


  async moveNote(note, currentSectionKey, newSectionKey) {
    if (newSectionKey !== "" && newSectionKey !== currentSectionKey) {
      // DB: Change note key.
      const moveNoteQuery = `
        UPDATE ${this.NOTES_TB_NAME}
        SET sectionKey=${newSectionKey}
        WHERE ${this.NOTE_PK_NAME}=${note.noteKey}
      `

      await this.runSql(moveNoteQuery);

      // Delete note locally from sectionNotes for re-render.
      const newSectionNotes = { ...this.sectionNotes };
      delete newSectionNotes[note.noteKey];
      this.setSectionNotes(newSectionNotes);

      await this.incrementSectionCount(currentSectionKey, -1);
      this.incrementSectionCount(newSectionKey, 1);
    }
  }


  async setNotePriority(noteKey, newPriority) {
    const setNotePrioQuery = `
       UPDATE ${this.NOTES_TB_NAME}
       SET notePrio=${newPriority}
       WHERE ${this.NOTE_PK_NAME}=${noteKey}
    `

    await this.runSql(setNotePrioQuery);

    const newSectionNotes = { ...this.sectionNotes };
    newSectionNotes[noteKey].notePrio = newPriority;
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