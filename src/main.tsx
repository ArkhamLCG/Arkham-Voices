import React from "react";
import ReactDOM from "react-dom/client";
import "@shared/config/i18n";
import { App } from "@app";
import "@app/styles/index.css";

// Old history URLs on GitHub Pages project site -> hash routes (BASE_URL is /repo/)
if (import.meta.env.PROD && import.meta.env.BASE_URL !== "/" && !window.location.hash) {
  const baseUrl = new URL(import.meta.env.BASE_URL, window.location.href);
  const basePath = baseUrl.pathname.replace(/\/$/, "");
  const { pathname } = window.location;
  if (pathname.startsWith(basePath) && pathname.length > basePath.length) {
    const rest = pathname.slice(basePath.length) || "/";
    const hashPath = rest.startsWith("/") ? rest : `/${rest}`;
    window.location.replace(`${baseUrl.origin}${baseUrl.pathname}#${hashPath}`);
  }
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Root element "#root" not found');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
