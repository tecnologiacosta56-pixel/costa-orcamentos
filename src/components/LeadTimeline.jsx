import LeadTimeline from "./LeadTimeline";

export default function LeadSidebar({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-[420px] bg-[#0B1220] border-l border-cyan-500/20 shadow-2xl z-50 flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-cyan-500/20 flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-white font-semibold text-lg leading-tight">
            {lead?.nome || "Sem nome"}
          </h2>

          <p className="text-xs text-gray-400">
            {lead?.telefone || "Sem telefone"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-lg"
          title="Fechar painel"
        >
          ✕
        </button>
      </div>

      {/* INFO */}
      <div className="p-4 space-y-2 border-b border-cyan-500/10">
        <p className="text-sm text-gray-300">
          📍 {lead?.cidade || "Cidade não informada"}
        </p>

        <p className="text-sm text-gray-300">
          🔧 {lead?.servico || "Serviço não informado"}
        </p>

        <p className="text-xs text-gray-400">
          Status atual:
          <span className="text-cyan-400 ml-1 font-medium">
            {lead?.status || "Sem status"}
          </span>
        </p>

        {lead?.origem && (
          <p className="text-xs text-gray-500">
            Origem: {lead.origem}
          </p>
        )}
      </div>

      {/* TIMELINE */}
      <div className="flex-1 overflow-y-auto">
        <LeadTimeline leadId={lead?.id} />
      </div>
    </div>
  );
}