import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  Award,
  Calendar,
  Target,
  Camera,
  Video,
  FileText,
  Smartphone,
  MessageSquare,
  Send,
  Mail,
  Globe,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  Zap,
  TrendingUp,
  Activity,
  Star,
  Download,
  Filter,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useDashboardStatsFirebase } from '@/hooks/useDashboardStatsFirebase';
import GlobalSearch from './GlobalSearch';
import RealTimeNotifications from './RealTimeNotifications';
import Breadcrumbs from './Breadcrumbs';

// Gestion de l'utilisateur admin local
const useAdminUser = () => {
  const [user, setUser] = useState({ firstName: 'Admin', lastName: 'CLOFAS' });
  
  useEffect(() => {
    const storedUser = localStorage.getItem('clofas_admin_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  return { user };
};

const EnhancedAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAdminUser();
  const { stats } = useDashboardStatsFirebase();

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Tableau de bord',
      icon: LayoutDashboard,
      path: '/admin',
      children: [
        { id: 'overview', name: 'Vue d\'ensemble', icon: Eye, path: '/admin' },
        { id: 'analytics', name: 'Statistiques temps réel', icon: TrendingUp, path: '/admin/analytics' },
        { id: 'quick-actions', name: 'Actions rapides', icon: Zap, path: '/admin/quick-actions' }
      ]
    },
    {
      id: 'participants',
      name: 'Gestion des Participants',
      icon: Users,
      badge: stats?.totalRegistrations?.toString() || '0',
      children: [
        { id: 'registrations', name: 'Inscriptions', icon: UserCheck, path: '/admin/registrations', badge: stats?.totalRegistrations?.toString() || '0' },
        { id: 'validation', name: 'Validation', icon: Shield, path: '/admin/validation', badge: '3' },
        { id: 'communication', name: 'Communication groupée', icon: Send, path: '/admin/participant-communication' },
        { id: 'reports', name: 'Rapports participants', icon: BarChart3, path: '/admin/participant-reports' }
      ]
    },
    {
      id: 'creators',
      name: 'Créateurs & Talents',
      icon: Award,
      children: [
        { id: 'profiles', name: 'Profils créateurs', icon: Users, path: '/admin/creators' },
        { id: 'galleries', name: 'Mini galeries', icon: Camera, path: '/admin/creator-galleries' },
        { id: 'featured', name: 'Mise en avant', icon: Star, path: '/admin/featured-creators' },
        { id: 'social', name: 'Réseaux sociaux', icon: Globe, path: '/admin/creator-social' }
      ]
    },
    {
      id: 'events',
      name: 'Événements & Programme',
      icon: Calendar,
      children: [
        { id: 'planning', name: 'Planning événements', icon: Calendar, path: '/admin/events' },
        { id: 'workshops', name: 'Ateliers & Conférences', icon: Target, path: '/admin/workshops' },
        { id: 'fashion-show', name: 'Défilé de mode', icon: Award, path: '/admin/fashion-show' },
        { id: 'venues', name: 'Gestion des lieux', icon: Globe, path: '/admin/venues' }
      ]
    },
    {
      id: 'media',
      name: 'Médias & Contenu',
      icon: Camera,
      children: [
        { id: 'gallery', name: 'Galerie photos', icon: Camera, path: '/admin/gallery' },
        { id: 'videos', name: 'Vidéos', icon: Video, path: '/admin/videos' },
        { id: 'articles', name: 'Articles & actualités', icon: FileText, path: '/admin/content' },
        { id: 'stories', name: 'Stories & posts', icon: Smartphone, path: '/admin/stories' }
      ]
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: MessageSquare,
      badge: '3',
      children: [
        { id: 'messages', name: 'Messages entrants', icon: Mail, path: '/admin/messages', badge: '3' },
        { id: 'newsletter', name: 'Newsletter', icon: Send, path: '/admin/newsletter' },
        { id: 'social-media', name: 'Réseaux sociaux', icon: Globe, path: '/admin/social-media' },
        { id: 'analytics', name: 'Analytics communication', icon: BarChart3, path: '/admin/communication-analytics' }
      ]
    },
    {
      id: 'administration',
      name: 'Administration',
      icon: Settings,
      children: [
        { id: 'site-settings', name: 'Paramètres du site', icon: Settings, path: '/admin/settings' },
        { id: 'users', name: 'Gestion des utilisateurs', icon: Users, path: '/admin/users' },
        { id: 'security', name: 'Sécurité', icon: Shield, path: '/admin/security' },
        { id: 'logs', name: 'Logs système', icon: FileText, path: '/admin/logs' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredItems = navigationItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.children?.some(child => 
      child.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleLogout = () => {
    localStorage.removeItem('clofas_admin_user');
    localStorage.removeItem('clofas_admin_authenticated');
    navigate('/admin-login');
  };

  const quickActions = [
    { title: 'Nouveau Créateur', icon: Plus, path: '/admin/creators', color: 'bg-blue-500' },
    { title: 'Envoyer Newsletter', icon: Send, path: '/admin/newsletter', color: 'bg-green-500' },
    { title: 'Upload d\'Images', icon: Camera, path: '/admin/gallery', color: 'bg-purple-500' },
    { title: 'Exporter Données', icon: Download, path: '/admin/export', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar améliorée */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-clofas-coral" />
            <span className="ml-2 text-xl font-bold text-clofas-dark">CLOFAS Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Recherche intégrée */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Navigation réorganisée */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredItems.map((section) => (
              <Collapsible
                key={section.id}
                open={expandedSections.includes(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <section.icon className="h-5 w-5 mr-3 text-clofas-coral" />
                      <span className="font-medium text-gray-700">{section.name}</span>
                      {section.badge && (
                        <Badge className="ml-2 bg-clofas-gold text-white">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    {section.children && (
                      expandedSections.includes(section.id) ? 
                        <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                {section.children && (
                  <CollapsibleContent className="ml-6 mt-2 space-y-1">
                    {section.children.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path || '#'}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-clofas-coral text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2">
                            {item.badge}
                          </Badge>
                        )}
                      </NavLink>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            ))}
          </div>
        </nav>

        {/* Actions rapides */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Actions Rapides</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate(action.path)}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
            <Bell className="h-4 w-4 text-gray-500" />
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
              <strong>{stats?.totalRegistrations || 0}</strong> nouvelles inscriptions
            </div>
            <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
              <strong>5</strong> images uploadées
            </div>
            <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded">
              <strong>2</strong> messages en attente
            </div>
          </div>
        </div>

        {/* Profil utilisateur */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-clofas-coral rounded-full flex items-center justify-center text-white font-bold">
              {user.firstName[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Header amélioré */}
      <div className="lg:ml-80">
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {location.pathname === '/admin' ? 'Tableau de bord' : 
                     location.pathname.includes('creators') ? 'Gestion des Créateurs' :
                     location.pathname.includes('registrations') ? 'Inscriptions' :
                     location.pathname.includes('gallery') ? 'Galerie' :
                     location.pathname.includes('events') ? 'Événements' :
                     location.pathname.includes('settings') ? 'Paramètres' : 'Administration'}
                  </h1>
                  <p className="text-gray-600">
                    {location.pathname === '/admin' ? 'Vue d\'ensemble de votre événement' : 
                     'Gestion et administration de CLOFAS 241'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <GlobalSearch />
                <RealTimeNotifications />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <main className="p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EnhancedAdminLayout;
