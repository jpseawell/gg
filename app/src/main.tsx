import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initAnalytics, trackAppPageView } from "./lib/analytics";
import "./styles.css";

initAnalytics();
trackAppPageView();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
