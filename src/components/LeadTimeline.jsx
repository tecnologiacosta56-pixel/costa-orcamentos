import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export default function LeadTimeline({ leadId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!leadId) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, "lead_history"),
      where("leadId", "==", leadId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHistory(data);
      },
      (error) => {
        console.error("Erro ao carregar histórico:", error);
      }
    );

    return () => unsubscribe();
  }, [leadId]);

  return (
    <div className="p-4">
      <h3 className="text-cyan-400 font-semibold mb-4">
        Histórico do Lead
      </h3>

      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Nenhuma movimentação encontrada.
        </p>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] border border-cyan-500/10 rounded-xl p-3"
            >
              <p className="text-sm text-white">
                {item.fromStatus} → {item.toStatus}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleString("pt-BR")
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}