import { useState, useEffect } from 'react';
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
  Info,
  Zap,
  Target,
  MessageSquare,
  FileText,
  Video,
  Shield,
  Download as DownloadIcon,
  Upload,
  Share2,
  Heart,
  ThumbsUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useDashboardStatsFirebase } from '@/hooks/useDashboardStatsFirebase';
import { useNavigate } from 'react-router-dom';

const EnhancedDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [animatedValues, setAnimatedValues] = useState({
    registrations: 0,
    events: 0,
    creators: 0,
    messages: 0
  });
  
  const navigate = useNavigate();
  const { stats, loading, error } = useDashboardStatsFirebase();

  // Animation des valeurs
  useEffect(() => {
    if (stats) {
      const animateValue = (key: string, target: number, duration: number = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      animateValue('registrations', stats.totalRegistrations || 0);
      animateValue('events', stats.totalEvents || 0);
      animateValue('creators', stats.totalCreators || 0);
      animateValue('messages', stats.totalMessages || 0);
    }
  }, [stats]);

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

  const metrics = [
    {
      title: "Inscriptions Total",
      value: animatedValues.registrations.toString(),
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Participants inscrits"
    },
    {
      title: "Événements Actifs",
      value: animatedValues.events.toString(),
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Conférence, Ateliers, Défilé"
    },
    {
      title: "Créateurs",
      value: animatedValues.creators.toString(),
      change: "+3",
      trend: "up",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Talents enregistrés"
    },
    {
      title: "Messages",
      value: animatedValues.messages.toString(),
      change: "+8%",
      trend: "up",
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Messages reçus"
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
    { name: "Sarah Johnson", country: "France", views: 1250, rating: 4.9, image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    { name: "Marie Dubois", country: "Gabon", views: 980, rating: 4.8, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { name: "Jean Martin", country: "Cameroun", views: 750, rating: 4.7, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
  ];

  const performanceData = [
    { label: "Inscriptions", value: 75, color: "bg-blue-500" },
    { label: "Créateurs", value: 60, color: "bg-purple-500" },
    { label: "Messages", value: 85, color: "bg-green-500" },
    { label: "Événements", value: 90, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Métriques principales avec animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
                  <p className="text-xs text-gray-500 mb-2">{metric.description}</p>
                  <div className="flex items-center">
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
                <div className={`p-4 rounded-full ${metric.bgColor} animate-pulse`}>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides améliorées */}
      <Card className="hover:shadow-lg transition-shadow">
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
                className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-300 hover:scale-105"
                onClick={() => navigate(action.href)}
              >
                <div className={`p-3 rounded-full ${action.color} text-white animate-bounce`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité récente améliorée */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`p-3 rounded-full ${activity.bgColor} animate-pulse`}>
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs animate-pulse">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top créateurs avec images */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Top Créateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCreators.map((creator, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-clofas-coral rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{creator.name}</p>
                    <p className="text-xs text-gray-600">{creator.country}</p>
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

      {/* Performance et graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
              Performance des Sections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-gray-600">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-500" />
              Répartition des Données
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-16 w-16 text-clofas-coral mx-auto mb-4 animate-spin" />
                <p className="text-gray-700 font-medium">Graphique de répartition</p>
                <p className="text-sm text-gray-500">Données en temps réel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques avancées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-500" />
              Géolocalisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Gabon</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">France</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cameroun</span>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-green-500" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Likes</span>
                <span className="text-sm font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Partages</span>
                <span className="text-sm font-medium">567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Commentaires</span>
                <span className="text-sm font-medium">89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-500" />
              Temps Réel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-clofas-coral mb-2">
                {new Date().toLocaleTimeString()}
              </div>
              <p className="text-sm text-gray-600">Dernière mise à jour</p>
              <div className="mt-3">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  En ligne
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
