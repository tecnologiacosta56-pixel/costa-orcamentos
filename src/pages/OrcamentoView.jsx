import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase/firebaseConfig";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import logo from "../assets/logo.png";

export default function OrcamentoView() {

  const { id } = useParams();

  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadBudget() {

      try {

        const docRef = doc(
          db,
          "orcamentos",
          id
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          setBudget(docSnap.data());

        } else {

          setBudget(null);

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    loadBudget();

  }, [id]);

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-cyan-400 text-lg">
            Carregando orçamento...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!budget) {

    return (

      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-6">

        <div className="bg-[#0B1120] border border-red-500/20 rounded-3xl p-10 text-center max-w-md w-full">

          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Orçamento não encontrado
          </h1>

          <p className="text-zinc-400">
            Verifique o link enviado ou entre em contato com a Costa Automation.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-10">

      <div className="max-w-5xl mx-auto">

        <div className="border border-cyan-500/20 bg-[#0B1120] rounded-3xl p-6 md:p-10 shadow-2xl">

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-10 border-b border-cyan-500/20 pb-6">

            <img
              src={logo}
              alt="Costa Automation"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-white">

                Costa <span className="text-cyan-400">Automation</span>

              </h1>

              <p className="text-zinc-400 mt-1">
                Sistema Inteligente de Orçamentos
              </p>

            </div>

          </div>

          {/* TITULO */}
          <div className="mb-10">

            <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 mb-2">
              Orçamento Profissional
            </h2>

            <p className="text-zinc-400">
              Documento gerado automaticamente pela plataforma Costa Automation.
            </p>

          </div>

          {/* CLIENTE */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">

            <div>

              <p className="text-zinc-500 text-sm mb-2">
                Cliente
              </p>

              <h2 className="text-2xl font-semibold break-words">
                {budget.clientName}
              </h2>

            </div>

            <div>

              <p className="text-zinc-500 text-sm mb-2">
                Telefone
              </p>

              <h2 className="text-xl break-words">
                {budget.phone}
              </h2>

            </div>

            <div className="md:col-span-2">

              <p className="text-zinc-500 text-sm mb-2">
                Endereço
              </p>

              <h2 className="text-xl break-words">
                {budget.address}
              </h2>

            </div>

          </div>

          {/* TABELA */}
          <div className="overflow-x-auto rounded-2xl border border-cyan-500/10">

            <table className="w-full">

              <thead className="bg-cyan-500/5">

                <tr className="border-b border-cyan-500/10">

                  <th className="text-left py-4 px-4 text-cyan-400">
                    Item
                  </th>

                  <th className="text-center py-4 px-4 text-cyan-400">
                    Qtd
                  </th>

                  <th className="text-right py-4 px-4 text-cyan-400">
                    Valor
                  </th>

                  <th className="text-right py-4 px-4 text-cyan-400">
                    Subtotal
                  </th>

                </tr>

              </thead>

              <tbody>

                {budget.items?.map((item, index) => {

                  const quantity =
                    Number(item.quantity || 0);

                  const price =
                    Number(item.price || 0);

                  const subtotal =
                    quantity * price;

                  return (

                    <tr
                      key={index}
                      className="border-b border-zinc-800"
                    >

                      <td className="py-4 px-4">
                        {item.name}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {quantity}
                      </td>

                      <td className="py-4 px-4 text-right">
                        R$ {price.toFixed(2)}
                      </td>

                      <td className="py-4 px-4 text-right text-cyan-400 font-semibold">
                        R$ {subtotal.toFixed(2)}
                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

          {/* TOTAL */}
          <div className="mt-10 border-t border-cyan-500/10 pt-6">

            <div className="flex justify-between mb-4">

              <span className="text-zinc-400">
                Desconto
              </span>

              <span className="text-white">
                R$ {Number(
                  budget.discount || 0
                ).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between items-center">

              <span className="text-3xl font-bold text-cyan-400">
                Total
              </span>

              <span className="text-3xl md:text-5xl font-bold text-cyan-400">
                R$ {Number(
                  budget.total || 0
                ).toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}