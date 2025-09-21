import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from '@/config/firebase-config';

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Realtime Database
export const database = getDatabase(app);

export default app;
