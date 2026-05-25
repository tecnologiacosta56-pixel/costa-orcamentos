import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import OrcamentoView from "./pages/OrcamentoView";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Painel Admin */}
        <Route path="/" element={<App />} />

        {/* Página pública do cliente */}
        <Route
          path="/orcamento/:id"
          element={<OrcamentoView />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);