import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreators } from '@/hooks/useCreators';
import { useAllCreatorGalleries } from '@/hooks/useCreatorGallery';
import CreatorMiniGallery from '@/components/creators/CreatorMiniGallery';
import CreatorGalleryStats from '@/components/admin/CreatorGalleryStats';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { 
  Camera, 
  Users, 
  Star, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye,
  Award,
  TrendingUp,
  BarChart3,
  Activity,
  Calendar,
  Tag,
  Globe,
  Download,
  Upload,
  Share2,
  MessageCircle,
  Heart,
  ThumbsUp
} from 'lucide-react';

const CreatorGalleriesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [showMiniGallery, setShowMiniGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('galleries');

  const { creators, loading: creatorsLoading } = useCreators();
  const { allImages, loading: imagesLoading, getImagesByCreator } = useAllCreatorGalleries();

  // Créateurs avec leurs statistiques de galerie
  const creatorsWithStats = creators.map(creator => {
    const creatorImages = getImagesByCreator(creator.id);
    const featuredImages = creatorImages.filter(img => img.featured);
    
    return {
      ...creator,
      imageCount: creatorImages.length,
      featuredCount: featuredImages.length,
      lastUpload: creatorImages.length > 0 
        ? new Date(Math.max(...creatorImages.map(img => new Date(img.createdAt).getTime())))
        : null
    };
  });

  // Filtrage des créateurs
  const filteredCreators = creatorsWithStats.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || creator.country === filterCountry;
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && creator.featured) ||
                           (filterFeatured === 'not-featured' && !creator.featured);
    
    return matchesSearch && matchesCountry && matchesFeatured;
  });

  const handleViewMiniGallery = (creator: any) => {
    setSelectedCreator(creator);
    setShowMiniGallery(true);
  };

  const countries = ['all', ...Array.from(new Set(creators.map(c => c.country)))];

  if (creatorsLoading || imagesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des galeries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Galeries</h1>
          <p className="text-gray-600">Mini galeries associées à chaque créateur</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
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
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="galleries">Galeries</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="galleries" className="space-y-6">
          {/* Filtres */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un créateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCountry} onValueChange={setFilterCountry}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country === 'all' ? 'Tous les pays' : country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterFeatured} onValueChange={setFilterFeatured}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Mise en avant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="featured">Vedettes</SelectItem>
                    <SelectItem value="not-featured">Autres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Liste des créateurs avec galeries */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <Card key={creator.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-clofas-dark">{creator.name}</h3>
                        <p className="text-sm text-gray-600">{creator.country}</p>
                        {creator.featured && (
                          <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Vedette
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Statistiques de la galerie */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Camera className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-blue-600">{creator.imageCount}</p>
                        <p className="text-xs text-gray-600">Images</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-yellow-600">{creator.featuredCount}</p>
                        <p className="text-xs text-gray-600">Vedettes</p>
                      </div>
                    </div>

                    {/* Mini aperçu de la galerie */}
                    {creator.imageCount > 0 && (
                      <div className="mb-4">
                        <div className="grid grid-cols-3 gap-2">
                          {getImagesByCreator(creator.id).slice(0, 3).map((image, index) => (
                            <div
                              key={image.id}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                            >
                              <ImageWithFallback
                                src={image.displayUrl || image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {creator.imageCount > 3 && (
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-600">+{creator.imageCount - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMiniGallery(creator)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir Galerie
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleViewMiniGallery(creator)}
                        className="flex-1 bg-clofas-coral hover:bg-clofas-coral/90"
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        Gérer
                      </Button>
                    </div>

                    {/* Dernière activité */}
                    {creator.lastUpload && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500">
                          Dernier upload: {creator.lastUpload.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCreators.map((creator) => (
                <Card key={creator.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-clofas-coral rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {creator.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">{creator.name}</h3>
                          {creator.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{creator.country}</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{creator.imageCount}</p>
                          <p className="text-xs text-gray-600">Images</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-600">{creator.featuredCount}</p>
                          <p className="text-xs text-gray-600">Vedettes</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewMiniGallery(creator)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleViewMiniGallery(creator)}
                            className="bg-clofas-coral hover:bg-clofas-coral/90"
                          >
                            <Camera className="h-4 w-4 mr-1" />
                            Gérer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats">
          <CreatorGalleryStats />
        </TabsContent>
      </Tabs>

      {/* Mini Galerie du créateur */}
      {selectedCreator && (
        <CreatorMiniGallery
          creatorId={selectedCreator.id}
          creatorName={selectedCreator.name}
          isOpen={showMiniGallery}
          onClose={() => setShowMiniGallery(false)}
          onImageUpload={() => {
            setShowMiniGallery(false);
            // Recharger les données
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default CreatorGalleriesManagement;
