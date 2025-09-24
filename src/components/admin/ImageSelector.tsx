import React from 'react';

interface ImageSelectorProps {
  images: string[];
  onImageSelect: (imageUrl: string) => void;
  selectedImage?: string;
  title: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  images,
  onImageSelect,
  selectedImage,
  title
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {title}
      </h2>
      
      <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === imageUrl
                ? 'border-purple-500 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => onImageSelect(imageUrl)}
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
            {selectedImage === imageUrl && (
              <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;