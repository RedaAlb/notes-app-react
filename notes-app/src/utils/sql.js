import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Geolocation } from '@capacitor/geolocation';

import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";

import { createNotesAppTables } from "./notes-app-utils";
import { DEFAULT_LOCATION_VAL, EXPORTS_DIR_NAME, SETTINGS_SAVE_LOCATION } from './constants';


const DB_NAME = "notes_db";

const platform = Capacitor.getPlatform();
const sqlite = new SQLiteConnection(CapacitorSQLite)

var sqlDb;


applyPolyfills().then(() => {
  jeepSqlite(window);
});


export const initSqlDb = async () => {
  try {
    if (platform === "web") {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
    }

    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection(DB_NAME)).result;

    if (ret.result && isConn) {
      sqlDb = await sqlite.retrieveConnection(DB_NAME);
    } else {
      sqlDb = await sqlite.createConnection(DB_NAME, false, "no-encryption", 1);
    }

    await sqlDb.open();

  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }

  await runSql("PRAGMA foreign_keys = ON;");

  await createNotesAppTables();

  console.log("SQL DB initialised");
}


export const deleteSqlDb = async () => {
  await CapacitorSQLite.deleteDatabase({ database: DB_NAME });
  window.location.reload();
}


export const deleteTable = async (tableName) => {
  const deleteTableQuery = `
    DROP TABLE IF EXISTS ${tableName};
  `

  await runSql(deleteTableQuery);
}


export const runSql = async (sqlString) => {
  const result = await sqlDb.run(sqlString);

  if (platform === "web") {
    sqlite.saveToStore(DB_NAME);
  }

  return result;
}


export const query = async (queryString) => {
  const result = await sqlDb.query(queryString);
  return result;
}


