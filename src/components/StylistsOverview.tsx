import { useCreators } from '@/hooks/useCreators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Star, 
  MapPin, 
  Eye, 
  Plus,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StylistsOverview = () => {
  const { creators, loading, error } = useCreators();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Chargement des stylistes...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-red-500">
            <AlertCircle className="h-6 w-6 mr-2" />
            <span>Erreur: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const featuredStylists = creators.filter(stylist => stylist.featured);
  const countries = Array.from(new Set(creators.map(c => c.country)));

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Stylistes</p>
                <p className="text-2xl font-bold">{creators.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vedettes</p>
                <p className="text-2xl font-bold">{featuredStylists.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pays</p>
                <p className="text-2xl font-bold">{countries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des stylistes vedettes */}
      {featuredStylists.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Stylistes Vedettes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredStylists.map((stylist) => (
                <div key={stylist.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{stylist.name}</h3>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Vedette
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{stylist.country}</p>
                  {stylist.bio && (
                    <p className="text-sm text-gray-500 line-clamp-2">{stylist.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/admin/creators')}
              className="bg-clofas-coral hover:bg-clofas-coral/90"
            >
              <Eye className="h-4 w-4 mr-2" />
              Voir tous les Stylistes
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/admin/creators')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un Styliste
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message si aucun styliste */}
      {creators.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun styliste ajouté
            </h3>
            <p className="text-gray-500 mb-4">
              Commencez par ajouter vos premiers stylistes CLOFAS 241
            </p>
            <Button 
              onClick={() => navigate('/admin/creators')}
              className="bg-clofas-coral hover:bg-clofas-coral/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter le Premier Styliste
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StylistsOverview;
