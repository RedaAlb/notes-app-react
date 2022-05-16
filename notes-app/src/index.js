import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import DataHandler from "./DataHandler";

import "./css/index.css";
import "./css/topbar.css";
import "./css/section.css";
import "./css/note.css";


const dataHandler = new DataHandler();

window.addEventListener('DOMContentLoaded', async () => {
  await dataHandler.initSqlDb();

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App dataHandler={dataHandler} />
    </React.StrictMode>
  );
})