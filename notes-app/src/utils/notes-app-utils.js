import * as sql from "./sql";


const SECTIONS_TB_NAME = "sections";  // TB: table
const SECTION_TB_ATTRS = {  // ATTRS: attributes
  pk: { name: "sectionKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },  // pk: primary key
  sectionName: { name: "sectionName", sqlType: "TEXT", defaultValue: "" },
  sectionOrder: { name: "sectionOrder", sqlType: "INTEGER", defaultValue: 0 },
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


export const createNotesAppTables = async () => {
  await sql.createTable(SECTIONS_TB_NAME, SECTION_TB_ATTRS);
  await sql.createTable(NOTES_TB_NAME, NOTE_TB_ATTRS);
}


export const loadSections = async () => {
  // Query to get the number of notes each section contains.
  const sectionCountQuery = `
    SELECT COUNT(*)
    FROM ${NOTES_TB_NAME}
    WHERE ${SECTIONS_TB_NAME}.${SECTION_TB_ATTRS.pk.name} =
          ${NOTES_TB_NAME}.${NOTE_TB_ATTRS.fks.sectionKey.name}
  `

  const loadSectionsQuery = `
    SELECT *,
    (${sectionCountQuery}) AS "sectionCount"
    FROM ${SECTIONS_TB_NAME}
    ORDER BY ${SECTION_TB_ATTRS.sectionOrder.name}
  `

  const result = await sql.query(loadSectionsQuery);

  console.log("Loaded sections");

  return result.values;
}


export const loadSectionNotes = async () => {

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
  // const newSections = [...sections];

  for (const drag of dragHistory) {
    const sourceIndex = drag.source.index;
    const destIndex = drag.dest.index;

    const sourceSection = sections[sourceIndex];
    const destSection = sections[destIndex];

    // Swapping db values.
    await changeSectionOrder(sourceSection.sectionKey, destSection.sectionOrder);
    await changeSectionOrder(destSection.sectionKey, sourceSection.sectionOrder);

    // Swapping local values.
    // const tempSection = newSections[sourceIndex];
    // newSections[sourceIndex].sectionOrder = destSection.sectionOrder;
    // newSections[destIndex].sectionOrder = tempSection.sectionOrder;
  }

  // newSections.splice(finalDestIndex, 0, newSections.splice(finalSourceIndex, 1)[0]);

  loadSections();
}


export const addNote = async (sectionInView) => {

}


export const getNote = async (noteKey) => {

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

}


export const changeNoteText = async (note, newNoteText) => {

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

}


export const moveNote = async (note, currentSectionKey, newSectionKey) => {

}


export const setNotePriority = async () => {

}


