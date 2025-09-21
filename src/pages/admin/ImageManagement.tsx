import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/ui/image-upload';
import { useImagesFirebase } from '@/hooks/useImagesFirebase';
import { UploadResult } from '@/services/imgbb-service';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { useAutoSave } from '@/hooks/useAutoSave';
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
  Plus,
  CloudUpload
} from 'lucide-react';

const ImageManagement = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const { images, loading, error, createImage, updateImage, deleteImage, toggleFeatured } = useImagesFirebase();

  // Hook pour la sauvegarde automatique
  const { isSaving, lastSaved, error: saveError, autoSave } = useAutoSave();

  // Filtrage côté client
  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || image.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Défilé', 'Ateliers', 'Conférence', 'Casting', 'Backstage'];

  const handleUploadComplete = async (results: UploadResult[]) => {
    await autoSave(async () => {
      // Créer les entrées d'images dans Firebase pour chaque upload réussi
      for (const result of results) {
        if (result.success && result.url) {
          const imageData = {
            name: result.filename || 'Image uploadée',
            url: result.url,
            displayUrl: result.displayUrl || result.url,
            category: 'Défilé', // Catégorie par défaut
            tags: ['upload', 'admin'],
            size: result.size || '0',
            dimensions: result.width && result.height ? `${result.width}x${result.height}` : '0x0',
            uploadDate: new Date().toLocaleDateString(),
            author: 'Admin',
            alt: result.filename || 'Image uploadée',
            description: 'Image uploadée via le panel d\'administration',
            deleteUrl: result.deleteUrl
          };

          await createImage(imageData);
        }
      }

      setShowUploadDialog(false);
    });
  };

  const handleUploadError = (error: string) => {
    console.error('Erreur d\'upload:', error);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des images</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-clofas-dark">Gestion des Images</h1>
          <p className="text-gray-600">Gérez la galerie d'images de votre site</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowUploadDialog(true)}>
            <CloudUpload className="h-4 w-4 mr-2" />
            Uploader des images
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher des images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Toutes les catégories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-2xl font-bold text-clofas-dark">{images.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Tag className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Catégories</p>
                <p className="text-2xl font-bold text-green-600">{categories.length - 1}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cette semaine</p>
                <p className="text-2xl font-bold text-purple-600">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taille totale</p>
                <p className="text-2xl font-bold text-orange-600">11.4 MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/50 text-white">
                    {image.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-clofas-dark mb-2 line-clamp-2">
                  {image.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{image.dimensions} • {image.size}</p>
                  <p className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {image.uploadDate}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Image</th>
                    <th className="text-left p-4">Nom</th>
                    <th className="text-left p-4">Catégorie</th>
                    <th className="text-left p-4">Taille</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredImages.map((image) => (
                    <tr key={image.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-clofas-dark">{image.name}</p>
                          <p className="text-sm text-gray-600">{image.alt}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge>{image.category}</Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {image.dimensions}<br />
                        {image.size}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {image.uploadDate}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Detail Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            onClick={() => setSelectedImage(images[0])}
            className="hidden"
          >
            Voir détails
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails de l'image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nom</label>
                    <p className="text-clofas-dark">{selectedImage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Catégorie</label>
                    <p className="text-clofas-dark">{selectedImage.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedImage.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Informations techniques</label>
                    <p className="text-sm text-gray-600">
                      {selectedImage.dimensions} • {selectedImage.size}
                    </p>
                  </div>
                  {selectedImage.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-clofas-dark">{selectedImage.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CloudUpload className="h-5 w-5 mr-2" />
              Uploader des images
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ImageUpload
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              multiple={true}
              maxFiles={100}
              maxSize={32}
              showPreview={true}
              showProgress={true}
              unlimited={true}
            />
          </div>
          </DialogContent>
        </Dialog>

        {/* Indicateur de sauvegarde automatique */}
        <AutoSaveIndicator
          isSaving={isSaving}
          lastSaved={lastSaved}
          error={saveError}
        />
      </div>
    );
  };

  export default ImageManagement;
