import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
