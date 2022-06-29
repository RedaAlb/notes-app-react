import * as sql from "./sql";
import { DEFAULT_DATE_VAL, DEFAULT_LOCATION_VAL } from "./constants";


const BODYPARTS_TB_NAME = "bodyparts";
const BODYPART_TB_ATTRS = {
  pk: { name: "bodypartKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },  // pk: primary key
  bodypartName: { name: "bodypartName", sqlType: "TEXT", defaultValue: "" },
  bodypartOrder: { name: "bodypartOrder", sqlType: "INTEGER", defaultValue: 0 },
  bodypartCount: { name: "bodypartCount", sqlType: "INTEGER", defaultValue: 0 },
  bodypartLocation: { name: "bodypartLocation", sqlType: "TEXT", defaultValue: DEFAULT_LOCATION_VAL },
  bodypartCreateDate: { name: "bodypartCreateDate", sqlType: "TEXT", defaultValue: DEFAULT_DATE_VAL },
}

const EXERCISE_TB_NAME = "exercise";
const EXERCISE_TB_ATTRS = {
  pk: { name: "exerciseKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
  exerciseName: { name: "exerciseName", sqlType: "TEXT", defaultValue: "" },
  exerciseCount: { name: "exerciseCount", sqlType: "INTEGER", defaultValue: 0 },
  exerciseLocation: { name: "exerciseLocation", sqlType: "TEXT", defaultValue: DEFAULT_LOCATION_VAL },
  exerciseCreateDate: { name: "exerciseCreateDate", sqlType: "TEXT", defaultValue: DEFAULT_DATE_VAL },
  fks: {
    bodypartKey: { name: BODYPART_TB_ATTRS.pk.name, refTable: BODYPARTS_TB_NAME, refAttr: BODYPART_TB_ATTRS.pk.name },
  }
}

const EXERLOG_TB_NAME = "exerlog"  // exerlog: exercise log
const EXERLOG_TB_ATTRS = {
  pk: { name: "exerlogKey", sqlType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
  exerlogWeight: { name: "exerlogWeight", sqlType: "INTEGER", defaultValue: 0 },
  exerlogLocation: { name: "exerlogLocation", sqlType: "TEXT", defaultValue: DEFAULT_LOCATION_VAL },
  exerlogCreateDate: { name: "exerlogCreateDate", sqlType: "TEXT", defaultValue: DEFAULT_DATE_VAL },
  fks: {
    exerciseKey: { name: EXERCISE_TB_ATTRS.pk.name, refTable: EXERCISE_TB_NAME, refAttr: EXERCISE_TB_ATTRS.pk.name },
  }
}

// Trigger to automatically increment and decrement all the counts on exercise/exerlog insert and delete.
const countTriggers = [
  {
    triggerTbName: EXERCISE_TB_NAME,
    targetTbName: BODYPARTS_TB_NAME,
    attributeName: BODYPART_TB_ATTRS.bodypartCount.name,
    pkName: BODYPART_TB_ATTRS.pk.name,
    fkName: EXERCISE_TB_ATTRS.fks.bodypartKey.name
  },
  {
    triggerTbName: EXERLOG_TB_NAME,
    targetTbName: EXERCISE_TB_NAME,
    attributeName: EXERCISE_TB_ATTRS.exerciseCount.name,
    pkName: EXERCISE_TB_ATTRS.pk.name,
    fkName: EXERLOG_TB_ATTRS.fks.exerciseKey.name
  }
]


const BODYPARTS_ORDER = `
  ORDER BY ${BODYPART_TB_ATTRS.bodypartOrder.name}
`

// const EXERCISE_ORDER = `
//   ORDER BY ${EXERCISE_TB_ATTRS.exerciseCreateDate.name} DESC
// `

// const EXERLOG_ORDER = `
//   ORDER BY ${EXERLOG_TB_ATTRS.exerlogCreateDate.name} DESC
// `


export const createGymWeightsTables = async () => {
  await sql.createTables([
    { tableName: BODYPARTS_TB_NAME, tableAttributes: BODYPART_TB_ATTRS },
    { tableName: EXERCISE_TB_NAME, tableAttributes: EXERCISE_TB_ATTRS },
    { tableName: EXERLOG_TB_NAME, tableAttributes: EXERLOG_TB_ATTRS },
  ])

  const triggers = sql.getCountTriggers(countTriggers);
  await sql.createTriggers(triggers);
}


export const delAllGymWeightsTbs = async () => {
  await sql.deleteTable(BODYPARTS_TB_NAME);
  await sql.deleteTable(BODYPARTS_TB_NAME);
  await sql.deleteTable(BODYPARTS_TB_NAME);

  window.location.reload();
}


export const loadBodyparts = async () => {
  const loadBodypartsQuery = `
    SELECT * FROM ${BODYPARTS_TB_NAME}
    ${BODYPARTS_ORDER}
  `

  const result = await sql.query(loadBodypartsQuery);

  console.log("Loaded bodyparts");

  return result.values;
}


export const addBodypart = async () => {
  const attrNamesStrList = sql.attrNamesToStrList(BODYPART_TB_ATTRS);
  const attrDefValsStrList = await sql.attrDefValsToStrList(BODYPART_TB_ATTRS);

  const addBodypartQuery = `
    INSERT INTO ${BODYPARTS_TB_NAME} (${attrNamesStrList})
    VALUES(${attrDefValsStrList});
  `

  const result = await sql.runSql(addBodypartQuery);
  const bodypartKey = result.changes.lastId;

  // Set bodypart order equal to bodypart key to use for ordering.
  await changeBodypartOrder(bodypartKey, bodypartKey);


  // Get and return added bodypart which will be added locally in state.
  const newBodypartObj = await getBodypart(bodypartKey);

  console.log("Bodypart added");

  return newBodypartObj;
}


export const changeBodypartOrder = async (bodypartKey, newBodypartOrder) => {
  const changeBodypartOrderQuery = `
    UPDATE ${BODYPARTS_TB_NAME}
    SET ${BODYPART_TB_ATTRS.bodypartOrder.name} = "${newBodypartOrder}"
    WHERE ${BODYPART_TB_ATTRS.pk.name} = ${bodypartKey}
  `

  await sql.runSql(changeBodypartOrderQuery);
}


export const getBodypart = async (bodypartKey) => {
  const getBodypartQuery = `
    SELECT * FROM ${BODYPARTS_TB_NAME}
    WHERE ${BODYPART_TB_ATTRS.pk.name} = ${bodypartKey}
  `

  const result = await sql.query(getBodypartQuery);

  return result.values[0];
}


export const changeBodypartName = async (bodypart, newBodypartName) => {
  const newBodypartNameCleaned = sql.cleanStringForSql(newBodypartName);

  const changeBodypartNameQuery = `
    UPDATE ${BODYPARTS_TB_NAME}
    SET ${BODYPART_TB_ATTRS.bodypartName.name} = "${newBodypartNameCleaned}"
    WHERE ${BODYPART_TB_ATTRS.pk.name} = ${bodypart.bodypartKey}
  `

  await sql.runSql(changeBodypartNameQuery);
}


export const swapBodypartsOrder = async (bodyparts, dragHistory, finalSourceIndex, finalDestIndex) => {
  const newBodyparts = [...bodyparts];

  for (const drag of dragHistory) {
    const sourceIndex = drag.source.index;
    const destIndex = drag.dest.index;

    const sourceBodypart = newBodyparts[sourceIndex];
    const destBodypart = newBodyparts[destIndex];

    // // Swapping db values.
    await changeBodypartOrder(sourceBodypart.bodypartKey, destBodypart.bodypartOrder);
    await changeBodypartOrder(destBodypart.bodypartKey, sourceBodypart.bodypartOrder);


    // // Swapping local values.
    const tempBodypart = newBodyparts[sourceIndex];

    const newBodypart = { ...newBodyparts[sourceIndex] };
    newBodypart.bodypartOrder = destBodypart.bodypartOrder;
    newBodyparts[sourceIndex] = newBodypart;

    const newBodypart2 = { ...newBodyparts[destIndex] };
    newBodypart2.bodypartOrder = tempBodypart.bodypartOrder;
    newBodyparts[destIndex] = newBodypart2;
  }

  newBodyparts.splice(finalDestIndex, 0, newBodyparts.splice(finalSourceIndex, 1)[0]);

  return newBodyparts;
}


export const deleteBodypart = async (bodypart) => {
  const deleteBodypartQuery = `
    DELETE FROM ${BODYPARTS_TB_NAME}
    WHERE ${BODYPART_TB_ATTRS.pk.name} = ${bodypart.bodypartKey}
  `
  await sql.runSql(deleteBodypartQuery);


  const deleteExercisesQuery = `
    DELETE FROM ${EXERCISE_TB_NAME}
    WHERE ${EXERCISE_TB_ATTRS.fks.bodypartKey.name} = ${bodypart.bodypartKey}
  `
  await sql.runSql(deleteExercisesQuery);
}