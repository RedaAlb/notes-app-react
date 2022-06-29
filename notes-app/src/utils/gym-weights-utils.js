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

const EXERCISE_ORDER = `
  ORDER BY ${EXERCISE_TB_ATTRS.exerciseCreateDate.name} DESC
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



