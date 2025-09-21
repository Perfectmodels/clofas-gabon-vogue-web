import { useState } from 'react';
import { 
  Camera, 
  Eye, 
  Star, 
  Heart, 
  Download, 
  Share2, 
  MoreHorizontal,
  Grid,
  List,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreatorGallery, CreatorImage } from '@/hooks/useCreatorGallery';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAutoSave } from '@/hooks/useAutoSave';

interface CreatorMiniGalleryProps {
  creatorId: string;
  creatorName: string;
  isOpen: boolean;
  onClose: () => void;
  onImageUpload?: () => void;
}

const CreatorMiniGallery = ({ 
  creatorId, 
  creatorName, 
  isOpen, 
  onClose, 
  onImageUpload 
}: CreatorMiniGalleryProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [selectedImage, setSelectedImage] = useState<CreatorImage | null>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { 
    images, 
    loading, 
    error, 
    addImage, 
    updateImage, 
    deleteImage, 
    toggleFeatured,
    getFeaturedImages,
    getImagesByCategory 
  } = useCreatorGallery(creatorId);

  const { isSaving, lastSaved, error: saveError, autoSave } = useAutoSave();

  // Filtrage des images
  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || image.category === filterCategory;
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && image.featured) ||
                           (filterFeatured === 'not-featured' && !image.featured);
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const categories = ['all', 'Portrait', 'Défilé', 'Backstage', 'Création', 'Autre'];
  const featuredImages = getFeaturedImages();

  const handleImageClick = (image: CreatorImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setSelectedImage(filteredImages[currentImageIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setSelectedImage(filteredImages[currentImageIndex + 1]);
    }
  };

  const handleToggleFeatured = async (imageId: string) => {
    await autoSave(async () => {
      await toggleFeatured(imageId);
    });
  };

  const handleDeleteImage = async (imageId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      await autoSave(async () => {
        await deleteImage(imageId);
      });
    }
  };

  const handleUpdateImage = async (imageId: string, updates: Partial<CreatorImage>) => {
    await autoSave(async () => {
      await updateImage(imageId, updates);
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Camera className="h-6 w-6 mr-2 text-clofas-coral" />
            Mini Galerie - {creatorName}
          </DialogTitle>
          <DialogDescription>
            Gestion des images pour {creatorName}. {images.length} image{images.length > 1 ? 's' : ''} au total.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4">
          {/* Filtres et contrôles */}
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans la galerie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Toutes' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterFeatured} onValueChange={setFilterFeatured}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Mise en avant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="featured">Vedettes</SelectItem>
                  <SelectItem value="not-featured">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button onClick={onImageUpload} className="bg-clofas-coral hover:bg-clofas-coral/90">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter des images
              </Button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Badge variant="outline">
              <ImageIcon className="h-3 w-3 mr-1" />
              {images.length} total
            </Badge>
            <Badge variant="outline">
              <Star className="h-3 w-3 mr-1" />
              {featuredImages.length} vedettes
            </Badge>
            <Badge variant="outline">
              <Eye className="h-3 w-3 mr-1" />
              {filteredImages.length} affichées
            </Badge>
          </div>

          {/* Contenu de la galerie */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement de la galerie...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-600 mb-4">Erreur lors du chargement</p>
                  <p className="text-gray-600">{error}</p>
                </div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Aucune image trouvée</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchTerm || filterCategory !== 'all' || filterFeatured !== 'all' 
                      ? 'Essayez de modifier vos filtres' 
                      : 'Commencez par ajouter des images à cette galerie'}
                  </p>
                  <Button onClick={onImageUpload} className="bg-clofas-coral hover:bg-clofas-coral/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter des images
                  </Button>
                </div>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
                  : 'space-y-4'
              }>
                {filteredImages.map((image, index) => (
                  <Card key={image.id} className="group hover:shadow-lg transition-all duration-300">
                    {viewMode === 'grid' ? (
                      <div className="relative">
                        <div 
                          className="aspect-square overflow-hidden rounded-t-lg cursor-pointer"
                          onClick={() => handleImageClick(image, index)}
                        >
                          <ImageWithFallback
                            src={image.displayUrl || image.url}
                            alt={image.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm truncate">{image.name}</h4>
                            <div className="flex items-center space-x-1">
                              {image.featured && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleFeatured(image.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Star className={`h-3 w-3 ${image.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                              </Button>
                            </div>
                          </div>
                          {image.description && (
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              {image.tags.slice(0, 2).map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteImage(image.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-16 h-16 overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => handleImageClick(image, index)}
                          >
                            <ImageWithFallback
                              src={image.displayUrl || image.url}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{image.name}</h4>
                              <div className="flex items-center space-x-2">
                                {image.featured && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleFeatured(image.id)}
                                >
                                  <Star className={`h-4 w-4 ${image.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteImage(image.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {image.description && (
                              <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              {image.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de sauvegarde */}
        {isSaving && (
          <div className="fixed bottom-4 right-4 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium">Sauvegarde en cours...</span>
            </div>
          </div>
        )}
      </DialogContent>

      {/* Visionneuse d'image */}
      {showImageViewer && selectedImage && (
        <Dialog open={showImageViewer} onOpenChange={setShowImageViewer}>
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedImage.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setShowImageViewer(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                <ImageWithFallback
                  src={selectedImage.displayUrl || selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousImage}
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextImage}
                    disabled={currentImageIndex === filteredImages.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(selectedImage.id)}
                  >
                    <Star className={`h-4 w-4 mr-2 ${selectedImage.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    {selectedImage.featured ? 'Retirer des vedettes' : 'Mettre en vedette'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteImage(selectedImage.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default CreatorMiniGallery;
