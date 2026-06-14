import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App";

import OrcamentoView from "./pages/OrcamentoView";
import HistoricoOrcamentos from "./pages/HistoricoOrcamentos";
import HistoricoLeads from "./pages/HistoricoLeads";
import "./index.css";

// =========================
// PROTEÇÃO TEMPORÁRIA
// =========================
function ProtectedHistorico() {

  const senha = prompt(
    "Digite a senha de acesso:"
  );

  if (senha !== "Costa2026") {

    alert("Acesso negado.");

    return <Navigate to="/" />;
  }

  return <HistoricoOrcamentos />;
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        {/* NOVO ORÇAMENTO */}
        <Route
          path="/"
          element={<App />}
        />

        {/* EDITAR */}
        <Route
          path="/editar/:id"
          element={<App />}
        />

        {/* HISTÓRICO PROTEGIDO */}
        <Route
          path="/historico"
          element={<ProtectedHistorico />}
          
        />
<Route
  path="/leads"
  element={<HistoricoLeads />}
/>
        {/* VISUALIZAÇÃO PÚBLICA */}
        <Route
          path="/orcamento/:id"
          element={<OrcamentoView />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);