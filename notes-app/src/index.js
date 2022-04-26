import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/topbar.css";
import "./css/section.css";
import "./css/note.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);