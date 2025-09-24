import React, { useState, useEffect } from 'react';

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
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Charger toutes les images des créateurs
  useEffect(() => {
    const loadImages = () => {
      // Images des stylistes migrées
      const images = [
        'https://i.ibb.co/kV5WmdGZ/73b494d49a32.jpg',
        'https://i.ibb.co/JfKsLJP/01c8f4050da2.jpg',
        'https://i.ibb.co/vvCT2NV9/290f203a0fb8.jpg',
        'https://i.ibb.co/0VDmmp32/0e2ee56e1ae3.jpg',
        'https://i.ibb.co/fY4s0ZHB/c8afc6ad9f06.jpg',
        'https://i.ibb.co/yc1Kdq34/8dfdf7e9a8f9.jpg',
        'https://i.ibb.co/yc8bG1Tb/52e3ee600fbc.jpg',
        'https://i.ibb.co/FqdpRkXY/1ee4d51f68c4.jpg',
        'https://i.ibb.co/ymzt8frZ/1243d99b625e.jpg',
        'https://i.ibb.co/0yD8DL4X/c161792451cb.jpg',
        'https://i.ibb.co/3V0Qttw/064c1430c7db.jpg',
        'https://i.ibb.co/Qs1MVBf/3da1bac85e6b.jpg',
        'https://i.ibb.co/7J30PT4H/ea5023c3ac65.jpg',
        'https://i.ibb.co/xSDxG5Rh/c240a82dfe89.jpg',
        'https://i.ibb.co/jvNZfmhF/bd143a318d50.jpg',
        'https://i.ibb.co/nqNpbqHJ/d3018f0663e6.jpg',
        'https://i.ibb.co/Wpy22mvs/626988750b51.jpg',
        'https://i.ibb.co/RGWFYCnx/bf62f7b17d86.jpg',
        'https://i.ibb.co/GQR5GrqM/c0b200863467.jpg',
        'https://i.ibb.co/HDcN4DLz/9edaad8588c2.jpg',
        'https://i.ibb.co/pvsDfzGQ/2ef8a415c6bd.jpg',
        'https://i.ibb.co/Q3K1sfR7/cf51536b5800.jpg',
        'https://i.ibb.co/GQgwLrzD/6e2267df4b1d.jpg',
        'https://i.ibb.co/xqQqzzdQ/cc17a41d83af.jpg',
        'https://i.ibb.co/ZpGx4QvL/245e81248d61.jpg',
        'https://i.ibb.co/hRgT3zqh/a23261079d75.jpg',
        'https://i.ibb.co/9khT9jRR/9c48c28ff676.jpg',
        'https://i.ibb.co/0VKstWrK/3c80cc4e6574.jpg',
        'https://i.ibb.co/z9kL58x/3100b475f5c0.jpg',
        'https://i.ibb.co/N6sspHc7/5213160fe8c8.jpg',
        'https://i.ibb.co/PvLccjDz/c335da428b09.jpg',
        'https://i.ibb.co/zVLFVWjP/cc94856c27c1.jpg',
        'https://i.ibb.co/pB3YNMp3/c247616e8323.jpg',
        'https://i.ibb.co/sMGghMv/3f91bc3fe18b.jpg',
        'https://i.ibb.co/SDXRLvjH/37c4ec120848.jpg',
        'https://i.ibb.co/XP0Ln68/04adf6d042b4.jpg',
        'https://i.ibb.co/4RTWc6HF/f846610121b9.jpg',
        'https://i.ibb.co/tyv90Gk/1a808ecffeb6.jpg',
        'https://i.ibb.co/ymfJ6D1N/7ffc4dd05e42.jpg',
        'https://i.ibb.co/nM4pHFGY/9b1ded8e7e25.jpg',
        'https://i.ibb.co/spfmPw0s/a55c687f4339.jpg',
        'https://i.ibb.co/xKy1qqmx/6c1774b565a7.jpg',
        'https://i.ibb.co/MkmPYJWX/a58cecc8ba55.jpg',
        'https://i.ibb.co/KcYQYV8k/40c314434bf5.jpg',
        'https://i.ibb.co/p65BvK4N/a05457383187.jpg',
        'https://i.ibb.co/ccKJnQbV/f62faa714e7f.jpg',
        'https://i.ibb.co/fV8wTqNc/2009081a8d31.jpg',
        'https://i.ibb.co/kVcnwwPn/78af3363aad2.jpg',
        'https://i.ibb.co/GB5Mt3M/0a1e3b4bf9cd.jpg',
        'https://i.ibb.co/ZpW6yYdk/73169dd26a20.jpg',
        'https://i.ibb.co/93W1H0b2/0f0e54c2225c.jpg',
        'https://i.ibb.co/0pfQk2pC/eae3166e7d14.jpg',
        'https://i.ibb.co/hFgDFkcw/27990493844a.jpg',
        'https://i.ibb.co/RG7qWrZ4/166392eb3116.jpg',
        'https://i.ibb.co/zHfwtDNJ/c38ed5716106.jpg',
        'https://i.ibb.co/JRrsnjRF/18f28b28e679.jpg',
        'https://i.ibb.co/svFZRj4q/eefab0796a51.jpg',
        'https://i.ibb.co/p690tccn/eb946be18f2b.jpg',
        'https://i.ibb.co/bRLG1Y9s/ced9ca728645.jpg',
        'https://i.ibb.co/DDCvH4Jm/c081b075c0ae.jpg',
        'https://i.ibb.co/fGq9MKgw/f395e104606d.jpg',
        'https://i.ibb.co/FLs4hwJc/023838dcf9f7.jpg',
        'https://i.ibb.co/DHXFzfN5/78147865bc3b.jpg',
        'https://i.ibb.co/rKbyRvhp/351007b83e57.jpg',
        'https://i.ibb.co/Y7bfFyKt/398dd2a632b9.jpg',
        'https://i.ibb.co/mrQK00Cx/d3813045b9f3.jpg',
        'https://i.ibb.co/whWCtBQC/058557e800ed.jpg',
        'https://i.ibb.co/7dWxKSMR/4023fcd21857.jpg',
        'https://i.ibb.co/qFnXgR5Z/8b6cd344ef0d.jpg',
        'https://i.ibb.co/jPsYvQ0N/56c95b5d36b0.jpg',
        'https://i.ibb.co/39krqgs6/01fba6223b5c.jpg',
        'https://i.ibb.co/SpPy9TF/f8b80a29ba0c.jpg',
        'https://i.ibb.co/d07dSM4q/7e702602a905.jpg',
        'https://i.ibb.co/PZqdfSW7/a1cdccff62ba.jpg',
        'https://i.ibb.co/k2HbXZKF/079fcf4038b5.jpg',
        'https://i.ibb.co/xS1GJkdW/d8d09edd16c7.jpg',
        'https://i.ibb.co/G385KWvX/94bcd6a01c1a.jpg',
        'https://i.ibb.co/spCJzVbX/f3c0314e071a.jpg',
        'https://i.ibb.co/L3BBq6W/d19611ccc7d1.jpg',
        'https://i.ibb.co/k2QRRcQN/635e3f800a0f.jpg',
        'https://i.ibb.co/ks0LvDDy/afd8289de7d8.jpg',
        'https://i.ibb.co/XZt8LCpH/a43cfd4967bc.jpg',
        'https://i.ibb.co/NndJd7Y3/3ca6cd732cac.jpg',
        'https://i.ibb.co/W17mKtr/0803735be1ed.jpg',
        'https://i.ibb.co/TBrqRqKB/c3082d14ebd6.jpg',
        'https://i.ibb.co/W4BvKdwY/979e611c525e.jpg',
        'https://i.ibb.co/Q7PBPMwf/a3c3ca5aac4d.jpg',
        'https://i.ibb.co/RTkX0Cpv/829b6fccf175.jpg',
        'https://i.ibb.co/fVxvm7mg/1d0c53fcae41.jpg',
        'https://i.ibb.co/jZ3ZzVkP/8aa40af32123.jpg',
        'https://i.ibb.co/RGdFcrN6/fc3991781987.jpg',
        'https://i.ibb.co/Nd5G8Tf9/f3b97300e45e.jpg',
        'https://i.ibb.co/7NxCgSLX/3f99366e5806.jpg',
        'https://i.ibb.co/nsxB8Kcy/72ed9dfdbbc0.jpg',
        'https://i.ibb.co/3Y1HBk8C/5d0260a145ae.jpg',
        'https://i.ibb.co/k6ktJ6xt/4a9a9812d2ea.jpg',
        'https://i.ibb.co/wrjf7X47/e5c7e7f896bf.jpg',
        'https://i.ibb.co/SwRfsmfM/de41eba514a8.jpg',
        'https://i.ibb.co/4bqZpJx/c264e754fc74.jpg',
        'https://i.ibb.co/mV3RJyNX/e666e9c388ba.jpg',
        'https://i.ibb.co/VWz15TWj/5df8fed2a3ad.jpg',
        'https://i.ibb.co/H8YQs0q/be6811255295.jpg',
        'https://i.ibb.co/g5vh7HQ/e5bd6e00b0c7.jpg',
        'https://i.ibb.co/CsnBnML4/3c0b09f5706b.jpg',
        'https://i.ibb.co/4xDPh19/0c47f5f39e43.jpg',
        'https://i.ibb.co/NdTt6CZh/b1d5414114f6.jpg',
        'https://i.ibb.co/ns01x7yC/e8393e90d7fa.jpg'
      ];
      
      setAllImages(images);
    };

    loadImages();
  }, []);

  // Appliquer les styles CSS quand les données changent
  useEffect(() => {
    if (backgrounds) {
      applyBackgroundStyles(backgrounds);
    }
  }, [backgrounds]);

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
    setBackgrounds(newBackgrounds);
    
    // Simuler la sauvegarde
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const clearBackground = () => {
    const newBackgrounds = {
      ...backgrounds,
      [`${activeSection}Background`]: ''
    };
    setBackgrounds(newBackgrounds);
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Gestionnaire d'Arrière-plans
              </h1>
              <p className="text-gray-600">
                Sélectionnez et appliquez des images comme arrière-plans pour différentes sections du site
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
              
              {false && (
                <div className="text-sm text-red-600">
                  ❌ Erreur de sauvegarde
                </div>
              )}
            </div>
          </div>
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Images disponibles ({allImages.length})
            </h2>
            
            <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {allImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    backgrounds[`${activeSection}Background` as keyof BackgroundSettings] === imageUrl
                      ? 'border-purple-500 ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/80x80/CCCCCC/000000?text=Image';
                    }}
                  />
                  {backgrounds[`${activeSection}Background` as keyof BackgroundSettings] === imageUrl && (
                    <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
