import { saveLead } from "../../firebase/saveLead";

// =========================
// NORMALIZA TELEFONE
// =========================
function normalizePhone(phone = "") {
  return phone.replace(/\D/g, "");
}

// =========================
// PADRONIZA NOME
// =========================
function normalizeName(name = "") {
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// =========================
// PREPARA O LEAD
// =========================
function prepareLead(leadData) {
  return {
    ...leadData,

    nome: normalizeName(leadData.nome || ""),

    telefone: normalizePhone(leadData.telefone || ""),

    status: leadData.status || "Novo",

    origem: leadData.origem || "Manual",
  };
}

// =========================
// SERVIÇO PRINCIPAL
// =========================
export async function createLead(leadData) {
  const preparedLead = prepareLead(leadData);

  return await saveLead(preparedLead);
}

// =========================
// ATUALIZA LEAD
// =========================
export async function updateLead(leadId, leadData) {
  const preparedLead = prepareLead(leadData);

  return await saveLead(preparedLead, leadId);
}