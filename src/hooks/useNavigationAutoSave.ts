import { useAutoSave } from './useAutoSave';

export interface NavigationItem {
  name: string;
  path: string;
  order: number;
  visible: boolean;
}

export interface NavigationSettings {
  items: NavigationItem[];
  logo: {
    text: string;
    showSubtitle: boolean;
    subtitle: string;
  };
  style: {
    backgroundColor: string;
    textColor: string;
    hoverColor: string;
  };
}

const useNavigationAutoSave = () => {
  const initialNavigation: NavigationSettings = {
    items: [
      { name: 'Accueil', path: '/', order: 1, visible: true },
      { name: 'Createurs', path: '/creators', order: 2, visible: true },
      { name: 'A Propos', path: '/about', order: 3, visible: true },
      { name: 'Programme', path: '/program', order: 4, visible: true },
      { name: 'Galerie', path: '/gallery', order: 5, visible: true },
      { name: 'Partenaires', path: '/partners', order: 6, visible: true },
      { name: 'Contact', path: '/contact', order: 7, visible: true }
    ],
    logo: {
      text: 'CLOFAS 241',
      showSubtitle: true,
      subtitle: 'Mode Gabonaise'
    },
    style: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      textColor: '#374151',
      hoverColor: '#8B5CF6'
    }
  };

  return useAutoSave('site/navigation', initialNavigation, {
    debounceMs: 800,
    onSave: () => {
      console.log('✅ Navigation sauvegardée dans Firebase');
    },
    onError: (error) => {
      console.error('❌ Erreur de sauvegarde de la navigation:', error);
    }
  });
};

export default useNavigationAutoSave;
