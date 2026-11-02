import { Navigate } from "react-router-dom";
import HistoricoOrcamentos from "../pages/HistoricoOrcamentos";

// =========================
// PROTEÇÃO TEMPORÁRIA
// =========================
export default function ProtectedHistorico() {

  const senha = prompt(
    "Digite a senha de acesso:"
  );

  if (senha !== "Costa2026") {

    alert("Acesso negado.");

    return <Navigate to="/" />;
  }

  return <HistoricoOrcamentos />;
}

