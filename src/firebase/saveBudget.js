import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

// =========================
// SAVE OR UPDATE
// =========================
export async function saveBudget(
  budgetData,
  budgetId = null
) {

  try {

    // =========================
    // DEFAULT STATUS
    // =========================
    const formattedData = {

      ...budgetData,

      status:
        budgetData.status ||
        "Pendente",
    };

    // =========================
    // UPDATE
    // =========================
    if (budgetId) {

      const docRef =
        doc(db, "orcamentos", budgetId);

      await updateDoc(docRef, {

        ...formattedData,

        updatedAt:
          new Date(),
      });

      console.log(
        "Orçamento atualizado:",
        budgetId
      );

      return budgetId;
    }

    // =========================
    // CREATE
    // =========================
    const docRef = await addDoc(

      collection(
        db,
        "orcamentos"
      ),

      {

        ...formattedData,

        createdAt:
          new Date(),
      }
    );

    console.log(
      "Orçamento salvo:",
      docRef.id
    );

    return docRef.id;

  } catch (error) {

    console.error(
      "Erro ao salvar orçamento:",
      error
    );
  }
}