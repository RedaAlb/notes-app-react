import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { initSqlDb } from "./utils/sql";

import "./css/index.css";
import "./css/topbar.css";
import "./css/section.css";
import "./css/note.css";
import "./css/components.css";


window.addEventListener('DOMContentLoaded', async () => {
  await initSqlDb();

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <App />
  )
})