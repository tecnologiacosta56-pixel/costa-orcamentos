import LeadTimeline from "./LeadTimeline";
console.log("🔥 LEAD SIDEBAR VERSÃO 15/06/2026");
function normalizePhone(phone = "") {
  return phone.replace(/\D/g, "");
}

function whatsappLink(lead) {
  const phone = `55${normalizePhone(lead?.telefone || "")}`;
  const msg = `Olá ${lead?.nome}, tudo bem?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function LeadSidebar({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-[420px] bg-[#0B1220] border-l border-cyan-500/20 shadow-2xl z-50 flex flex-col">

      {/* Cabeçalho */}
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

      {/* Informações */}
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

        <p className="text-xs text-gray-500">
          Criado em:{" "}
          {lead.createdAt?.toDate
            ? lead.createdAt.toDate().toLocaleString("pt-BR")
            : "-"}
        </p>

      </div>

      {/* Ações */}
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
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded-lg transition"
          disabled
        >
          Editar Lead (em breve)
        </button>

        <button
          className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg transition"
          disabled
        >
          Converter em Orçamento (em breve)
        </button>

      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        <LeadTimeline leadId={lead.id} />
      </div>

    </div>
  );
}