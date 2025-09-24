const IS_LOGGED_IN_KEY = 'isLoggedIn';

// Fonction pour vérifier si le code est exécuté dans un navigateur
const isBrowser = () => typeof window !== 'undefined';

export const login = (email: string, password: string): boolean => {
  // Attention : ceci est une authentification factice pour le développement.
  // Dans une application réelle, il faudrait un appel sécurisé à un backend.
  if (email === 'contact@clofas241.online' && password === 'admin') {
    if (isBrowser()) {
      localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (isBrowser()) {
    localStorage.removeItem(IS_LOGGED_IN_KEY);
  }
};

export const isLoggedIn = (): boolean => {
  // Si on est sur le serveur, l'utilisateur n'est jamais considéré comme connecté.
  if (!isBrowser()) {
    return false;
  }
  return localStorage.getItem(IS_LOGGED_IN_KEY) === 'true';
};
