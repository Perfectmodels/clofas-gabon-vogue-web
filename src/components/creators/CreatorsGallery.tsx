
import React, { useState } from 'react';
import { creators2024 } from './CreatorsData';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CreatorsGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Filtrer les créateurs qui ont des images valides
  const creatorsWithImages = creators2024.filter(creator => creator.images && creator.images.length > 0);
  
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Galerie des créateurs</h3>
      {creatorsWithImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {creatorsWithImages.slice(0, 6).map((creator, creatorIndex) => (
            <div 
              key={creatorIndex} 
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              onClick={() => setSelectedImage(creator.images[0])}
            >
              <img 
                src={creator.images[0]} 
                alt={`Création de ${creator.name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Remplacer par une image par défaut en cas d'erreur
                  e.currentTarget.src = '/placeholder.svg';
                  e.currentTarget.classList.add('opacity-50');
                }}
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

      {/* Dialog pour afficher l'image en plein écran */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/90 border-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Image agrandie"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorsGallery;
