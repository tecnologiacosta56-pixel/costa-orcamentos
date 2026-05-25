import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrjD47nEFu2JtMbWtwKYjiM62QileAoTo",
  authDomain: "costa-orcamentos.firebaseapp.com",
  projectId: "costa-orcamentos",
  storageBucket: "costa-orcamentos.firebasestorage.app",
  messagingSenderId: "239814075041",
  appId: "1:239814075041:web:4245a30428a82598b8c6e0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);