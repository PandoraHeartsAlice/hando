import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "normalize.css";

import "./fonts/Inter/Inter-Regular.ttf";
import "./main.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
