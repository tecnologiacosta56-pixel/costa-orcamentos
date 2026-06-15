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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

      <div className="bg-[#0B1220] border border-cyan-500/20 shadow-2xl rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Cabeçalho */}
        <div className="p-5 border-b border-cyan-500/20 flex justify-between items-start">
          <div>
            <h2 className="text-white font-bold text-2xl">
              {lead.nome}
            </h2>

            <p className="text-sm text-cyan-400 mt-1">
              📞 {lead.telefone}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition"
          >
            ✕
          </button>
        </div>

        {isEditing ? (
          <div className="p-5">
            <LeadForm
              lead={lead}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <>
            {/* Informações */}
            <div className="p-5 grid md:grid-cols-2 gap-4">

              <div className="bg-[#111827] rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">
                  Cidade
                </p>

                <p className="text-gray-200 text-lg">
                  📍 {lead.cidade || "-"}
                </p>
              </div>

              <div className="bg-[#111827] rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">
                  Serviço
                </p>

                <p className="text-gray-200 text-lg">
                  🔧 {lead.servico || "-"}
                </p>
              </div>

              <div className="bg-[#111827] rounded-xl p-4 md:col-span-2">
                <p className="text-xs text-gray-500 mb-2">
                  Descrição
                </p>

                <p className="text-gray-200">
                  📝 {lead.descricao || "-"}
                </p>
              </div>

            </div>

            {/* Status */}
            <div className="px-5 pb-5 flex justify-between items-center">
              <span className="text-cyan-400 font-medium">
                Status: {lead.status}
              </span>

              <span className="text-gray-500">
                Origem: {lead.origem || "Manual"}
              </span>
            </div>

            {/* Botões */}
            <div className="px-5 pb-5 space-y-3">

              <a
                href={whatsappLink(lead)}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-500 py-3 rounded-xl font-medium transition"
              >
                Abrir WhatsApp
              </a>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-medium transition"
              >
                Editar Lead
              </button>

              <button
                disabled
                className="w-full bg-purple-600 py-3 rounded-xl opacity-60 font-medium"
              >
                Converter em Orçamento (em breve)
              </button>

            </div>

            {/* Timeline */}
            <div className="border-t border-cyan-500/10 p-5">
              <h3 className="text-cyan-400 font-semibold mb-4">
                Histórico do Lead
              </h3>

              <LeadTimeline leadId={lead.id} />
            </div>

          </>
        )}

      </div>
    </div>
  );
}