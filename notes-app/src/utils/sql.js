import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";

import { createNotesAppTables } from "./notes-app-utils";


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


export const createTable = async (tableName, tableAttributes) => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
      ${attrsToCreateTbSqlString(tableAttributes)}
    );
    `

  await runSql(createTableQuery);
}


export const attrsToCreateTbSqlString = (tableAttributes) => {
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


export const attrNamesToStrList = (tableAttributes) => {
  var attrNames = [];

  for (var [key, attr] of Object.entries(tableAttributes)) {
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


export const attrDefValsToStrList = (tableAttributes) => {
  var attrDefValues = [];

  for (var [key, attr] of Object.entries(tableAttributes)) {
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