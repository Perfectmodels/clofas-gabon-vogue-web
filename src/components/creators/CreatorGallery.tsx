import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatorUpload from './CreatorUpload';
import { 
  Image, 
  Eye, 
  Calendar, 
  Tag, 
  ChevronLeft, 
  ChevronRight,
  Grid3X3,
  List,
  Filter,
  Upload,
  CloudUpload
} from 'lucide-react';
import { CreatorImage, getCreatorImages } from './CreatorImages';
import { creators2024 } from './CreatorsData';

interface CreatorGalleryProps {
  creatorId: string;
  creatorName: string;
}

const CreatorGallery = ({ creatorId, creatorName }: CreatorGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<CreatorImage | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Récupérer les images du créateur depuis les données existantes
  const creator = creators2024.find(c => c.id === creatorId);
  const existingImages = creator?.images || [];
  
  // Convertir les images existantes en format CreatorImage
  const convertedImages: CreatorImage[] = existingImages.map((imageUrl, index) => ({
    id: `${creatorId}-${index}`,
    creatorId,
    title: `Image ${index + 1}`,
    description: `Image du défilé de ${creatorName}`,
    imageUrl,
    category: 'défilé' as const,
    year: 2024,
    event: 'CLOFAS 241 - Défilé Principal',
    featured: index < 3 // Les 3 premières images sont mises en avant
  }));

  // Combiner avec les images de la base de données
  const dbImages = getCreatorImages(creatorId);
  const allImages = [...convertedImages, ...dbImages];
  
  const categories = ['all', 'défilé', 'backstage', 'portrait', 'collection'];
  
  const filteredImages = selectedCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: CreatorImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      'défilé': 'bg-pink-100 text-pink-800',
      'backstage': 'bg-purple-100 text-purple-800',
      'portrait': 'bg-blue-100 text-blue-800',
      'collection': 'bg-green-100 text-green-800'
    };
    return variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  if (allImages.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune image disponible pour ce créateur</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery" className="flex items-center">
            <Image className="h-4 w-4 mr-2" />
            Galerie ({filteredImages.length})
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center">
            <CloudUpload className="h-4 w-4 mr-2" />
            Upload d'images
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          {/* Header avec contrôles */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-clofas-dark">
                Galerie de {creatorName}
              </h3>
              <p className="text-sm text-gray-600">
                {filteredImages.length} image{filteredImages.length > 1 ? 's' : ''} disponible{filteredImages.length > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Filtres par catégorie */}
              <div className="flex items-center space-x-1">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode d'affichage */}
              <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

      {/* Galerie d'images */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleImageClick(image, index)}
            >
              <div className="relative">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getCategoryBadge(image.category)}>
                    {image.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm line-clamp-2">{image.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{image.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleImageClick(image, index)}
            >
              <div className="flex items-center space-x-4 p-4">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{image.title}</h4>
                    <Badge className={getCategoryBadge(image.category)}>
                      {image.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {image.year}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {image.event}
                    </div>
                  </div>
                </div>
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog pour afficher l'image en grand */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Navigation */}
                {filteredImages.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryBadge(selectedImage.category)}>
                    {selectedImage.category}
                  </Badge>
                  <span className="text-sm text-gray-600">{selectedImage.year}</span>
                </div>
                
                <p className="text-gray-700">{selectedImage.description}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Tag className="h-4 w-4 mr-1" />
                  {selectedImage.event}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="space-y-4">
            <div className="text-center py-8">
              <CloudUpload className="h-16 w-16 text-clofas-coral mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-clofas-dark mb-2">
                Uploader des images pour {creatorName}
              </h3>
              <p className="text-gray-600 mb-6">
                Ajoutez de nouvelles images à la galerie de ce créateur
              </p>
            </div>
            
            <CreatorUpload
              creatorId={creatorId}
              creatorName={creatorName}
              onUploadComplete={(results) => {
                console.log('Images uploadées:', results);
                // Optionnel: rafraîchir la galerie
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorGallery;
