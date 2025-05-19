
import React from 'react';
import { creators2024 } from './CreatorsData';

const CreatorsGallery = () => {
  // Filtrer les créateurs qui ont des images
  const creatorsWithImages = creators2024.filter(creator => creator.images && creator.images.length > 0);
  
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Galerie des créateurs</h3>
      {creatorsWithImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {creatorsWithImages.slice(0, 6).map((creator, creatorIndex) => (
            <div key={creatorIndex} className="group relative overflow-hidden rounded-lg aspect-square">
              <img 
                src={creator.images[0]} 
                alt={`Création de ${creator.name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-sm">{creator.name}</h3>
                <p className="text-xs">{creator.country}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">Aucune image disponible pour le moment</p>
      )}
    </div>
  );
};

export default CreatorsGallery;
