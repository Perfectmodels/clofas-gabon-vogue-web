
import { useState } from 'react';
import { useGalleryImages } from '@/hooks/use-gallery-images';
import GalleryGrid from '@/components/GalleryGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChevronDown, Grid, Grid3X3, Layout } from 'lucide-react';

const Gallery = () => {
  const { images, loading } = useGalleryImages();
  const [view, setView] = useState<'grid' | 'masonry'>('grid');
  const [category, setCategory] = useState('all');
  
  // Filter images based on selected category
  const filteredImages = category === 'all' 
    ? images 
    : images.filter(image => image.category === category);

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
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCategory('all')}
              className={category === 'all' ? 'bg-clofas-coral text-white' : ''}
            >
              Tous
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCategory('fashion')}
              className={category === 'fashion' ? 'bg-clofas-coral text-white' : ''}
            >
              Défilés
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCategory('workshop')}
              className={category === 'workshop' ? 'bg-clofas-coral text-white' : ''}
            >
              Ateliers
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCategory('exhibition')}
              className={category === 'exhibition' ? 'bg-clofas-coral text-white' : ''}
            >
              Expositions
            </Button>
          </div>
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
          <GalleryGrid images={filteredImages} loading={loading} layout={view} />
        </div>
        
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="flex items-center gap-2">
            Charger plus <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
