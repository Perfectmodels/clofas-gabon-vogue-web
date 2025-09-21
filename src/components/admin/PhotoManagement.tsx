import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useImagesFirebase } from '@/hooks/useImagesFirebase';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  Image,
  Upload,
  Edit,
  Trash2,
  Eye,
  Download,
  Copy,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Plus,
  Tag,
  Calendar,
  User,
  Settings,
  Folder,
  FolderOpen,
  FolderPlus,
  ImageIcon,
  Video,
  FileText,
  Archive
} from 'lucide-react';
import { toast } from 'sonner';

interface Photo {
  id: string;
  url: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedBy: string;
  uploadedAt: string;
  alt: string;
  caption: string;
  location?: string;
  event?: string;
  creator?: string;
}

const PhotoManagement = () => {
  const { images, loading, error, createImage, updateImage, deleteImage } = useImagesFirebase();
  const { autoSave, isSaving, lastSaved, error: autoSaveError } = useAutoSave();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = [
    'all',
    'hero',
    'gallery',
    'creators',
    'events',
    'partners',
    'backgrounds',
    'logos',
    'other'
  ];

  const allTags = Array.from(new Set(images.flatMap(img => img.tags || [])));

  const filteredImages = images
    .filter(img => {
      const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => img.tags.includes(tag));
      return matchesSearch && matchesCategory && matchesTags;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleCreatePhoto = async (photoData: Partial<Photo>) => {
    try {
      await createImage({
        url: photoData.url || '',
        name: photoData.name || 'Nouvelle photo',
        description: photoData.description || '',
        category: photoData.category || 'other',
        featured: photoData.featured || false,
        tags: photoData.tags || [],
        alt: photoData.alt || '',
        caption: photoData.caption || '',
        location: photoData.location || '',
        event: photoData.event || '',
        creator: photoData.creator || ''
      });
      toast.success('Photo ajoutée !');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la photo');
    }
  };

  const handleUpdatePhoto = async (photoData: Photo) => {
    try {
      await updateImage(photoData.id, {
        name: photoData.name,
        description: photoData.description,
        category: photoData.category,
        featured: photoData.featured,
        tags: photoData.tags,
        alt: photoData.alt,
        caption: photoData.caption,
        location: photoData.location,
        event: photoData.event,
        creator: photoData.creator
      });
      toast.success('Photo mise à jour !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      await deleteImage(photoId);
      toast.success('Photo supprimée !');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleFeatured = async (photo: Photo) => {
    await handleUpdatePhoto({ ...photo, featured: !photo.featured });
  };

  const duplicatePhoto = async (photo: Photo) => {
    await handleCreatePhoto({
      ...photo,
      name: `${photo.name} (Copie)`,
      featured: false
    });
  };

  const exportPhotos = () => {
    const photoData = {
      photos: images,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(photoData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clofas-photos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Photos exportées !');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Photos</h2>
          <p className="text-gray-600">Organisez et gérez votre bibliothèque de photos</p>
        </div>
        <div className="flex items-center space-x-2">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={autoSaveError} />
          <Button variant="outline" onClick={exportPhotos}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="category">Catégorie:</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort">Trier par:</Label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="p-2 border rounded-md"
              >
                <option value="date">Date</option>
                <option value="name">Nom</option>
                <option value="size">Taille</option>
              </select>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {allTags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Filtrer par Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des photos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((photo) => (
            <Card key={photo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="relative aspect-square mb-2">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.alt || photo.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {photo.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Vedette
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSelectedPhoto(photo);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFeatured(photo)}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => duplicatePhoto(photo)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePhoto(photo.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-sm truncate">{photo.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{photo.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(photo.size)}</span>
                    <span>{photo.dimensions.width}×{photo.dimensions.height}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {photo.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{photo.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredImages.map((photo) => (
            <Card key={photo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.alt || photo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium truncate">{photo.name}</h3>
                      {photo.featured && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Vedette
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{photo.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{formatFileSize(photo.size)}</span>
                      <span>{photo.dimensions.width}×{photo.dimensions.height}</span>
                      <span>{formatDate(photo.uploadedAt)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {photo.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedPhoto(photo);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFeatured(photo)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => duplicatePhoto(photo)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Éditeur de photo */}
      {selectedPhoto && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Éditer: {selectedPhoto.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photo-name">Nom</Label>
                  <Input
                    id="photo-name"
                    value={selectedPhoto.name}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="photo-category">Catégorie</Label>
                  <select
                    id="photo-category"
                    value={selectedPhoto.category}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    {categories.filter(c => c !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="photo-description">Description</Label>
                <Textarea
                  id="photo-description"
                  value={selectedPhoto.description}
                  onChange={(e) => setSelectedPhoto({ ...selectedPhoto, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photo-alt">Texte alternatif</Label>
                  <Input
                    id="photo-alt"
                    value={selectedPhoto.alt}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, alt: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="photo-caption">Légende</Label>
                  <Input
                    id="photo-caption"
                    value={selectedPhoto.caption}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, caption: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="photo-location">Lieu</Label>
                  <Input
                    id="photo-location"
                    value={selectedPhoto.location || ''}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="photo-event">Événement</Label>
                  <Input
                    id="photo-event"
                    value={selectedPhoto.event || ''}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, event: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="photo-creator">Créateur</Label>
                  <Input
                    id="photo-creator"
                    value={selectedPhoto.creator || ''}
                    onChange={(e) => setSelectedPhoto({ ...selectedPhoto, creator: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPhoto.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {tag}
                      <button
                        onClick={() => {
                          const newTags = selectedPhoto.tags.filter((_, i) => i !== index);
                          setSelectedPhoto({ ...selectedPhoto, tags: newTags });
                        }}
                        className="ml-1"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <Input
                    placeholder="Ajouter un tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const newTag = e.currentTarget.value.trim();
                        if (newTag && !selectedPhoto.tags.includes(newTag)) {
                          setSelectedPhoto({ ...selectedPhoto, tags: [...selectedPhoto.tags, newTag] });
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                    className="w-32"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="photo-featured"
                  checked={selectedPhoto.featured}
                  onChange={(e) => setSelectedPhoto({ ...selectedPhoto, featured: e.target.checked })}
                />
                <Label htmlFor="photo-featured">Photo vedette</Label>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={() => {
                  handleUpdatePhoto(selectedPhoto);
                  setIsEditing(false);
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PhotoManagement;
