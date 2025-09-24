import React, { useState, useEffect } from 'react';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  neutral50: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;
}

const ColorCustomizer: React.FC = () => {
  const [colors, setColors] = useState<ColorScheme>({
    primary: '#00A651', // Vert Gabon
    secondary: '#FFD700', // Jaune Gabon
    accent: '#0066CC', // Bleu Gabon
    neutral50: '#FAFAFA',
    neutral100: '#F5F5F5',
    neutral200: '#E5E5E5',
    neutral300: '#D4D4D4',
    neutral400: '#A3A3A3',
    neutral500: '#737373',
    neutral600: '#525252',
    neutral700: '#404040',
    neutral800: '#262626',
    neutral900: '#171717',
  });

  const [isOpen, setIsOpen] = useState(false);

  // Charger les couleurs sauvegardées
  useEffect(() => {
    const savedColors = localStorage.getItem('clofas-colors');
    if (savedColors) {
      setColors(JSON.parse(savedColors));
      applyColors(JSON.parse(savedColors));
    }
  }, []);

  // Appliquer les couleurs au CSS
  const applyColors = (colorScheme: ColorScheme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorScheme.primary);
    root.style.setProperty('--secondary-color', colorScheme.secondary);
    root.style.setProperty('--accent-color', colorScheme.accent);
    root.style.setProperty('--neutral-50', colorScheme.neutral50);
    root.style.setProperty('--neutral-100', colorScheme.neutral100);
    root.style.setProperty('--neutral-200', colorScheme.neutral200);
    root.style.setProperty('--neutral-300', colorScheme.neutral300);
    root.style.setProperty('--neutral-400', colorScheme.neutral400);
    root.style.setProperty('--neutral-500', colorScheme.neutral500);
    root.style.setProperty('--neutral-600', colorScheme.neutral600);
    root.style.setProperty('--neutral-700', colorScheme.neutral700);
    root.style.setProperty('--neutral-800', colorScheme.neutral800);
    root.style.setProperty('--neutral-900', colorScheme.neutral900);
  };

  // Sauvegarder les couleurs
  const saveColors = () => {
    localStorage.setItem('clofas-colors', JSON.stringify(colors));
    applyColors(colors);
    alert('Couleurs sauvegardées avec succès !');
  };

  // Réinitialiser aux couleurs par défaut
  const resetColors = () => {
    const defaultColors: ColorScheme = {
      primary: '#00A651', // Vert Gabon
      secondary: '#FFD700', // Jaune Gabon
      accent: '#0066CC', // Bleu Gabon
      neutral50: '#FAFAFA',
      neutral100: '#F5F5F5',
      neutral200: '#E5E5E5',
      neutral300: '#D4D4D4',
      neutral400: '#A3A3A3',
      neutral500: '#737373',
      neutral600: '#525252',
      neutral700: '#404040',
      neutral800: '#262626',
      neutral900: '#171717',
    };
    setColors(defaultColors);
    applyColors(defaultColors);
    localStorage.removeItem('clofas-colors');
  };

  // Prévisualiser les couleurs
  const previewColors = (colorScheme: ColorScheme) => {
    applyColors(colorScheme);
  };

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    previewColors(newColors);
  };

  const colorPresets = [
    {
      name: 'Gabon Original',
      colors: {
        primary: '#00A651', // Vert Gabon
        secondary: '#FFD700', // Jaune Gabon
        accent: '#0066CC', // Bleu Gabon
        neutral50: '#FAFAFA',
        neutral100: '#F5F5F5',
        neutral200: '#E5E5E5',
        neutral300: '#D4D4D4',
        neutral400: '#A3A3A3',
        neutral500: '#737373',
        neutral600: '#525252',
        neutral700: '#404040',
        neutral800: '#262626',
        neutral900: '#171717',
      }
    },
    {
      name: 'Vert Dominant',
      colors: {
        primary: '#00A651', // Vert Gabon
        secondary: '#00A651', // Vert Gabon
        accent: '#FFD700', // Jaune Gabon
        neutral50: '#FAFAFA',
        neutral100: '#F5F5F5',
        neutral200: '#E5E5E5',
        neutral300: '#D4D4D4',
        neutral400: '#A3A3A3',
        neutral500: '#737373',
        neutral600: '#525252',
        neutral700: '#404040',
        neutral800: '#262626',
        neutral900: '#171717',
      }
    },
    {
      name: 'Bleu Dominant',
      colors: {
        primary: '#0066CC', // Bleu Gabon
        secondary: '#0066CC', // Bleu Gabon
        accent: '#FFD700', // Jaune Gabon
        neutral50: '#FAFAFA',
        neutral100: '#F5F5F5',
        neutral200: '#E5E5E5',
        neutral300: '#D4D4D4',
        neutral400: '#A3A3A3',
        neutral500: '#737373',
        neutral600: '#525252',
        neutral700: '#404040',
        neutral800: '#262626',
        neutral900: '#171717',
      }
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton pour ouvrir le panneau */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gabon-green text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
Couleurs
      </button>

      {/* Panneau de personnalisation */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Personnalisation des couleurs</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Presets */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presets rapides
            </label>
            <div className="grid grid-cols-1 gap-2">
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setColors(preset.colors);
                    previewColors(preset.colors);
                  }}
                  className="text-left p-2 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Couleurs principales */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur principale
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur secondaire
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur d'accent
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={saveColors}
              className="flex-1 bg-gabon-green text-white py-2 px-4 rounded-lg hover:bg-gabon-blue transition-colors"
            >
              Sauvegarder
            </button>
            <button
              onClick={resetColors}
              className="flex-1 bg-gabon-yellow text-gray-800 py-2 px-4 rounded-lg hover:bg-gabon-green hover:text-white transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorCustomizer;