export const createTables = async (tables) => {
  for (const table of tables) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${table.tableName} (
        ${attrsToCreateTbSqlString(table.tableAttributes)}
      );
    `

    await runSql(createTableQuery);
  }
}


export const attrsToCreateTbSqlString = (tableAttributes) => {
  var sqlStringLines = []  // Will hold all lines of the sql statement.

  for (var [key, attr] of Object.entries(tableAttributes)) {
    switch (key) {
      case "pk": {
        sqlStringLines.push(`${attr.name} ${attr.sqlType}`);
        break;
      }
      case "fks": {
        for (var [, fk] of Object.entries(attr)) {
          sqlStringLines.push(`${fk.name} INTEGER`);
          sqlStringLines.push(`FOREIGN KEY(${fk.name}) REFERENCES ${fk.refTable}(${fk.refAttr}) ON DELETE CASCADE`)
        }
        break;
      }
      default: {
        var defValueSqlString;  // Used to get a correct default value that SQLite will accept.
        switch (attr.sqlType) {
          case "TEXT": defValueSqlString = attr.defaultValue === "" ? '""' : `${attr.defaultValue}`; break;
          case "INTEGER": defValueSqlString = attr.defaultValue; break;
          default: throw new Error(`Invalid SQLite data type on table creation for the ${attr.name} attribute.`);
        }

        sqlStringLines.push(`${attr.name} ${attr.sqlType} DEFAULT ${defValueSqlString} NOT NULL`)
      }
    }
  }

  return sqlStringLines.join(",\n");
}


export const attrNamesToStrList = (tableAttributes) => {
  var attrNames = [];

  for (var [key, attr] of Object.entries(tableAttributes)) {
    switch (key) {
      case "pk": continue;
      case "fks": {
        for (var [, fk] of Object.entries(attr)) {
          attrNames.push(fk.name);
        }
        break;
      }
      default: {
        attrNames.push(attr.name);
      }
    }
  }

  return attrNames.join(",");
}


export const attrDefValsToStrList = async (tableAttributes) => {
  var attrDefValues = [];

  for (var [key, attr] of Object.entries(tableAttributes)) {
    switch (key) {
      case "pk": continue;
      case "fks": continue;
      default: {
        switch (attr.defaultValue) {
          case "": attrDefValues.push("\"\""); break;
          case DEFAULT_LOCATION_VAL: {
            const { value } = await Storage.get({ key: SETTINGS_SAVE_LOCATION });

            // If location settings is not set or turned off in the user settings.
            if (value === null || value === "false") {
              attrDefValues.push(DEFAULT_LOCATION_VAL);
              break;
            }

            const position = await Geolocation.getCurrentPosition();

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationString = `"${latitude} ${longitude}"`
            attrDefValues.push(locationString);

            break;
          }
          default: {
            attrDefValues.push(attr.defaultValue);
          }
        }
      }
    }
  }

  return attrDefValues.join(",");
}


export const getCountTriggers = (triggers) => {
  const triggerSqlStatements = [];

  for (const trigger of triggers) {
    const INCREMENT_TRIGGER = `
      CREATE TRIGGER IF NOT EXISTS increment_${trigger.attributeName}
      AFTER INSERT ON ${trigger.triggerTbName}
      BEGIN
        UPDATE ${trigger.targetTbName}
        SET ${trigger.attributeName} = ${trigger.attributeName} + 1
        WHERE ${trigger.pkName} = NEW.${trigger.fkName};
      END
    `
    triggerSqlStatements.push(INCREMENT_TRIGGER);


    const DECREMENT_TRIGGER = `
      CREATE TRIGGER IF NOT EXISTS decrement_${trigger.attributeName}
      AFTER DELETE ON ${trigger.triggerTbName}
      BEGIN
        UPDATE ${trigger.targetTbName}
        SET ${trigger.attributeName} = ${trigger.attributeName} - 1
        WHERE ${trigger.pkName} = OLD.${trigger.fkName};
      END
    `
    triggerSqlStatements.push(DECREMENT_TRIGGER);
  }

  return triggerSqlStatements;
}


export const exportTables = async (fileNamePrefix, tableNames) => {
  const tablesJsonArray = [];

  // Getting all data from tables and converting them to json.
  for (const tableName of tableNames) {
    const result = await query(`SELECT * FROM ${tableName}`);
    const tableData = { tableName: tableName, data: result.values };

    tablesJsonArray.push(tableData);
  }

  const tablesJsonString = JSON.stringify(tablesJsonArray, null, 2);

  // Forming a unique filename.
  var dt = new Date();  // dt: dateTime
  const nowDateTimeString =
    `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}_${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`

  const fileName = `${fileNamePrefix}_${nowDateTimeString}`;

  await saveDataToFile(fileName, tablesJsonString);
}


export const saveDataToFile = async (fileName, dataToSave) => {
  if (platform === "web") {
    const element = document.createElement("a");
    const file = new Blob([dataToSave], {
      type: "text/plain;charset=utf-8"
    })

    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
  }
  else {
    // While loop is used here to ensure the directory is initially created.
    while (true) {
      try {
        await Filesystem.writeFile({
          path: `${EXPORTS_DIR_NAME}/${fileName}.txt`,
          data: dataToSave,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        })

        break;

      } catch (e) {
        await Filesystem.mkdir({
          path: `${EXPORTS_DIR_NAME}`,
          directory: Directory.Documents,
        })

        console.log("Directory created in documents");
      }
    }
  }
}


export const importDataFromFile = (setImportSnackbar) => {
  const input = document.createElement("input");
  input.type = "file";

  input.onchange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (readerEvent) => {
      const content = readerEvent.target.result;
      importTables(JSON.parse(content));
      setImportSnackbar(true);
    }
  }
  input.click();
}


export const importTables = async (json) => {
  // Deleting all triggers to prevent conflicts when inserting imported data.
  // All triggers are re-created at the end of the import.
  const allTriggers = await deleteAllTriggers();

  // Going through all the tables and inserting each row into the sql database.
  for (const table of json) {
    // Using the first row to get the attribute names.
    const tableAttributes = Object.keys(table.data[0]).join(",");

    const tableDataInsertValues = getTableInsertValues(table.data);

    const tableInsertDataQuery = `
      INSERT OR IGNORE INTO ${table.tableName} (${tableAttributes})
      VALUES
      ${tableDataInsertValues}
    `

    await runSql(tableInsertDataQuery);
  }

  await createTriggers(allTriggers);
}


export const getTableInsertValues = (tableData) => {
  const rowInsertStatements = [];  // Will hold all insert statements for all rows.

  // Converting row values into sql insert string format.
  for (const row of tableData) {
    const rowValuesString = Object.keys(row).map((key) => {
      const value = row[key];

      // Surround strings by quotes to maintain string formatting.
      if (typeof value === "string") return `"${cleanStringForSql(value)}"`
      else return value;

    }).join(",")

    const rowInsertStatement = `(${rowValuesString})`;
    rowInsertStatements.push(rowInsertStatement);
  }

  const tableDataInsertValues = rowInsertStatements.join(",");

  return tableDataInsertValues;
}


export const deleteAllTriggers = async () => {
  const allTriggersResult = await query(`SELECT * FROM sqlite_master WHERE type="trigger"`);

  for (const trigger of allTriggersResult.values) {
    await runSql(`DROP TRIGGER IF EXISTS ${trigger.name}`);
  }


  // Returning sql statements of all deleted triggers.
  const allTriggers = [];

  for (const trigger of allTriggersResult.values) {
    allTriggers.push(trigger.sql);
  }

  return allTriggers;
}


export const createTriggers = async (triggers) => {
  for (const trigger of triggers) {
    await runSql(trigger);
  }
}


export const getAllTableNames = async () => {
  const getAllTableNamesQuery = `
    SELECT name
    FROM sqlite_schema
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
  `

  const result = await query(getAllTableNamesQuery);

  const tableNames = result.values.map((item) => {
    return item["name"];
  })

  return tableNames;
}


export const exportDb = async () => {
  const tableNames = await getAllTableNames();

  await exportTables("db", tableNames);
}


export const cleanStringForSql = (stringText) => {
  // Escape quotation marks to maintain original text and prevent sql string error.
  const cleanedString = stringText.replaceAll("\"", "\"\"");

  return cleanedString;
}