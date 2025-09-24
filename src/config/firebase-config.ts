import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuration Firebase - Remplacez par vos vraies clés
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "clofas-241.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://clofas-241-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "clofas-241",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "clofas-241.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Obtenir l'instance de la base de données
export const database = getDatabase(app);

export default app;