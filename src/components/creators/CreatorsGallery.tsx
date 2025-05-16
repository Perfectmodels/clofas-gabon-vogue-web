
import React from 'react';

const CreatorsGallery = () => {
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Galerie des créateurs</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
            <img 
              src={`https://source.unsplash.com/random/300x300?fashion,africa,designer&sig=${index}`} 
              alt={`Créateur ${index}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-sm">Créateur {index}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorsGallery;
