import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { creators2024 } from '@/components/creators/CreatorsData';
import {
  Camera,
  Eye,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  List
} from 'lucide-react';

const CreatorsImagesPreview = () => {
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const creatorsWithImages = creators2024.filter(creator => creator.images && creator.images.length > 0);

  const openImageModal = (creatorId: string, imageIndex: number) => {
    setSelectedCreator(creatorId);
    setSelectedImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedCreator(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedCreator) {
      const creator = creators2024.find(c => c.id === selectedCreator);
      if (creator && creator.images) {
        setSelectedImageIndex((prev) => 
          prev < creator.images.length - 1 ? prev + 1 : 0
        );
      }
    }
  };

  const prevImage = () => {
    if (selectedCreator) {
      const creator = creators2024.find(c => c.id === selectedCreator);
      if (creator && creator.images) {
        setSelectedImageIndex((prev) => 
          prev > 0 ? prev - 1 : creator.images.length - 1
        );
      }
    }
  };

  const getCurrentImage = () => {
    if (!selectedCreator) return null;
    const creator = creators2024.find(c => c.id === selectedCreator);
    return creator?.images?.[selectedImageIndex] || null;
  };

  return (
    <div className="space-y-6">
      {/* Contrôles */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Aperçu des Images</h3>
          <p className="text-gray-600">Visualisez les images des créateurs avant l'import</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4 mr-1" />
            Grille
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-1" />
            Liste
          </Button>
        </div>
      </div>

      {/* Galerie des créateurs */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {creatorsWithImages.map((creator) => (
          <Card key={creator.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{creator.name}</CardTitle>
              <div className="flex items-center justify-between">
                <Badge className="bg-clofas-coral text-white">
                  {creator.country}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {creator.images.length} images
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 gap-2">
                  {creator.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openImageModal(creator.id, index)}
                    >
                      <img
                        src={image}
                        alt={`${creator.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {creator.images.length > 4 && (
                    <div
                      className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => openImageModal(creator.id, 4)}
                    >
                      <span className="text-sm text-gray-600">
                        +{creator.images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {creator.images.slice(0, 3).map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => openImageModal(creator.id, index)}
                    >
                      <img
                        src={image}
                        alt={`${creator.name} ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Image {index + 1}</p>
                        <p className="text-xs text-gray-600">Cliquez pour voir en grand</p>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                  {creator.images.length > 3 && (
                    <div className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openImageModal(creator.id, 3)}
                      >
                        Voir {creator.images.length - 3} images supplémentaires
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal d'image */}
      <Dialog open={!!selectedCreator} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {selectedCreator && creators2024.find(c => c.id === selectedCreator)?.name}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedImageIndex + 1} / {selectedCreator && creators2024.find(c => c.id === selectedCreator)?.images.length}
                </span>
                <Button variant="ghost" size="sm" onClick={closeImageModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {getCurrentImage() && (
            <div className="relative">
              <img
                src={getCurrentImage()!}
                alt={`Image ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[60vh] object-contain mx-auto"
              />
              
              {/* Navigation */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorsImagesPreview;
