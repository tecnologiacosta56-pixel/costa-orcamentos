import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase/firebaseConfig";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function OrcamentoView() {

  const { id } = useParams();

  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadBudget() {

      try {

        const docRef = doc(db, "orcamentos", id);

        const docSnap = await getDoc(docRef);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Carregando orçamento...
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 flex items-center justify-center">
        Orçamento não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-cyan-500/20">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-cyan-400">
            Costa Automation
          </h1>

          <p className="text-zinc-400 mt-2">
            Orçamento Profissional
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div>
            <p className="text-zinc-500 text-sm">
              Cliente
            </p>

            <h2 className="text-2xl font-semibold">
              {budget.clientName}
            </h2>
          </div>

          <div>
            <p className="text-zinc-500 text-sm">
              Telefone
            </p>

            <h2 className="text-xl">
              {budget.phone}
            </h2>
          </div>

          <div className="md:col-span-2">
            <p className="text-zinc-500 text-sm">
              Endereço
            </p>

            <h2 className="text-xl">
              {budget.address}
            </h2>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-zinc-700">

                <th className="text-left py-4">
                  Item
                </th>

                <th className="text-right py-4">
                  Valor
                </th>

              </tr>
            </thead>

            <tbody>

              {budget.items?.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-800"
                >

                  <td className="py-4">
                    {item.name}
                  </td>

                  <td className="py-4 text-right">
                    R$ {Number(item.price).toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="mt-10 border-t border-zinc-700 pt-6">

          <div className="flex justify-between mb-3">

            <span className="text-zinc-400">
              Desconto
            </span>

            <span>
              R$ {Number(budget.discount || 0).toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between text-3xl font-bold text-cyan-400">

            <span>Total</span>

            <span>
              R$ {Number(budget.total).toFixed(2)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}