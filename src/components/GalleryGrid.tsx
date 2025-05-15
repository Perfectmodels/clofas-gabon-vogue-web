
import React from 'react';
import { useState } from 'react';
import { GalleryImage } from '@/hooks/use-gallery-images';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface GalleryGridProps {
  images: GalleryImage[];
  loading: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, loading }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg">
            <AspectRatio ratio={4/3}>
              <Skeleton className="h-full w-full" />
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-500">
          Aucune image disponible pour le moment
        </h3>
        <p className="mt-2 text-gray-400">
          Les photos de l'événement seront bientôt disponibles.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative">
              <AspectRatio ratio={4/3}>
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </AspectRatio>
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-medium truncate">{image.title}</h3>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/90 border-0">
          <div className="relative">
            <img
              src={selectedImage?.image_url}
              alt={selectedImage?.title || 'Gallery image'}
              className="w-full object-contain max-h-[80vh]"
            />
            {(selectedImage?.title || selectedImage?.description) && (
              <div className="p-4 bg-black/80">
                {selectedImage?.title && (
                  <h3 className="text-white text-lg font-medium">{selectedImage.title}</h3>
                )}
                {selectedImage?.description && (
                  <p className="text-gray-200 mt-2">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;
