import { useState, useEffect } from 'react';
import { ref, onValue, set, update } from 'firebase/database';
import { database } from '@/services/firebase';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  features: {
    registrationEnabled: boolean;
    galleryEnabled: boolean;
    blogEnabled: boolean;
    newsletterEnabled: boolean;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  updatedAt: string;
}

export const useSiteSettingsFirebase = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const settingsRef = ref(database, 'siteSettings');
    
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          setSettings(data as SiteSettings);
        } else {
          // Créer des paramètres par défaut
          const defaultSettings: SiteSettings = {
            siteName: 'CLOFAS 241',
            siteDescription: 'Festival de Mode et de Création au Gabon',
            siteUrl: 'https://clofas241.ga',
            contactEmail: 'contact@clofas241.ga',
            contactPhone: '+241 XX XX XX XX',
            socialMedia: {
              facebook: 'https://facebook.com/clofas241',
              instagram: 'https://instagram.com/clofas241',
              twitter: 'https://twitter.com/clofas241'
            },
            theme: {
              primaryColor: '#FF6B6B',
              secondaryColor: '#FFD93D',
              accentColor: '#6BCF7F'
            },
            features: {
              registrationEnabled: true,
              galleryEnabled: true,
              blogEnabled: false,
              newsletterEnabled: true
            },
            seo: {
              title: 'CLOFAS 241 - Festival de Mode Gabon',
              description: 'Le plus grand festival de mode et de création du Gabon',
              keywords: ['mode', 'gabon', 'fashion', 'création', 'festival']
            },
            updatedAt: new Date().toISOString()
          };
          setSettings(defaultSettings);
        }
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSettings = async (updates: Partial<SiteSettings>) => {
    try {
      const settingsRef = ref(database, 'siteSettings');
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await update(settingsRef, updateData);
    } catch (err: any) {
      throw new Error(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const resetToDefaults = async () => {
    try {
      const defaultSettings: SiteSettings = {
        siteName: 'CLOFAS 241',
        siteDescription: 'Festival de Mode et de Création au Gabon',
        siteUrl: 'https://clofas241.ga',
        contactEmail: 'contact@clofas241.ga',
        contactPhone: '+241 XX XX XX XX',
        socialMedia: {
          facebook: 'https://facebook.com/clofas241',
          instagram: 'https://instagram.com/clofas241',
          twitter: 'https://twitter.com/clofas241'
        },
        theme: {
          primaryColor: '#FF6B6B',
          secondaryColor: '#FFD93D',
          accentColor: '#6BCF7F'
        },
        features: {
          registrationEnabled: true,
          galleryEnabled: true,
          blogEnabled: false,
          newsletterEnabled: true
        },
        seo: {
          title: 'CLOFAS 241 - Festival de Mode Gabon',
          description: 'Le plus grand festival de mode et de création du Gabon',
          keywords: ['mode', 'gabon', 'fashion', 'création', 'festival']
        },
        updatedAt: new Date().toISOString()
      };
      
      const settingsRef = ref(database, 'siteSettings');
      await set(settingsRef, defaultSettings);
    } catch (err: any) {
      throw new Error(`Erreur lors de la réinitialisation: ${err.message}`);
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    resetToDefaults
  };
};
