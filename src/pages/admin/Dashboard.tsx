import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDashboardStatsFirebase } from '@/hooks/useDashboardStatsFirebase';
import AddRealStylist from '@/components/AddRealStylist';
import StylistsOverview from '@/components/StylistsOverview';
import ImportExistingCreators from '@/components/ImportExistingCreators';
import {
  Users,
  Calendar,
  Mail,
  Image,
  TrendingUp,
  CheckCircle,
  Shield,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Download,
  Database,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const { stats, loading, error } = useDashboardStatsFirebase();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des données</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Inscriptions Total",
      value: stats.totalRegistrations.toString(),
      description: "Participants inscrits",
      icon: Users,
      trend: { value: stats.registrationStats.confirmed, isPositive: true }
    },
    {
      title: "Événements Actifs",
      value: stats.totalEvents.toString(),
      description: "Conférence, Ateliers, Défilé",
      icon: Calendar,
      trend: { value: stats.eventStats.upcoming, isPositive: true }
    },
    {
      title: "Créateurs",
      value: stats.totalCreators.toString(),
      description: "Créateurs inscrits",
      icon: Star,
      trend: { value: stats.creatorStats.featured, isPositive: true }
    },
    {
      title: "Images Galerie",
      value: stats.totalImages.toString(),
      description: "Photos uploadées",
      icon: Image,
      trend: { value: stats.imageStats.featured, isPositive: true }
    }
  ];

  const recentRegistrations = stats.recentRegistrations;

  const quickActions = [
    { title: "Nouvelle Inscription", description: "Ajouter un participant", icon: Users, color: "bg-blue-500" },
    { title: "Upload d'Images", description: "Ajouter à la galerie", icon: Image, color: "bg-green-500" },
    { title: "Envoyer Newsletter", description: "Communication", icon: Mail, color: "bg-purple-500" },
    { title: "Exporter Données", description: "Rapport complet", icon: Download, color: "bg-orange-500" }
  ];

  // Suppression des états de chargement et d'erreur pour simplifier

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-clofas-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-clofas-coral" />
        </div>
        <h1 className="text-3xl font-bold text-clofas-dark mb-2">
          🎉 Panel Admin Opérationnel !
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Votre panel d'administration CLOFAS 241 est maintenant fonctionnel. 
          Clerk a été supprimé et le système d'authentification local est actif.
        </p>
      </div>

      {/* Status Card */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                ✅ Clerk Supprimé avec Succès
              </h3>
              <p className="text-green-700">
                Le panel fonctionne maintenant avec l'authentification locale uniquement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-clofas-dark">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
                <div className="w-12 h-12 bg-clofas-coral/20 rounded-lg flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-clofas-coral" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registrations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Inscriptions Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrations.map((registration) => (
                  <div key={registration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-clofas-dark">{registration.name}</p>
                      <p className="text-sm text-gray-600">{registration.event}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{registration.date}</p>
                      <Badge 
                        variant={registration.status === 'confirmé' ? 'default' : 'secondary'}
                        className={registration.status === 'confirmé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {registration.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Voir toutes les inscriptions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Firebase Test */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions Rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 text-clofas-coral mr-2" />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/admin/registrations'}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Gérer les Inscriptions
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/admin/gallery'}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Gérer la Galerie
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/'}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Voir le Site Public
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Importer les créateurs existants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Importer vos Créateurs Existants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImportExistingCreators />
          </CardContent>
        </Card>

        {/* Aperçu des stylistes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Vos Stylistes CLOFAS 241
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StylistsOverview />
          </CardContent>
        </Card>

        {/* Ajouter vos vrais stylistes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Ajouter un Nouveau Styliste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddRealStylist />
          </CardContent>
        </Card>

        {/* Statut de connexion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Connexion à votre Base de Données
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connexion Firebase Active
              </h3>
              <p className="text-gray-600 mb-4">
                Votre panel admin est connecté à votre base de données Firebase
              </p>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                <strong>URL :</strong> https://pmmga-9f8a1-default-rtdb.firebaseio.com/
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Nouvelle inscription au défilé</p>
                    <p className="text-xs text-gray-600">Il y a 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">5 nouvelles images ajoutées à la galerie</p>
                    <p className="text-xs text-gray-600">Il y a 15 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Newsletter envoyée à 247 abonnés</p>
                    <p className="text-xs text-gray-600">Il y a 1 heure</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
    </div>
  );
};

export default Dashboard;
