import LeadTimeline from "./LeadTimeline";

export default function LeadSidebar({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-[420px] bg-[#0B1220] border-l border-cyan-500/20 shadow-2xl z-50 flex flex-col">

      <div className="p-4 border-b border-cyan-500/20 flex justify-between items-start">
        <div>
          <h2 className="text-white font-semibold text-lg">
            {lead?.nome}
          </h2>
          <p className="text-xs text-gray-400">
            {lead?.telefone}
          </p>
        </div>

        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <div className="p-4 space-y-2 border-b border-cyan-500/10">
        <p className="text-sm text-gray-300">📍 {lead?.cidade}</p>
        <p className="text-sm text-gray-300">🔧 {lead?.servico}</p>
        <p className="text-xs text-cyan-400">{lead?.status}</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <LeadTimeline leadId={lead?.id} />
      </div>
    </div>
  );
}