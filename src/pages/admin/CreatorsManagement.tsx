import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// Composants Clofas supprimés - utilisation des composants standard
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CreatorUploadSimple from '@/components/creators/CreatorUploadSimple';
import CreatorMiniGallery from '@/components/creators/CreatorMiniGallery';
// import { useCreatorImages } from '@/hooks/useFirebase'; // Supprimé car non utilisé
import { useCreators, Creator } from '@/hooks/useCreators';
import { useCreatorGallery } from '@/hooks/useCreatorGallery';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { useAutoSave } from '@/hooks/useAutoSave';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon,
  Camera,
  Star,
  Calendar,
  Tag,
  Search,
  Filter,
  Grid,
  List,
  Upload,
  Save,
  X
} from 'lucide-react';

// Interface Creator importée du hook

const CreatorsManagement = () => {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showCreatorDialog, setShowCreatorDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showMiniGallery, setShowMiniGallery] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Utilisation du hook Firebase
  const {
    creators,
    loading,
    error,
    createCreator,
    updateCreator,
    deleteCreator,
    addCreatorImage,
    removeCreatorImage,
    toggleFeatured
  } = useCreators();

  // Hook pour la sauvegarde automatique
  const { isSaving, lastSaved, error: saveError, autoSave } = useAutoSave();

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || creator.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const countries = Array.from(new Set(creators.map(c => c.country)));

  const handleCreateCreator = () => {
    setSelectedCreator(null);
    setShowCreatorDialog(true);
  };

  const handleEditCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setShowCreatorDialog(true);
  };

  const handleViewImages = (creator: Creator) => {
    setSelectedCreator(creator);
    setShowImageDialog(true);
  };

  const handleViewMiniGallery = (creator: Creator) => {
    setSelectedCreator(creator);
    setShowMiniGallery(true);
  };

  const handleSaveCreator = async (creatorData: Partial<Creator>) => {
    await autoSave(async () => {
      if (selectedCreator) {
        // Mise à jour
        console.log('🔄 Mise à jour du créateur:', selectedCreator.id);
        await updateCreator(selectedCreator.id, creatorData);
      } else {
        // Création
        console.log('🔄 Création d\'un nouveau créateur');
        await createCreator({
          name: creatorData.name || '',
          country: creatorData.country || '',
          bio: creatorData.bio || '',
          website: creatorData.website || '',
          socialMedia: creatorData.socialMedia || {},
          images: [],
          featured: false
        });
      }
      setShowCreatorDialog(false);
      console.log('✅ Créateur sauvegardé avec succès');
    });
  };

  const handleDeleteCreator = async (creatorId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce créateur ?')) {
      try {
        await deleteCreator(creatorId);
      } catch (error: any) {
        console.error('Erreur lors de la suppression:', error);
        alert(`Erreur: ${error.message}`);
      }
    }
  };

  const handleToggleFeatured = async (creatorId: string) => {
    try {
      await toggleFeatured(creatorId);
    } catch (error: any) {
      console.error('Erreur lors du changement de statut:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des créateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des créateurs</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Créateurs</h1>
          <p className="text-gray-600">Gérez les créateurs et leurs galeries d'images</p>
        </div>
        <Button onClick={handleCreateCreator} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Créateur
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un créateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les pays</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="icon"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                size="icon"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des créateurs */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <Card key={creator.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                    <p className="text-sm text-gray-600">{creator.country}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFeatured(creator.id)}
                    >
                      <Star className={`h-4 w-4 ${creator.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCreator(creator)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCreator(creator.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mini galerie */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Galerie</span>
                    <Badge variant="outline" className="text-xs">
                      {creator.images?.length || 0} image{(creator.images?.length || 0) > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(creator.images || []).slice(0, 3).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleViewImages(creator)}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${creator.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {(creator.images?.length || 0) > 3 && (
                      <div
                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => handleViewImages(creator)}
                      >
                        <span className="text-xs text-gray-600">+{(creator.images?.length || 0) - 3}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewImages(creator)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleViewMiniGallery(creator)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Mini Galerie
                  </Button>
                  <CreatorUploadSimple
                    creatorId={creator.id}
                    creatorName={creator.name}
                    onUploadComplete={async (results) => {
                      // Ajouter les nouvelles images à Firebase
                      for (const result of results) {
                        if (result.success && result.url) {
                          try {
                            await addCreatorImage(creator.id, result.url);
                          } catch (error: any) {
                            console.error('Erreur lors de l\'ajout d\'image:', error);
                            alert(`Erreur lors de l'ajout d'image: ${error.message}`);
                          }
                        }
                      }
                    }}
                  />
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
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Créateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pays
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCreators.map((creator) => (
                    <tr key={creator.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {creator.images[0] ? (
                              <ImageWithFallback
                                className="h-10 w-10 rounded-full object-cover"
                                src={creator.images[0]}
                                alt={creator.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{creator.name}</div>
                            <div className="text-sm text-gray-500">{creator.bio}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {creator.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Camera className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{creator.images?.length || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Badge variant={creator.featured ? "default" : "secondary"}>
                            {creator.featured ? "Mis en avant" : "Standard"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured(creator.id)}
                          >
                            <Star className={`h-4 w-4 ${creator.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewImages(creator)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditCreator(creator)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCreator(creator.id)}
                          >
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

      {/* Dialog de création/édition de créateur */}
      <CreatorDialog
        creator={selectedCreator}
        open={showCreatorDialog}
        onOpenChange={setShowCreatorDialog}
        onSave={handleSaveCreator}
        loading={loading}
      />

      {/* Dialog de visualisation des images */}
      <CreatorImagesDialog
        creator={selectedCreator}
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
      />

      {/* Mini Galerie du créateur */}
      {selectedCreator && (
        <CreatorMiniGallery
          creatorId={selectedCreator.id}
          creatorName={selectedCreator.name}
          isOpen={showMiniGallery}
          onClose={() => setShowMiniGallery(false)}
          onImageUpload={() => {
            setShowMiniGallery(false);
            // Ouvrir le dialog d'upload
            setShowImageDialog(true);
          }}
        />
      )}

      {/* Indicateur de sauvegarde automatique */}
      <AutoSaveIndicator
        isSaving={isSaving}
        lastSaved={lastSaved}
        error={saveError}
      />
    </div>
  );
};

// Composant pour le dialog de création/édition
const CreatorDialog = ({ 
  creator, 
  open, 
  onOpenChange, 
  onSave, 
  loading 
}: {
  creator: Creator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Partial<Creator>) => void;
  loading: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    bio: '',
    website: '',
    instagram: '',
    facebook: '',
    twitter: ''
  });

  useEffect(() => {
    if (creator) {
      setFormData({
        name: creator.name,
        country: creator.country,
        bio: creator.bio || '',
        website: creator.website || '',
        instagram: creator.socialMedia?.instagram || '',
        facebook: creator.socialMedia?.facebook || '',
        twitter: creator.socialMedia?.twitter || ''
      });
    } else {
      setFormData({
        name: '',
        country: '',
        bio: '',
        website: '',
        instagram: '',
        facebook: '',
        twitter: ''
      });
    }
  }, [creator]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      country: formData.country,
      bio: formData.bio,
      website: formData.website,
      socialMedia: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        twitter: formData.twitter
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {creator ? 'Modifier le créateur' : 'Nouveau créateur'}
            </DialogTitle>
            <DialogDescription>
              {creator ? 'Modifiez les informations du créateur' : 'Ajoutez un nouveau créateur à la base de données'}
            </DialogDescription>
          </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du créateur *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays *
              </label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biographie
            </label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site web
            </label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              type="url"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <Input
                value={formData.facebook}
                onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <Input
                value={formData.twitter}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                placeholder="@username"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Composant pour le dialog de visualisation des images
const CreatorImagesDialog = ({ 
  creator, 
  open, 
  onOpenChange 
}: {
  creator: Creator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!creator) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Galerie de {creator.name}
          </DialogTitle>
          <DialogDescription>
            Visualisez et gérez les images de ce créateur
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(creator.images || []).map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open(image, '_blank')}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${creator.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {(creator.images?.length || 0) === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune image disponible pour ce créateur</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorsManagement;
