import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

// =========================
// SAVE OR UPDATE LEAD
// =========================
export async function saveLead(
  leadData,
  leadId = null
) {
  try {

    const formattedData = {
      ...leadData,

      status:
        leadData.status ||
        "Novo",
    };

    // =========================
    // UPDATE
    // =========================
    if (leadId) {

      const docRef =
        doc(db, "leads", leadId);

      await updateDoc(docRef, {

        ...formattedData,

        updatedAt:
          new Date(),
      });

      console.log(
        "Lead atualizado:",
        leadId
      );

      return leadId;
    }

    // =========================
    // CREATE
    // =========================
    const docRef = await addDoc(

      collection(
        db,
        "leads"
      ),

      {

        ...formattedData,

        createdAt:
          new Date(),
      }
    );

    console.log(
      "Lead salvo:",
      docRef.id
    );

    return docRef.id;

  } catch (error) {

    console.error(
      "Erro ao salvar lead:",
      error
    );
  }
}