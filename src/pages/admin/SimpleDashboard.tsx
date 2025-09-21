import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDashboardStatsFirebase } from '@/hooks/useDashboardStatsFirebase';
import { useNavigate } from 'react-router-dom';
import ImportCreatorsData from '@/components/ImportCreatorsData';
import CreatorsDataSummary from '@/components/CreatorsDataSummary';
import CreatorsImagesPreview from '@/components/CreatorsImagesPreview';
import StylistsImportScript from '@/components/StylistsImportScript';
import ColorManagement from '@/components/admin/ColorManagement';
import PageManagement from '@/components/admin/PageManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import PhotoManagement from '@/components/admin/PhotoManagement';
import {
  Users,
  Calendar,
  Image,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Camera,
  MessageSquare,
  Terminal,
  Palette,
  FileText,
  Type
} from 'lucide-react';

const SimpleDashboard = () => {
  const { stats, loading, error } = useDashboardStatsFirebase();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Ajouter un Créateur',
      description: 'Créer un nouveau profil de créateur',
      icon: Award,
      color: 'bg-clofas-coral',
      action: () => navigate('/admin/creators')
    },
    {
      title: 'Gérer les Inscriptions',
      description: 'Voir et valider les inscriptions',
      icon: Users,
      color: 'bg-blue-500',
      action: () => navigate('/admin/participants')
    },
    {
      title: 'Upload d\'Images',
      description: 'Ajouter des images à la galerie',
      icon: Camera,
      color: 'bg-green-500',
      action: () => navigate('/admin/gallery')
    },
    {
      title: 'Programmer un Événement',
      description: 'Créer un nouvel événement',
      icon: Calendar,
      color: 'bg-purple-500',
      action: () => navigate('/admin/events')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'creator',
      title: 'Nouveau créateur ajouté',
      description: 'Beitch Faro a été ajouté à la base de données',
      time: 'Il y a 2 heures',
      icon: Award
    },
    {
      id: 2,
      type: 'registration',
      title: 'Nouvelle inscription',
      description: '3 nouvelles inscriptions en attente de validation',
      time: 'Il y a 4 heures',
      icon: Users
    },
    {
      id: 3,
      type: 'image',
      title: 'Images uploadées',
      description: '15 nouvelles images ajoutées à la galerie',
      time: 'Il y a 6 heures',
      icon: Image
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">Bienvenue dans votre panel d'administration CLOFAS 241</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-clofas">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Créateurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalCreators || 0}</p>
              </div>
              <div className="h-12 w-12 bg-clofas-coral/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-clofas-coral" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+2 cette semaine</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalRegistrations || 0}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>{stats?.registrationStats?.confirmed || 0} confirmées</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalImages || 0}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Image className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Camera className="h-4 w-4 mr-1" />
              <span>{stats?.imageStats?.featured || 0} en vedette</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Événements</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalEvents || 0}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{stats?.eventStats?.upcoming || 0} à venir</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
                onClick={action.action}
              >
                <div className={`h-10 w-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Activités Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Inscriptions en attente</span>
                </div>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Nouveau créateur ajouté</span>
                </div>
                <Badge variant="default">1</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Images uploadées</span>
                </div>
                <Badge variant="secondary">15</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Résumé des données disponibles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Données CLOFAS 2024 Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreatorsDataSummary />
        </CardContent>
      </Card>

      {/* Aperçu des images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Aperçu des Images CLOFAS 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreatorsImagesPreview />
        </CardContent>
      </Card>

      {/* Script d'import automatique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Terminal className="h-5 w-5 mr-2" />
            Script d'Import Automatique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StylistsImportScript />
        </CardContent>
      </Card>

      {/* Import des données CLOFAS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Import des Données CLOFAS 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImportCreatorsData />
        </CardContent>
      </Card>

      {/* Gestion des couleurs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Gestion des Couleurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ColorManagement />
        </CardContent>
      </Card>

      {/* Gestion des pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Gestion des Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PageManagement />
        </CardContent>
      </Card>

      {/* Gestion du contenu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Type className="h-5 w-5 mr-2" />
            Gestion du Contenu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ContentManagement />
        </CardContent>
      </Card>

      {/* Gestion des photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="h-5 w-5 mr-2" />
            Gestion des Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PhotoManagement />
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDashboard;
