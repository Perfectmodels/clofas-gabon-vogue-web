
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Creator = {
  name: string;
  country: string;
  images: string[];
};

interface CreatorImageModalsProps {
  selectedCreator: Creator | null;
  setSelectedCreator: (creator: Creator | null) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  showImageDialog: boolean;
  setShowImageDialog: (show: boolean) => void;
}

const CreatorImageModals = ({ 
  selectedCreator, 
  setSelectedCreator,
  selectedImage,
  setSelectedImage,
  showImageDialog,
  setShowImageDialog
}: CreatorImageModalsProps) => {
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowImageDialog(true);
  };

  if (!selectedCreator && !selectedImage) {
    return null;
  }

  return (
    <>
      {/* Creator Images Modal */}
      {selectedCreator && (
        <Dialog open={!!selectedCreator} onOpenChange={(open) => !open && setSelectedCreator(null)}>
          <DialogContent className="max-w-4xl w-full p-6">
            <DialogTitle className="text-xl font-bold mb-4 flex justify-between items-center">
              Créations de {selectedCreator.name} <span className="text-gray-500 text-sm">({selectedCreator.country})</span>
            </DialogTitle>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {selectedCreator.images.map((image: string, index: number) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => handleImageClick(image)}
                >
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={image} 
                      alt={`${selectedCreator.name} création ${index + 1}`} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                        e.currentTarget.classList.add('opacity-50');
                      }}
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Full Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-5xl p-0 bg-black/90 border-0">
          <DialogTitle className="sr-only">Image en plein écran</DialogTitle>
          <div className="relative">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Image en plein écran"
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                  e.currentTarget.classList.add('opacity-50');
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatorImageModals;
