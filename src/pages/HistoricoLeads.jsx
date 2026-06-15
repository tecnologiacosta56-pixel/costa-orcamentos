import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import Header from "../components/layout/Header";
import LeadSidebar from "../components/LeadSidebar";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function HistoricoLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);

  const statusColumns = [
    "Novo",
    "Em Contato",
    "Proposta Enviada",
    "Fechado",
    "Perdido",
  ];

  useEffect(() => {
    const q = query(
      collection(db, "leads"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setLeads(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function updateLeadStatus(id, oldStatus, newStatus, lead) {
    try {
      const ref = doc(db, "leads", id);

      await updateDoc(ref, { status: newStatus });

      await addDoc(collection(db, "lead_history"), {
        leadId: id,
        nomeLead: lead.nome,
        fromStatus: oldStatus,
        toStatus: newStatus,
        createdAt: new Date(),
      });
    } catch (err) {
      console.error(err);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const leadId = active.id;
    const newStatus = over.id;

    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    updateLeadStatus(leadId, lead.status, newStatus, lead);
  }

  function normalizePhone(phone) {
    return phone?.replace(/\D/g, "") || "";
  }

  function whatsappLink(lead) {
    const phone = `55${normalizePhone(lead.telefone)}`;
    const msg = `Olá ${lead.nome}, vi seu contato sobre ${lead.servico}.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }

  const filtered = leads.filter(
    (l) =>
      l.nome?.toLowerCase().includes(search.toLowerCase()) ||
      l.telefone?.includes(search)
  );

  function getColumnStyle(status) {
    switch (status) {
      case "Novo":
        return "border-blue-500/40 bg-blue-500/5";
      case "Em Contato":
        return "border-yellow-500/40 bg-yellow-500/5";
      case "Proposta Enviada":
        return "border-purple-500/40 bg-purple-500/5";
      case "Fechado":
        return "border-green-500/40 bg-green-500/5";
      case "Perdido":
        return "border-red-500/40 bg-red-500/5";
      default:
        return "border-cyan-500/10 bg-[#0B1120]";
    }
  }

  function Column({ status }) {
    const { setNodeRef } = useDroppable({ id: status });

    const leadsInColumn = filtered.filter(
      (l) => l.status === status
    );

    const colorBar = {
      "Novo": "bg-blue-500",
      "Em Contato": "bg-yellow-500",
      "Proposta Enviada": "bg-purple-500",
      "Fechado": "bg-green-500",
      "Perdido": "bg-red-500",
    };

    return (
      <div
        ref={setNodeRef}
        className={`rounded-2xl border h-[650px] overflow-y-auto shadow-lg p-3 ${getColumnStyle(status)}`}
      >
        {/* HEADER COLUNA */}
        <div className="mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-sm flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${colorBar[status]}`} />
              {status}
            </h2>

            <span className="bg-white/10 text-white px-2 py-1 rounded-lg text-xs">
              {leadsInColumn.length}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {leadsInColumn.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </div>
    );
  }

  function LeadCard({ lead }) {
    const { attributes, listeners, setNodeRef, transform } =
      useDraggable({ id: lead.id });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={() => setSelectedLead(lead)}
        className="bg-[#08111F] p-4 rounded-2xl border border-white/10 hover:border-cyan-400 transition cursor-grab active:cursor-grabbing"
        style={{
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        }}
      >
        <h3 className="font-bold text-white text-sm">
          {lead.nome}
        </h3>

        <p className="text-xs text-zinc-400 mt-1">
          🔧 {lead.servico || "-"}
        </p>

        <div className="mt-3 text-xs text-zinc-400 space-y-1">
          <p>📞 {lead.telefone || "-"}</p>
          <p>📍 {lead.cidade || "-"}</p>
          <p className="text-cyan-400">
            Origem: {lead.origem || "Manual"}
          </p>
        </div>

        <a
          href={whatsappLink(lead)}
          target="_blank"
          rel="noreferrer"
          onPointerDown={(e) => e.stopPropagation()}
          className="mt-4 block text-center bg-green-600 hover:bg-green-500 rounded-xl py-2 text-sm font-medium transition"
        >
          WhatsApp
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Header />

      <main className="p-4 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6">
            CRM Pipeline
          </h1>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 p-3 rounded-xl bg-[#0B1120] border border-cyan-500/20"
            placeholder="Buscar lead..."
          />

          <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {statusColumns.map((status) => (
                <Column key={status} status={status} />
              ))}
            </div>
          </DndContext>
        </div>
      </main>

      <LeadSidebar
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}