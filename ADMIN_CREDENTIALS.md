# 🔐 Identifiants d'Administration CLOFAS 241

## 📋 **Coordonnées de Connexion**

### **Accès au Panel d'Administration**

| **Champ** | **Valeur** |
|-----------|------------|
| **Email** | `admin@clofas241.ga` |
| **Mot de passe** | `Clofas241Admin2024!` |

### **URLs d'Accès**

- **Page de connexion** : `http://localhost:8080/admin-login`
- **Panel d'administration** : `http://localhost:8080/admin`
- **Site principal** : `http://localhost:8080`

## 🚀 **Guide d'Utilisation**

### **1. Connexion au Panel Admin**

1. **Accéder à la page de connexion** :
   - Cliquer sur le bouton "Admin" dans le header du site
   - Ou aller directement sur `/admin-login`

2. **Saisir les identifiants** :
   - Email : `admin@clofas241.ga`
   - Mot de passe : `Clofas241Admin2024!`

3. **Accéder au panel** :
   - Après connexion, redirection automatique vers `/admin`
   - Interface d'administration complète disponible

### **2. Fonctionnalités du Panel**

#### **📊 Tableau de Bord**
- Vue d'ensemble des statistiques
- Métriques en temps réel
- Activité récente

#### **👥 Gestion des Inscriptions**
- Liste des participants
- Filtres et recherche
- Gestion des statuts
- Export des données

#### **🖼️ Gestion des Images**
- Upload via ImgBB (nécessite configuration)
- Organisation par catégories
- Métadonnées des images
- Galerie des créateurs

#### **📝 Gestion du Contenu**
- Édition des pages
- Gestion des textes
- Mise à jour du contenu

#### **⚙️ Paramètres du Site**
- Configuration générale
- Apparence et thème
- Paramètres de contact
- Configuration SEO

### **3. Sécurité**

#### **🔒 Authentification**
- Système d'authentification local
- Session persistante (localStorage)
- Déconnexion automatique

#### **🛡️ Protection des Routes**
- Toutes les routes `/admin/*` sont protégées
- Redirection vers la page de connexion si non authentifié
- Bouton de déconnexion disponible

### **4. Déconnexion**

#### **Méthodes de Déconnexion**
1. **Bouton de déconnexion** : En haut à droite du panel admin
2. **Nettoyage automatique** : Suppression des données de session
3. **Redirection** : Retour à la page d'accueil

## 🔧 **Configuration Avancée**

### **Variables d'Environnement**

Pour activer toutes les fonctionnalités, configurez dans `.env.local` :

```bash
# Clerk Authentication (optionnel)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_KEY_HERE

# ImgBB Configuration (pour l'upload d'images)
VITE_IMGBB_API_KEY=YOUR_IMGBB_API_KEY_HERE

# Firebase Configuration (pour la base de données)
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
VITE_FIREBASE_DATABASE_URL=https://pmmga-9f8a1-default-rtdb.firebaseio.com/
```

### **Fonctionnalités par Configuration**

| **Fonctionnalité** | **Sans Configuration** | **Avec Configuration** |
|-------------------|----------------------|----------------------|
| **Authentification** | ✅ Système local | ✅ Clerk + Local |
| **Upload d'images** | ❌ Messages d'erreur | ✅ ImgBB intégré |
| **Base de données** | ❌ Données mock | ✅ Firebase temps réel |
| **Panel admin** | ✅ Fonctionnel | ✅ Complet |

## 📞 **Support**

### **En cas de problème**
- **Email** : admin@clofas241.ga
- **Documentation** : Voir les fichiers README.md
- **Logs** : Vérifier la console du navigateur

### **Réinitialisation**
Si vous oubliez les identifiants, modifiez le fichier `src/components/AdminAuth.tsx` :
```typescript
const ADMIN_CREDENTIALS = {
  username: 'votre-email@exemple.com',
  password: 'votre-mot-de-passe'
};
```

---

**🎉 Votre panel d'administration CLOFAS 241 est maintenant opérationnel !**

**URL de connexion** : `http://localhost:8080/admin-login`
