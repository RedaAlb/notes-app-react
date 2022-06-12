import * as sql from "./sql";


const SECTIONS_TB_NAME = "sections";  // TB: table
const SECTION_TB_ATTRS = {  // ATTRS: attributes
  pk: { name: "sectionKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },  // pk: primary key
  sectionName: { name: "sectionName", sqlType: "TEXT", defaultValue: "" },
  sectionOrder: { name: "sectionOrder", sqlType: "INTEGER", defaultValue: 0 },
  sectionCount: { name: "sectionCount", sqlType: "INTEGER", defaultValue: 0 }
}

const NOTES_TB_NAME = "notes";
const NOTE_TB_ATTRS = {
  pk: { name: "noteKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
  noteTitle: { name: "noteTitle", sqlType: "TEXT", defaultValue: "" },
  noteText: { name: "noteText", sqlType: "TEXT", defaultValue: "" },
  notePrio: { name: "notePrio", sqlType: "INTEGER", defaultValue: 0 },  // notePrio: note priority
  fks: {  // fks: foreign keys
    sectionKey: { name: SECTION_TB_ATTRS.pk.name, refTable: SECTIONS_TB_NAME, refAttr: SECTION_TB_ATTRS.pk.name },
  }
}


const NOTE_INSERT_TRIGGER = `
  CREATE TRIGGER IF NOT EXISTS incrementSectionCount
  AFTER INSERT ON ${NOTES_TB_NAME}
  BEGIN
    UPDATE ${SECTIONS_TB_NAME}
    SET ${SECTION_TB_ATTRS.sectionCount.name} = ${SECTION_TB_ATTRS.sectionCount.name} + 1
    WHERE ${SECTION_TB_ATTRS.pk.name} = NEW.${NOTE_TB_ATTRS.fks.sectionKey.name};
  END
`
const NOTE_DELETE_TRIGGER = `
  CREATE TRIGGER IF NOT EXISTS decrementSectionCount
  AFTER DELETE ON ${NOTES_TB_NAME}
  BEGIN
    UPDATE ${SECTIONS_TB_NAME}
    SET ${SECTION_TB_ATTRS.sectionCount.name} = ${SECTION_TB_ATTRS.sectionCount.name} - 1
    WHERE ${SECTION_TB_ATTRS.pk.name} = OLD.${NOTE_TB_ATTRS.fks.sectionKey.name};
  END
`


export const createNotesAppTables = async () => {
  await sql.createTable(SECTIONS_TB_NAME, SECTION_TB_ATTRS);
  await sql.createTable(NOTES_TB_NAME, NOTE_TB_ATTRS);

  await sql.runSql(NOTE_INSERT_TRIGGER);
  await sql.runSql(NOTE_DELETE_TRIGGER);
}


export const loadSections = async () => {
  const loadSectionsQuery = `
    SELECT * FROM ${SECTIONS_TB_NAME}
    ORDER BY ${SECTION_TB_ATTRS.sectionOrder.name}
  `

  const result = await sql.query(loadSectionsQuery);

  console.log("Loaded sections");

  return result.values;
}


export const loadSectionNotes = async (section) => {
  const loadSectionNotesQuery = `
    SELECT * FROM ${NOTES_TB_NAME}
    WHERE ${SECTION_TB_ATTRS.pk.name}=${section.sectionKey}
  `
  const result = await sql.query(loadSectionNotesQuery);

  console.log("Loaded section notes");

  return result.values;
}


export const addSection = async () => {
  // Add section to the database.
  const attrNamesStrList = sql.attrNamesToStrList(SECTION_TB_ATTRS);
  const attrDefValsStrList = sql.attrDefValsToStrList(SECTION_TB_ATTRS);

  const addSectionQuery = `
    INSERT INTO ${SECTIONS_TB_NAME} (${attrNamesStrList})
    VALUES(${attrDefValsStrList});
  `

  const result = await sql.runSql(addSectionQuery);
  const sectionKey = result.changes.lastId;

  // Set section order equal to section key to use for ordering.
  await changeSectionOrder(sectionKey, sectionKey);


  // Get and return added section which will be added locally in state.
  const newSectionObj = await getSection(sectionKey);

  console.log("Section added");

  return newSectionObj;
}


export const getSection = async (sectionKey) => {
  const getSectionQuery = `
    SELECT * FROM ${SECTIONS_TB_NAME}
    WHERE ${SECTION_TB_ATTRS.pk.name} = ${sectionKey}
  `

  const result = await sql.query(getSectionQuery);

  return result.values[0];
}


export const changeSectionOrder = async (sectionKey, newSectionOrder) => {
  const changeSectionOrderQuery = `
    UPDATE ${SECTIONS_TB_NAME}
    SET ${SECTION_TB_ATTRS.sectionOrder.name} = "${newSectionOrder}"
    WHERE ${SECTION_TB_ATTRS.pk.name} = ${sectionKey}
  `

  await sql.runSql(changeSectionOrderQuery);
}


export const swapSectionsOrder = async (sections, dragHistory, finalSourceIndex, finalDestIndex) => {
  const newSections = [...sections];

  for (const drag of dragHistory) {
    const sourceIndex = drag.source.index;
    const destIndex = drag.dest.index;

    const sourceSection = newSections[sourceIndex];
    const destSection = newSections[destIndex];

    // // Swapping db values.
    await changeSectionOrder(sourceSection.sectionKey, destSection.sectionOrder);
    await changeSectionOrder(destSection.sectionKey, sourceSection.sectionOrder);


    // // Swapping local values.
    const tempSection = newSections[sourceIndex];

    const newSection = { ...newSections[sourceIndex] };
    newSection.sectionOrder = destSection.sectionOrder;
    newSections[sourceIndex] = newSection;

    const newSection2 = { ...newSections[destIndex] };
    newSection2.sectionOrder = tempSection.sectionOrder;
    newSections[destIndex] = newSection2;
  }

  newSections.splice(finalDestIndex, 0, newSections.splice(finalSourceIndex, 1)[0]);

  return newSections;
}


export const addNote = async (sectionInView) => {
  const attrNamesStrList = sql.attrNamesToStrList(NOTE_TB_ATTRS);
  const attrDefValsStrList = sql.attrDefValsToStrList(NOTE_TB_ATTRS);

  const addNoteQuery = `
    INSERT INTO ${NOTES_TB_NAME} (${attrNamesStrList})
    VALUES(${attrDefValsStrList}, ${sectionInView.sectionKey});
  `

  const result = await sql.runSql(addNoteQuery);
  const noteKey = result.changes.lastId;

  const newNoteObj = await getNote(noteKey);

  console.log("Note added");

  return newNoteObj;
}


export const getNote = async (noteKey) => {
  const getNoteQuery = `
    SELECT * FROM ${NOTES_TB_NAME}
    WHERE ${NOTE_TB_ATTRS.pk.name} = ${noteKey}
  `

  const result = await sql.query(getNoteQuery);

  return result.values[0];
}


export const changeSectionName = async (section, newSectionName) => {
  const changeSectionNameQuery = `
    UPDATE ${SECTIONS_TB_NAME}
    SET ${SECTION_TB_ATTRS.sectionName.name} = "${newSectionName}"
    WHERE ${SECTION_TB_ATTRS.pk.name} = ${section.sectionKey}
  `

  await sql.runSql(changeSectionNameQuery);
}


export const changeNoteTitle = async (note, newNoteTitle) => {
  const changeNoteNameQuery = `
    UPDATE ${NOTES_TB_NAME}
    SET ${NOTE_TB_ATTRS.noteTitle.name} = "${newNoteTitle}"
    WHERE ${NOTE_TB_ATTRS.pk.name} = ${note.noteKey}
  `

  await sql.runSql(changeNoteNameQuery);
}


export const changeNoteText = async (note, newNoteText) => {
  const changeNoteTextQuery = `
    UPDATE ${NOTES_TB_NAME}
    SET ${NOTE_TB_ATTRS.noteText.name} = "${newNoteText}"
    WHERE ${NOTE_TB_ATTRS.pk.name} = ${note.noteKey}
  `

  await sql.runSql(changeNoteTextQuery);
}


export const deleteSection = async (section) => {
  const deleteSectionQuery = `
    DELETE FROM ${SECTIONS_TB_NAME}
    WHERE ${SECTION_TB_ATTRS.pk.name} = ${section.sectionKey}
  `
  await sql.runSql(deleteSectionQuery);


  const deleteSectionNotesQuery = `
    DELETE FROM ${NOTES_TB_NAME}
    WHERE ${NOTE_TB_ATTRS.fks.sectionKey.name} = ${section.sectionKey}
  `
  await sql.runSql(deleteSectionNotesQuery);
}


export const deleteNote = async (note) => {
  const deleteNoteQuery = `
    DELETE FROM ${NOTES_TB_NAME}
    WHERE ${NOTE_TB_ATTRS.pk.name} = ${note.noteKey}
  `
  await sql.runSql(deleteNoteQuery);
}


export const setNotePriority = async (note, newPriority) => {
  const setNotePrioQuery = `
    UPDATE ${NOTES_TB_NAME}
    SET ${NOTE_TB_ATTRS.notePrio.name} = ${newPriority}
    WHERE ${NOTE_TB_ATTRS.pk.name} = ${note.noteKey}
  `

  await sql.runSql(setNotePrioQuery);
}


export const moveNote = async (note, newSectionKey) => {
  const moveNoteQuery = `
    UPDATE ${NOTES_TB_NAME}
    SET ${NOTE_TB_ATTRS.fks.sectionKey.name} = ${newSectionKey}
    WHERE ${NOTE_TB_ATTRS.pk.name} = ${note.noteKey}
  `

  await sql.runSql(moveNoteQuery);
}