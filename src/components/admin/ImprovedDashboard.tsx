import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Image, 
  Mail, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Send,
  Download,
  Settings,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  Star,
  Award,
  Globe,
  Smartphone,
  Camera,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const ImprovedDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Données simulées pour la démonstration
  const metrics = [
    {
      title: "Inscriptions Total",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Événements Actifs",
      value: "8",
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Créateurs",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Messages",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivity = [
    {
      type: "registration",
      title: "Nouvelle inscription au défilé",
      user: "Marie Dubois",
      time: "2 min",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      type: "upload",
      title: "5 nouvelles images ajoutées",
      user: "Admin",
      time: "15 min",
      icon: Camera,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      type: "message",
      title: "Message reçu de participant",
      user: "Jean Martin",
      time: "1h",
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      type: "creator",
      title: "Nouveau créateur ajouté",
      user: "Sarah Johnson",
      time: "2h",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const quickActions = [
    {
      title: "Nouveau Créateur",
      description: "Ajouter un créateur",
      icon: Plus,
      color: "bg-blue-500",
      href: "/admin/creators"
    },
    {
      title: "Envoyer Newsletter",
      description: "Communication",
      icon: Send,
      color: "bg-green-500",
      href: "/admin/newsletter"
    },
    {
      title: "Upload d'Images",
      description: "Ajouter à la galerie",
      icon: Camera,
      color: "bg-purple-500",
      href: "/admin/gallery"
    },
    {
      title: "Exporter Données",
      description: "Rapport complet",
      icon: Download,
      color: "bg-orange-500",
      href: "/admin/export"
    }
  ];

  const topCreators = [
    { name: "Sarah Johnson", country: "France", views: 1250, rating: 4.9 },
    { name: "Marie Dubois", country: "Gabon", views: 980, rating: 4.8 },
    { name: "Jean Martin", country: "Cameroun", views: 750, rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header amélioré */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord CLOFAS 241</h1>
              <p className="text-gray-600">Vue d'ensemble de votre événement de mode</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-red-500 text-white">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions rapides */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Actions Rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-full ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activité récente */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${activity.bgColor}`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top créateurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Top Créateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-clofas-coral rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{creator.name}</p>
                      <p className="text-sm text-gray-600">{creator.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{creator.views} vues</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-sm">{creator.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques et statistiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                Évolution des Inscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Graphique des inscriptions</p>
                  <p className="text-sm text-gray-500">Données en temps réel</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                Répartition par Pays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Graphique de répartition</p>
                  <p className="text-sm text-gray-500">Participants par pays</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImprovedDashboard;
