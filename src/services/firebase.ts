import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

// Configuration Firebase directe pour votre base de données
const firebaseConfig = {
  databaseURL: 'https://pmmga-9f8a1-default-rtdb.firebaseio.com/'
};

// Initialiser Firebase (éviter la duplication)
let app;
let database;

try {
  // Vérifier si une app existe déjà
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  database = getDatabase(app);
  
  // Log de confirmation
  console.log('✅ Firebase Realtime Database initialisé avec succès');
  console.log('📡 URL de la base de données:', firebaseConfig.databaseURL);
  console.log('🔗 Connexion directe à votre base de données Firebase');
} catch (error: any) {
  console.error('❌ Erreur lors de l\'initialisation Firebase:', error);
  throw error;
}

export { app, database };
export default { app, database };
