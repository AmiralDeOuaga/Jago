import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "AIzaSyAn1kSnAzJF862qEtAaaDccepDWnyM3-3g",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "yoman-d45bf.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "yoman-d45bf",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "yoman-d45bf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| "515991232927",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "1:515991232927:web:26741e2c4f2a7c6c435daa",
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     || "G-3DZWR7EQJ5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Persistance robuste : IndexedDB en priorité (meilleur pour Capacitor), fallback localStorage
export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});

// Analytics — initialisé uniquement si supporté (pas dans certains contextes Capacitor)
let analyticsInstance = null;
isSupported().then(yes => {
  if (yes) analyticsInstance = getAnalytics(app);
}).catch(() => {});

export const trackEvent = (eventName, params = {}) => {
  if (analyticsInstance) logEvent(analyticsInstance, eventName, params);
};
