// Configuration Firebase pour CLOFAS 241
// Utilise les variables d'environnement Vite

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pmmga-9f8a1.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://pmmga-9f8a1-default-rtdb.firebaseio.com/",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pmmga-9f8a1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pmmga-9f8a1.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Structure de la base de données
export const databaseStructure = {
  registrations: {
    path: 'registrations',
    fields: ['name', 'email', 'phone', 'event', 'date', 'status', 'payment', 'notes', 'createdAt', 'updatedAt']
  },
  events: {
    path: 'events',
    fields: ['title', 'description', 'date', 'time', 'location', 'maxParticipants', 'currentParticipants', 'price', 'status', 'category', 'createdAt', 'updatedAt']
  },
  content: {
    path: 'content',
    fields: ['title', 'type', 'content', 'status', 'lastModified', 'author', 'createdAt', 'updatedAt']
  },
  images: {
    path: 'images',
    fields: ['name', 'url', 'category', 'tags', 'size', 'dimensions', 'uploadDate', 'author', 'alt', 'description', 'createdAt', 'updatedAt']
  },
  siteSettings: {
    path: 'siteSettings',
    fields: ['siteName', 'siteDescription', 'siteUrl', 'adminEmail', 'contactEmail', 'contactPhone', 'primaryColor', 'secondaryColor', 'accentColor', 'darkColor', 'fontFamily', 'headerFont', 'maintenanceMode', 'userRegistration', 'emailNotifications', 'analyticsEnabled', 'socialSharing', 'metaTitle', 'metaDescription', 'metaKeywords', 'facebookUrl', 'instagramUrl', 'twitterUrl', 'youtubeUrl', 'emailFrom', 'smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword', 'maxLoginAttempts', 'sessionTimeout', 'passwordMinLength', 'twoFactorAuth', 'updatedAt']
  }
};

// Règles de sécurité Firebase (à configurer dans la console Firebase)
export const securityRules = `
{
  "rules": {
    "registrations": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "events": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "content": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "images": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "siteSettings": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
`;

// Instructions de configuration
export const setupInstructions = `
# Configuration Firebase pour CLOFAS 241

## 1. Configuration de la base de données
- Allez dans la console Firebase : https://console.firebase.google.com/
- Sélectionnez votre projet : pmmga-9f8a1
- Allez dans "Realtime Database"
- Créez une base de données en mode test

## 2. Configuration des règles de sécurité
- Allez dans "Règles" dans la section Realtime Database
- Remplacez les règles par celles définies dans securityRules
- Publiez les règles

## 3. Configuration des clés API
- Allez dans "Paramètres du projet" > "Général"
- Copiez les clés de configuration
- Remplacez les valeurs dans firebaseConfig

## 4. Structure des données
La base de données sera organisée comme suit :
- registrations/ : Inscriptions aux événements
- events/ : Événements CLOFAS 241
- content/ : Contenu du site web
- images/ : Galerie d'images
- siteSettings/ : Paramètres du site

## 5. Authentification (optionnel)
- Activez l'authentification dans la console Firebase
- Configurez les méthodes d'authentification souhaitées
- Mettez à jour les règles de sécurité si nécessaire
`;
