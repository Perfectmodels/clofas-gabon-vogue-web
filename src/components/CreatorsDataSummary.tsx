import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { creators2024 } from '@/components/creators/CreatorsData';
import {
  Users,
  Camera,
  Globe,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const CreatorsDataSummary = () => {
  const totalImages = creators2024.reduce((acc, creator) => acc + (creator.images?.length || 0), 0);
  const creatorsWithImages = creators2024.filter(creator => creator.images && creator.images.length > 0);
  const creatorsWithoutImages = creators2024.filter(creator => !creator.images || creator.images.length === 0);
  
  // Statistiques par pays
  const countries = creators2024.reduce((acc, creator) => {
    acc[creator.country] = (acc[creator.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Créateurs</p>
                <p className="text-2xl font-bold text-gray-900">{creators2024.length}</p>
              </div>
              <Users className="h-8 w-8 text-clofas-coral" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avec Images</p>
                <p className="text-2xl font-bold text-green-600">{creatorsWithImages.length}</p>
              </div>
              <Camera className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-2xl font-bold text-blue-600">{totalImages}</p>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pays</p>
                <p className="text-2xl font-bold text-purple-600">{Object.keys(countries).length}</p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détails par pays */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Répartition par Pays
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(countries).map(([country, count]) => (
              <div key={country} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="font-medium">{country}</span>
                </div>
                <Badge className="bg-clofas-coral text-white">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des créateurs avec images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2 text-green-600" />
            Créateurs avec Images ({creatorsWithImages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {creatorsWithImages.map((creator) => (
              <div key={creator.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">{creator.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-3 w-3 mr-1" />
                      {creator.country}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    {creator.images.length} images
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des créateurs sans images */}
      {creatorsWithoutImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
              Créateurs sans Images ({creatorsWithoutImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creatorsWithoutImages.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium">{creator.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="h-3 w-3 mr-1" />
                        {creator.country}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Aucune image
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreatorsDataSummary;
