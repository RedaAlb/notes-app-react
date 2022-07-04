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
  exerciseOrder: { name: "exerciseOrder", sqlType: "INTEGER", defaultValue: 0 },
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

const EXERCISE_ORDER = `
  ORDER BY ${EXERCISE_TB_ATTRS.exerciseOrder.name} DESC
`

const EXERLOG_ORDER = `
  ORDER BY ${EXERLOG_TB_ATTRS.exerlogCreateDate.name} DESC
`


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
  await sql.deleteTable(EXERCISE_TB_NAME);
  await sql.deleteTable(EXERLOG_TB_NAME);

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


export const loadExercises = async (bodypart) => {
  const loadExercisesQuery = `
    SELECT * FROM ${EXERCISE_TB_NAME}
    WHERE ${EXERCISE_TB_ATTRS.fks.bodypartKey.name} = ${bodypart.bodypartKey}
    ${EXERCISE_ORDER}
  `
  const result = await sql.query(loadExercisesQuery);

  console.log("Loaded exercises");

  return result.values;
}


export const loadExerlogs = async (exercise) => {
  const loadExerlogsQuery = `
    SELECT * FROM ${EXERLOG_TB_NAME}
    WHERE ${EXERLOG_TB_ATTRS.fks.exerciseKey.name} = ${exercise.exerciseKey}
    ${EXERLOG_ORDER}
  `
  const result = await sql.query(loadExerlogsQuery);

  console.log("Loaded exerlogs");

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


export const addExercise = async (bodypart) => {
  const attrNamesStrList = sql.attrNamesToStrList(EXERCISE_TB_ATTRS);
  const attrDefValsStrList = await sql.attrDefValsToStrList(EXERCISE_TB_ATTRS);

  const addExerciseQuery = `
    INSERT INTO ${EXERCISE_TB_NAME} (${attrNamesStrList})
    VALUES(${attrDefValsStrList}, ${bodypart.bodypartKey});
  `

  const result = await sql.runSql(addExerciseQuery);
  const exerciseKey = result.changes.lastId;

  // Set exercise order equal to exercise key to use for ordering.
  await changeExerciseOrder(exerciseKey, exerciseKey);


  // Get and return added exercise which will be added locally in state.
  const newExerciseObj = await getExercise(exerciseKey);

  console.log("Exercise added");

  return newExerciseObj;
}


export const addExerlog = async (exercise) => {
  const attrNamesStrList = sql.attrNamesToStrList(EXERLOG_TB_ATTRS);
  const attrDefValsStrList = await sql.attrDefValsToStrList(EXERLOG_TB_ATTRS);

  const addExerlogQuery = `
    INSERT INTO ${EXERLOG_TB_NAME} (${attrNamesStrList})
    VALUES(${attrDefValsStrList}, ${exercise.exerciseKey});
  `

  const result = await sql.runSql(addExerlogQuery);
  const exerlogKey = result.changes.lastId;


  // Get and return added exerlog which will be added locally in state.
  const newExerlogObj = await getExerlog(exerlogKey);

  console.log("Exerlog added");

  return newExerlogObj;
}


export const changeBodypartOrder = async (bodypartKey, newBodypartOrder) => {
  const changeBodypartOrderQuery = `
    UPDATE ${BODYPARTS_TB_NAME}
    SET ${BODYPART_TB_ATTRS.bodypartOrder.name} = "${newBodypartOrder}"
    WHERE ${BODYPART_TB_ATTRS.pk.name} = ${bodypartKey}
  `

  await sql.runSql(changeBodypartOrderQuery);
}


export const changeExerciseOrder = async (exerciseKey, newExerciseOrder) => {
  const changeExerciseOrderQuery = `
    UPDATE ${EXERCISE_TB_NAME}
    SET ${EXERCISE_TB_ATTRS.exerciseOrder.name} = "${newExerciseOrder}"
    WHERE ${EXERCISE_TB_ATTRS.pk.name} = ${exerciseKey}
  `

  await sql.runSql(changeExerciseOrderQuery);
}


export const getBodypart = async (bodypartKey) => {
  const getBodypartQuery = `
    SELECT * FROM ${BODYPARTS_TB_NAME}
    WHERE ${BODYPART_TB_ATTRS.pk.name} = ${bodypartKey}
  `

  const result = await sql.query(getBodypartQuery);

  return result.values[0];
}


export const getExercise = async (exerciseKey) => {
  const getExerciseQuery = `
    SELECT * FROM ${EXERCISE_TB_NAME}
    WHERE ${EXERCISE_TB_ATTRS.pk.name} = ${exerciseKey}
  `

  const result = await sql.query(getExerciseQuery);

  return result.values[0];
}


export const getExerlog = async (exerlogKey) => {
  const getExerlogQuery = `
    SELECT * FROM ${EXERLOG_TB_NAME}
    WHERE ${EXERLOG_TB_ATTRS.pk.name} = ${exerlogKey}
  `

  const result = await sql.query(getExerlogQuery);

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


export const changeExerciseName = async (exercise, newExerciseName) => {
  const newExerciseNameCleaned = sql.cleanStringForSql(newExerciseName);

  const changeExerciseNameQuery = `
    UPDATE ${EXERCISE_TB_NAME}
    SET ${EXERCISE_TB_ATTRS.exerciseName.name} = "${newExerciseNameCleaned}"
    WHERE ${EXERCISE_TB_ATTRS.pk.name} = ${exercise.exerciseKey}
  `

  await sql.runSql(changeExerciseNameQuery);
}


export const changeExerlogWeight = async (exerlog, newExerlogWeight) => {
  const changeExerlogWeightQuery = `
    UPDATE ${EXERLOG_TB_NAME}
    SET ${EXERLOG_TB_ATTRS.exerlogWeight.name} = ${newExerlogWeight}
    WHERE ${EXERLOG_TB_ATTRS.pk.name} = ${exerlog.exerlogKey}
  `

  await sql.runSql(changeExerlogWeightQuery);
}


export const changeExerlogDate = async (exerlog, newExerlogDate) => {
  const changeExerlogDateQuery = `
    UPDATE ${EXERLOG_TB_NAME}
    SET ${EXERLOG_TB_ATTRS.exerlogCreateDate.name} = "${newExerlogDate}"
    WHERE ${EXERLOG_TB_ATTRS.pk.name} = ${exerlog.exerlogKey}
  `

  await sql.runSql(changeExerlogDateQuery);
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


export const swapExercisesOrder = async (exercises, dragHistory, finalSourceIndex, finalDestIndex) => {
  const newExercises = [...exercises];

  for (const drag of dragHistory) {
    const sourceIndex = drag.source.index;
    const destIndex = drag.dest.index;

    const sourceExercise = newExercises[sourceIndex];
    const destExercise = newExercises[destIndex];

    // // Swapping db values.
    await changeExerciseOrder(sourceExercise.exerciseKey, destExercise.exerciseOrder);
    await changeExerciseOrder(destExercise.exerciseKey, sourceExercise.exerciseOrder);


    // // Swapping local values.
    const tempExercise = newExercises[sourceIndex];

    const newExercise = { ...newExercises[sourceIndex] };
    newExercise.exerciseOrder = destExercise.exerciseOrder;
    newExercises[sourceIndex] = newExercise;

    const newExercise2 = { ...newExercises[destIndex] };
    newExercise2.exerciseOrder = tempExercise.exerciseOrder;
    newExercises[destIndex] = newExercise2;
  }

  newExercises.splice(finalDestIndex, 0, newExercises.splice(finalSourceIndex, 1)[0]);

  return newExercises;
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


export const deleteExercise = async (exercise) => {
  const deleteExerciseQuery = `
    DELETE FROM ${EXERCISE_TB_NAME}
    WHERE ${EXERCISE_TB_ATTRS.pk.name} = ${exercise.exerciseKey}
  `
  await sql.runSql(deleteExerciseQuery);


  const deleteExerclogsQuery = `
    DELETE FROM ${EXERLOG_TB_NAME}
    WHERE ${EXERLOG_TB_ATTRS.fks.exerciseKey.name} = ${exercise.exerciseKey}
  `
  await sql.runSql(deleteExerclogsQuery);
}


export const deleteExerlog = async (exerlog) => {
  const deleteExerlogQuery = `
    DELETE FROM ${EXERLOG_TB_NAME}
    WHERE ${EXERLOG_TB_ATTRS.pk.name} = ${exerlog.exerlogKey}
  `
  await sql.runSql(deleteExerlogQuery);
}