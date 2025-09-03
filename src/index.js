import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// ✅ Patch ResizeObserver (helps reduce console spam, though Chrome bug may still show harmless warnings)
class ResizeObserverPatched extends ResizeObserver {
  constructor(callback) {
    super((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (e) {
        if (
          e.message.includes("ResizeObserver loop completed with undelivered notifications.") ||
          e.message.includes("ResizeObserver loop limit exceeded")
        ) {
          return; // ignore harmless ResizeObserver errors
        }
        throw e;
      }
    });
  }
}
window.ResizeObserver = ResizeObserverPatched;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);