
import { useState } from 'react';
import { useGalleryImages } from '@/hooks/use-gallery-images';
import GalleryGrid from '@/components/GalleryGrid';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChevronDown, Grid, Grid3X3 } from 'lucide-react';

const Gallery = () => {
  const { images, loading } = useGalleryImages();
  const [view, setView] = useState<'grid' | 'masonry'>('grid');
  
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-clofas-dark mb-6">
            Galerie Photo
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les moments inoubliables des éditions passées de CLOFAS 241, 
            capturés en images.
          </p>
        </div>
        
        <div className="flex justify-end mb-6">
          <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as 'grid' | 'masonry')}>
            <ToggleGroupItem value="grid" aria-label="Toggle grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="masonry" aria-label="Toggle masonry view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="mt-12">
          <GalleryGrid images={images} loading={loading} layout={view} />
        </div>
        
        <div className="flex justify-center mt-10">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-clofas-coral hover:text-white transition-colors"
          >
            Charger plus <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
