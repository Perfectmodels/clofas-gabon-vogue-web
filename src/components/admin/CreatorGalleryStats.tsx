import { useState, useEffect } from 'react';
import { 
  Camera, 
  Star, 
  Eye, 
  Heart, 
  TrendingUp, 
  Users, 
  Award,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Tag,
  Globe,
  Download,
  Upload,
  Share2,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAllCreatorGalleries } from '@/hooks/useCreatorGallery';

const CreatorGalleryStats = () => {
  const { allImages, loading, error, getImagesByCreator, getFeaturedImages, getImagesByCategory } = useAllCreatorGalleries();
  const [stats, setStats] = useState({
    totalImages: 0,
    totalCreators: 0,
    featuredImages: 0,
    categories: {} as Record<string, number>,
    recentUploads: 0,
    topCreators: [] as Array<{ id: string; name: string; count: number }>
  });

  useEffect(() => {
    if (allImages.length > 0) {
      // Calculer les statistiques
      const totalImages = allImages.length;
      const featuredImages = getFeaturedImages().length;
      const categories: Record<string, number> = {};
      const creatorCounts: Record<string, number> = {};
      
      allImages.forEach(image => {
        // Compter par catégorie
        const category = image.category || 'Non classé';
        categories[category] = (categories[category] || 0) + 1;
        
        // Compter par créateur
        creatorCounts[image.creatorId] = (creatorCounts[image.creatorId] || 0) + 1;
      });

      // Top créateurs
      const topCreators = Object.entries(creatorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([creatorId, count]) => ({
          id: creatorId,
          name: `Créateur ${creatorId.slice(-4)}`, // Nom temporaire
          count
        }));

      // Images récentes (dernières 7 jours)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentUploads = allImages.filter(image => 
        new Date(image.createdAt) > sevenDaysAgo
      ).length;

      setStats({
        totalImages,
        totalCreators: Object.keys(creatorCounts).length,
        featuredImages,
        categories,
        recentUploads,
        topCreators
      });
    }
  }, [allImages, getFeaturedImages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalImages}</p>
                <p className="text-xs text-gray-500">Dans toutes les galeries</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Créateurs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCreators}</p>
                <p className="text-xs text-gray-500">Avec des galeries</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images Vedettes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.featuredImages}</p>
                <p className="text-xs text-gray-500">Mises en avant</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uploads Récents</p>
                <p className="text-3xl font-bold text-gray-900">{stats.recentUploads}</p>
                <p className="text-xs text-gray-500">Dernières 7 jours</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition par catégorie */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-500" />
              Répartition par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.categories).map(([category, count]) => {
                const percentage = stats.totalImages > 0 ? (count / stats.totalImages) * 100 : 0;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top créateurs */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Top Créateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topCreators.map((creator, index) => (
                <div key={creator.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-clofas-coral rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-gray-600">{creator.count} image{creator.count > 1 ? 's' : ''}</p>
                  </div>
                  <div className="w-16">
                    <Progress value={(creator.count / stats.totalImages) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activité récente */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-500" />
            Activité Récente des Galeries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="p-2 rounded-full bg-green-100">
                <Upload className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Nouveaux uploads</p>
                <p className="text-xs text-gray-600">{stats.recentUploads} images cette semaine</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100">
                <Star className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Images vedettes</p>
                <p className="text-xs text-gray-600">{stats.featuredImages} images mises en avant</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="p-2 rounded-full bg-purple-100">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Créateurs actifs</p>
                <p className="text-xs text-gray-600">{stats.totalCreators} créateurs avec des galeries</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorGalleryStats;
