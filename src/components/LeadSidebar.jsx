import { useState } from "react";
import LeadTimeline from "./LeadTimeline";
import LeadForm from "./forms/LeadForm";
import { updateLead } from "./services/leadService";

function normalizePhone(phone = "") {
  return phone.replace(/\D/g, "");
}

function whatsappLink(lead) {
  const phone = `55${normalizePhone(lead?.telefone || "")}`;

  const msg = `Olá ${lead?.nome}, tudo bem?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function LeadSidebar({ lead, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!lead) return null;

  async function handleSave(formData) {
    try {
      await updateLead(lead.id, formData);

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
    }
  }

  return (
    <div className="fixed top-0 right-0 h-full w-[420px] bg-[#0B1220] border-l border-cyan-500/20 shadow-2xl z-50 flex flex-col">

      <div className="p-4 border-b border-cyan-500/20 flex justify-between items-start">

        <div>
          <h2 className="text-white font-semibold text-lg">
            {lead.nome}
          </h2>

          <p className="text-xs text-gray-400">
            {lead.telefone}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

      </div>

      {isEditing ? (
        <div className="flex-1 overflow-y-auto p-4">
          <LeadForm
            lead={lead}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <>
          <div className="p-4 space-y-3 border-b border-cyan-500/10">

            <p className="text-sm text-gray-300">
              📍 {lead.cidade || "-"}
            </p>

            <p className="text-sm text-gray-300">
              🔧 {lead.servico || "-"}
            </p>

            <p className="text-sm text-gray-300">
              📝 {lead.descricao || "-"}
            </p>

            <p className="text-sm text-cyan-400">
              Status: {lead.status}
            </p>

            <p className="text-xs text-gray-500">
              Origem: {lead.origem || "Manual"}
            </p>

          </div>

          <div className="p-4 space-y-2 border-b border-cyan-500/10">

            <a
              href={whatsappLink(lead)}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-green-600 hover:bg-green-500 py-2 rounded-lg transition"
            >
              Abrir WhatsApp
            </a>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded-lg transition"
            >
              Editar Lead
            </button>

            <button
              disabled
              className="w-full bg-purple-600 py-2 rounded-lg opacity-60"
            >
              Converter em Orçamento (em breve)
            </button>

          </div>

          <div className="flex-1 overflow-y-auto">
            <LeadTimeline leadId={lead.id} />
          </div>

        </>
      )}
    </div>
  );
}