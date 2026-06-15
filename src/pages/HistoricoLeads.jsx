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
  console.log("🚀 Versão 14/06/2026 - TESTE");

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
    console.log("🚀 HistoricoLeads carregado");

    const q = query(
      collection(db, "leads"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        console.log("🔥 Snapshot recebido!");
        console.log("📄 Quantidade:", snap.docs.length);

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setLeads(data);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Erro no onSnapshot:", error);
      }
    );

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
      console.error("Erro ao atualizar lead:", err);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  function onDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const leadId = active.id;
    const newStatus = over.id;

    const lead = leads.find((l) => l.id === leadId);

    if (!lead) return;

    updateLeadStatus(
      leadId,
      lead.status,
      newStatus,
      lead
    );
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

  function Column({ status }) {
    const { setNodeRef } = useDroppable({
      id: status,
    });

    const leadsInColumn = filtered.filter(
      (l) => l.status === status
    );

    return (
      <div
        ref={setNodeRef}
        className="bg-[#0B1120] rounded-2xl p-3 border border-cyan-500/10 min-h-[300px]"
      >
        <h2 className="text-cyan-400 font-bold text-sm mb-3">
          {status}
        </h2>

        <div className="space-y-3">
          {leadsInColumn.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
            />
          ))}
        </div>
      </div>
    );
  }

  function LeadCard({ lead }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
    } = useDraggable({
      id: lead.id,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={() => setSelectedLead(lead)}
        className="bg-[#050816] p-3 rounded-xl border border-cyan-500/10 hover:border-cyan-400 cursor-grab active:cursor-grabbing transition-all"
        style={{
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        }}
      >
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm">
              {lead.nome}
            </p>

            <p className="text-xs text-zinc-400">
              {lead.servico}
            </p>
          </div>

          <a
            href={whatsappLink(lead)}
            target="_blank"
            rel="noreferrer"
            className="text-green-400 text-xs"
            onPointerDown={(e) =>
              e.stopPropagation()
            }
          >
            WA
          </a>
        </div>

        <p className="text-xs text-zinc-500 mt-2">
          📞 {lead.telefone}
        </p>
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full mb-6 p-3 rounded-xl bg-[#0B1120] border border-cyan-500/20"
            placeholder="Buscar lead..."
          />

          <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {statusColumns.map((status) => (
                <Column
                  key={status}
                  status={status}
                />
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