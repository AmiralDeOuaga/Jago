import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn1kSnAzJF862qEtAaaDccepDWnyM3-3g",
  authDomain: "yoman-d45bf.firebaseapp.com",
  projectId: "yoman-d45bf",
  storageBucket: "yoman-d45bf.firebasestorage.app",
  messagingSenderId: "515991232927",
  appId: "1:515991232927:web:26741e2c4f2a7c6c435daa",
  measurementId: "G-3DZWR7EQJ5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Mode offline : les données Firestore sont mises en cache localement
// Permet à l'app de fonctionner même sans connexion internet
enableIndexedDbPersistence(db).catch(err => {
  if (err.code === "failed-precondition") {
    // Plusieurs onglets ouverts — persistence active sur un seul
    console.warn("Firestore offline: plusieurs onglets ouverts");
  } else if (err.code === "unimplemented") {
    // Navigateur trop ancien
    console.warn("Firestore offline: navigateur non supporté");
  }
});
