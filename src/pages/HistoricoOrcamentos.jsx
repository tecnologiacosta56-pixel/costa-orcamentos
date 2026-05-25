import { useEffect, useState } from "react";

import {
  Link,
} from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export default function HistoricoOrcamentos() {

  const [budgets, setBudgets] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // =========================
  // FILTER STATUS
  // =========================
  const [statusFilter, setStatusFilter] =
    useState("Todos");

  // =========================
  // LOAD FIRESTORE
  // =========================
  useEffect(() => {

    async function loadBudgets() {

      try {

        const q = query(
          collection(db, "orcamentos"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot =
          await getDocs(q);

        const data = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setBudgets(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    loadBudgets();

  }, []);

  // =========================
  // SEARCH + FILTER
  // =========================
  const filteredBudgets =
    budgets.filter((budget) => {

      const client =
        budget.clientName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const phone =
        budget.phone
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesSearch =
        client || phone;

      const currentStatus =
        budget.status || "Pendente";

      const matchesStatus =
        statusFilter === "Todos"
          ? true
          : currentStatus === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // =========================
  // STATUS COLORS
  // =========================
  function getStatusStyle(status) {

    switch (status) {

      case "Aprovado":
        return "bg-green-500/20 text-green-400 border border-green-500/30";

      case "Recusado":
        return "bg-red-500/20 text-red-400 border border-red-500/30";

      case "Enviado":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";

      case "Finalizado":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";

      default:
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    }
  }

  // =========================
  // UPDATE STATUS
  // =========================
  async function handleStatusChange(
    budgetId,
    newStatus
  ) {

    try {

      // =========================
      // UPDATE FIRESTORE
      // =========================
      await updateDoc(
        doc(db, "orcamentos", budgetId),
        {
          status: newStatus,
          updatedAt: new Date(),
        }
      );

      // =========================
      // UPDATE LOCAL STATE
      // =========================
      setBudgets((prev) =>
        prev.map((budget) => {

          if (
            budget.id === budgetId
          ) {

            return {
              ...budget,
              status: newStatus,
            };
          }

          return budget;
        })
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao atualizar status."
      );
    }
  }

  // =========================
  // WHATSAPP REENVIO
  // =========================
  function resendWhatsApp(budget) {

    const cleanPhone =
      budget.phone.replace(/\D/g, "");

    const budgetUrl =
      `https://costa-orcamentos.vercel.app/orcamento/${budget.id}`;

    const message = `
Olá ${budget.clientName} 👋

Segue novamente seu orçamento da Costa Automation.

📄 Acesse abaixo:

${budgetUrl}

Costa Automation
`;

    const whatsappUrl =
      `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
  }

  // =========================
  // DELETE
  // =========================
  async function handleDelete(id) {

    const confirmDelete =
      window.confirm(
        "Deseja realmente excluir este orçamento?"
      );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, "orcamentos", id)
      );

      setBudgets((prev) =>
        prev.filter(
          (budget) =>
            budget.id !== id
        )
      );

      alert(
        "Orçamento excluído com sucesso."
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao excluir orçamento."
      );
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        <p className="text-cyan-400 text-xl">
          Carregando histórico...
        </p>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-cyan-400 mb-3">
            Histórico de Orçamentos
          </h1>

          <p className="text-zinc-400">
            Localize clientes e gerencie orçamentos rapidamente.
          </p>

        </div>

        {/* SEARCH */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Buscar cliente ou telefone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-[#0B1120] border border-cyan-500/20 rounded-2xl px-5 py-4 text-white outline-none"
          />

        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-10">

          {[
            "Todos",
            "Pendente",
            "Enviado",
            "Aprovado",
            "Recusado",
            "Finalizado",
          ].map((status) => (

            <button
              key={status}
              onClick={() =>
                setStatusFilter(status)
              }
              className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                statusFilter === status
                  ? "bg-cyan-500 text-black"
                  : "bg-[#0B1120] border border-cyan-500/20 text-white hover:border-cyan-400"
              }`}
            >
              {status}
            </button>

          ))}

        </div>

        {/* EMPTY */}
        {filteredBudgets.length === 0 && (

          <div className="bg-[#0B1120] border border-cyan-500/10 rounded-3xl p-10 text-center">

            <p className="text-zinc-400">
              Nenhum orçamento encontrado.
            </p>

          </div>
        )}

        {/* LIST */}
        <div className="grid gap-6">

          {filteredBudgets.map((budget) => {

            const status =
              budget.status || "Pendente";

            return (

              <div
                key={budget.id}
                className="bg-[#0B1120] border border-cyan-500/10 rounded-3xl p-6 shadow-2xl"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  {/* INFO */}
                  <div className="space-y-3">

                    {/* TOP */}
                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-2xl font-bold text-white">
                        {budget.clientName}
                      </h2>

                      {/* STATUS */}
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle(status)}`}
                      >
                        {status}
                      </span>

                    </div>

                    {/* SELECT STATUS */}
                    <div>

                      <select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(
                            budget.id,
                            e.target.value
                          )
                        }
                        className="bg-[#050816] border border-cyan-500/20 rounded-xl px-4 py-2 text-sm text-white outline-none"
                      >

                        <option value="Pendente">
                          Pendente
                        </option>

                        <option value="Enviado">
                          Enviado
                        </option>

                        <option value="Aprovado">
                          Aprovado
                        </option>

                        <option value="Recusado">
                          Recusado
                        </option>

                        <option value="Finalizado">
                          Finalizado
                        </option>

                      </select>

                    </div>

                    <p className="text-zinc-400">
                      📞 {budget.phone}
                    </p>

                    <p className="text-zinc-400 break-words">
                      📍 {budget.address}
                    </p>

                    <p className="text-cyan-400 font-bold text-2xl pt-2">
                      R$ {Number(
                        budget.total || 0
                      ).toFixed(2)}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3">

                    {/* ABRIR */}
                    <a
                      href={`/orcamento/${budget.id}`}
                      target="_blank"
                      className="bg-cyan-500 hover:bg-cyan-400 transition-all px-5 py-3 rounded-xl font-semibold text-black"
                    >
                      Abrir
                    </a>

                    {/* EDITAR */}
                    <Link
                      to={`/editar/${budget.id}`}
                      className="bg-yellow-500 hover:bg-yellow-400 transition-all px-5 py-3 rounded-xl font-semibold text-black"
                    >
                      Editar
                    </Link>

                    {/* WHATSAPP */}
                    <button
                      onClick={() =>
                        resendWhatsApp(budget)
                      }
                      className="bg-green-500 hover:bg-green-400 transition-all px-5 py-3 rounded-xl font-semibold text-white"
                    >
                      WhatsApp
                    </button>

                    {/* EXCLUIR */}
                    <button
                      onClick={() =>
                        handleDelete(
                          budget.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-500 transition-all px-5 py-3 rounded-xl font-semibold text-white"
                    >
                      Excluir
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}