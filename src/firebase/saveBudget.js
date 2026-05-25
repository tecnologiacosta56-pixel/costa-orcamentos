import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function saveBudget(budgetData) {
  try {

    const docRef = await addDoc(
      collection(db, "orcamentos"),
      {
        ...budgetData,
        createdAt: new Date(),
      }
    );

    console.log("Orçamento salvo com ID:", docRef.id);

    return docRef.id;

  } catch (error) {

    console.error("Erro ao salvar orçamento:", error);

  }
}