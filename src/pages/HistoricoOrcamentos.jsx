import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export default function HistoricoOrcamentos() {

  const [budgets, setBudgets] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

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
  // SEARCH
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

      return client || phone;
    });

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
            Localize clientes e reenvie orçamentos rapidamente.
          </p>

        </div>

        {/* SEARCH */}
        <div className="mb-8">

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

          {filteredBudgets.map((budget) => (

            <div
              key={budget.id}
              className="bg-[#0B1120] border border-cyan-500/10 rounded-3xl p-6 shadow-2xl"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* INFO */}
                <div className="space-y-2">

                  <h2 className="text-2xl font-bold text-white">
                    {budget.clientName}
                  </h2>

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

                  {/* WHATSAPP */}
                  <button
                    onClick={() =>
                      resendWhatsApp(budget)
                    }
                    className="bg-green-500 hover:bg-green-400 transition-all px-5 py-3 rounded-xl font-semibold text-white"
                  >
                    WhatsApp
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}