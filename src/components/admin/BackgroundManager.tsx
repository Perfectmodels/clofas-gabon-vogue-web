import React, { useState, useEffect } from 'react';
import ImageSelector from './ImageSelector';

interface BackgroundSettings {
  heroBackground: string;
  creatorsBackground: string;
  aboutBackground: string;
  contactBackground: string;
}

const BackgroundManager: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<BackgroundSettings>({
    heroBackground: '',
    creatorsBackground: '',
    aboutBackground: '',
    contactBackground: ''
  });
  
  const [allImages, setAllImages] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [previewMode, setPreviewMode] = useState(false);

  // Charger toutes les images des créateurs
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/src/components/creators/clofas-cms-data.json');
        const data = await response.json();
        
        const images: string[] = [];
        data.creators.forEach((creator: any) => {
          if (creator.images && creator.images.length > 0) {
            images.push(...creator.images);
          }
        });
        
        setAllImages(images);
        
        // Charger les paramètres sauvegardés
        const savedBackgrounds = localStorage.getItem('clofas-backgrounds');
        if (savedBackgrounds) {
          setBackgrounds(JSON.parse(savedBackgrounds));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      }
    };

    loadImages();
  }, []);

  // Sauvegarder les paramètres
  const saveBackgrounds = (newBackgrounds: BackgroundSettings) => {
    setBackgrounds(newBackgrounds);
    localStorage.setItem('clofas-backgrounds', JSON.stringify(newBackgrounds));
    
    // Appliquer les styles CSS
    applyBackgroundStyles(newBackgrounds);
  };

  // Appliquer les styles CSS
  const applyBackgroundStyles = (bgSettings: BackgroundSettings) => {
    const root = document.documentElement;
    
    root.style.setProperty('--hero-background', bgSettings.heroBackground);
    root.style.setProperty('--creators-background', bgSettings.creatorsBackground);
    root.style.setProperty('--about-background', bgSettings.aboutBackground);
    root.style.setProperty('--contact-background', bgSettings.contactBackground);
  };

  const handleImageSelect = (imageUrl: string) => {
    const newBackgrounds = {
      ...backgrounds,
      [`${activeSection}Background`]: imageUrl
    };
    saveBackgrounds(newBackgrounds);
  };

  const clearBackground = () => {
    const newBackgrounds = {
      ...backgrounds,
      [`${activeSection}Background`]: ''
    };
    saveBackgrounds(newBackgrounds);
  };

  const sections = [
    { key: 'hero', name: 'Section Hero', description: 'Arrière-plan principal de la page d\'accueil' },
    { key: 'creators', name: 'Section Créateurs', description: 'Arrière-plan de la page créateurs' },
    { key: 'about', name: 'Section À Propos', description: 'Arrière-plan de la page à propos' },
    { key: 'contact', name: 'Section Contact', description: 'Arrière-plan de la page contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestionnaire d'Arrière-plans
          </h1>
          <p className="text-gray-600">
            Sélectionnez et appliquez des images comme arrière-plans pour différentes sections du site
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sélecteur de section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sections</h2>
            
            <div className="space-y-3">
              {sections.map((section) => (
                <div
                  key={section.key}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeSection === section.key
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setActiveSection(section.key)}
                >
                  <h3 className="font-medium text-gray-800">{section.name}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                  
                  {backgrounds[`${section.key}Background` as keyof BackgroundSettings] && (
                    <div className="mt-2">
                      <img
                        src={backgrounds[`${section.key}Background` as keyof BackgroundSettings]}
                        alt={`Background ${section.name}`}
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {previewMode ? 'Masquer' : 'Afficher'} l'aperçu
              </button>
              
              <button
                onClick={clearBackground}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Supprimer l'arrière-plan
              </button>
            </div>
          </div>

          {/* Sélecteur d'images */}
          <div>
            <ImageSelector
              images={allImages}
              onImageSelect={handleImageSelect}
              selectedImage={backgrounds[`${activeSection}Background` as keyof BackgroundSettings]}
              title={`Images disponibles (${allImages.length})`}
            />
          </div>
        </div>

        {/* Aperçu */}
        {previewMode && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Aperçu</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section) => {
                const bgImage = backgrounds[`${section.key}Background` as keyof BackgroundSettings];
                return (
                  <div key={section.key} className="border rounded-lg overflow-hidden">
                    <div 
                      className="h-32 flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundImage: bgImage 
                          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {section.name}
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-600">
                        {bgImage ? 'Arrière-plan personnalisé' : 'Arrière-plan par défaut'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Informations */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">💡 Comment utiliser :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sélectionnez une section dans le panneau de gauche</li>
            <li>• Choisissez une image dans la grille à droite</li>
            <li>• L'image sera automatiquement appliquée comme arrière-plan</li>
            <li>• Utilisez l'aperçu pour voir le résultat</li>
            <li>• Les paramètres sont sauvegardés automatiquement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BackgroundManager;
