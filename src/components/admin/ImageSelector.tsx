import React, { useState } from 'react';

interface ImageSelectorProps {
  images: string[];
  onImageSelect: (imageUrl: string) => void;
  selectedImage?: string;
  title?: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ 
  images, 
  onImageSelect, 
  selectedImage,
  title = "Sélectionner une image"
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = images.filter(img => 
    img.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher une image..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Grille d'images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {filteredImages.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === imageUrl 
                ? 'border-purple-500 ring-2 ring-purple-200' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => onImageSelect(imageUrl)}
          >
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="w-full h-24 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            
            {/* Indicateur de sélection */}
            {selectedImage === imageUrl && (
              <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image sélectionnée */}
      {selectedImage && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Image sélectionnée :</h4>
          <img
            src={selectedImage}
            alt="Sélectionnée"
            className="w-full h-32 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <p className="text-xs text-gray-500 mt-2 break-all">{selectedImage}</p>
        </div>
      )}

      {filteredImages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Aucune image trouvée</p>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
