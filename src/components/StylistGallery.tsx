import React, { useState } from 'react';

interface StylistImage {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
}

interface StylistGalleryProps {
  stylistName: string;
  images: StylistImage[];
  isOpen: boolean;
  onClose: () => void;
}

const StylistGallery: React.FC<StylistGalleryProps> = ({ stylistName, images, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<StylistImage | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Galerie - {stylistName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Images Grid */}
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {images.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-gray-500">Aucune image disponible pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x200/00A651/FFFFFF?text=Image+non+disponible';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                        <div className="text-2xl mb-2">👁️</div>
                        <p className="text-sm font-medium">Voir en grand</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-gray-900 text-sm">{image.title}</h3>
                      <p className="text-xs text-gray-500">{image.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x600/00A651/FFFFFF?text=Image+non+disponible';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <h3 className="font-semibold">{selectedImage.title}</h3>
              <p className="text-sm opacity-90">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StylistGallery;
