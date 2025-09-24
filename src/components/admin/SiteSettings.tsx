import React from 'react';
import { useAutoSave } from '../../hooks/useAutoSave';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const SiteSettings: React.FC = () => {
  const initialSettings: SiteSettings = {
    siteName: 'CLOFAS 241',
    siteDescription: 'Consommation Locale Fashion Show 241 - Mode Gabonaise Authentique et Responsable',
    contactEmail: 'Beitchfaro@yahoo.fr',
    contactPhone: '+241 66 66 89 00',
    socialMedia: {
      instagram: '#',
      facebook: '#',
      twitter: '#'
    },
    theme: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#EC4899',
      accentColor: '#F59E0B'
    },
    seo: {
      metaTitle: 'CLOFAS 241 - Mode Gabonaise Authentique',
      metaDescription: 'Découvrez les créateurs de mode gabonaise lors du CLOFAS 241. Mode locale authentique et responsable.',
      keywords: ['mode gabonaise', 'CLOFAS', 'créateurs', 'fashion show', 'Gabon']
    }
  };

  const {
    data: settings,
    updateData: setSettings,
    isSaving,
    lastSaved,
    error: saveError
  } = useAutoSave('site/settings', initialSettings, {
    debounceMs: 1000,
    onSave: () => {
      console.log('✅ Paramètres du site sauvegardés dans Firebase');
    },
    onError: (error) => {
      console.error('❌ Erreur de sauvegarde des paramètres:', error);
    }
  });

  const handleInputChange = (path: string, value: any) => {
    const newSettings = { ...settings };
    const keys = path.split('.');
    let current = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i] as keyof typeof current] as any;
    }
    
    current[keys[keys.length - 1] as keyof typeof current] = value;
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Paramètres du Site
              </h1>
              <p className="text-gray-600">
                Gérez les paramètres généraux de votre site web
              </p>
            </div>
            
            {/* Indicateur de sauvegarde */}
            <div className="text-right">
              {isSaving && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Sauvegarde...</span>
                </div>
              )}
              
              {lastSaved && !isSaving && (
                <div className="text-sm text-green-600">
                  ✅ Sauvegardé
                </div>
              )}
              
              {saveError && (
                <div className="text-sm text-red-600">
                  ❌ Erreur: {saveError}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informations Générales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du site
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de contact
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du site
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Réseaux Sociaux</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.twitter}
                  onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Thème */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Thème et Couleurs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur primaire
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleInputChange('theme.primaryColor', e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleInputChange('theme.primaryColor', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur secondaire
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => handleInputChange('theme.secondaryColor', e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => handleInputChange('theme.secondaryColor', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur d'accent
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => handleInputChange('theme.accentColor', e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.accentColor}
                    onChange={(e) => handleInputChange('theme.accentColor', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">SEO et Référencement</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre SEO
                </label>
                <input
                  type="text"
                  value={settings.seo.metaTitle}
                  onChange={(e) => handleInputChange('seo.metaTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description SEO
                </label>
                <textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) => handleInputChange('seo.metaDescription', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mots-clés (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={settings.seo.keywords.join(', ')}
                  onChange={(e) => handleInputChange('seo.keywords', e.target.value.split(', '))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
