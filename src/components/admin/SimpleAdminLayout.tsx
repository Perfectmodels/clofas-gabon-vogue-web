import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Calendar, 
  Image, 
  MessageSquare, 
  Settings, 
  Menu, 
  X, 
  Search,
  Bell,
  LogOut
} from 'lucide-react';
import { useDashboardStatsFirebase } from '@/hooks/useDashboardStatsFirebase';

const SimpleAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);
  const navigate = useNavigate();
  const location = useLocation();
  const { stats } = useDashboardStatsFirebase();

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Tableau de bord',
      icon: LayoutDashboard,
      path: '/admin',
      description: 'Vue d\'ensemble et statistiques'
    },
    {
      id: 'creators',
      name: 'Créateurs',
      icon: Award,
      path: '/admin/creators',
      description: 'Gestion des créateurs et leurs galeries',
      badge: stats?.totalCreators?.toString() || '0'
    },
    {
      id: 'participants',
      name: 'Participants',
      icon: Users,
      path: '/admin/participants',
      description: 'Inscriptions et gestion des participants',
      badge: stats?.totalRegistrations?.toString() || '0'
    },
    {
      id: 'events',
      name: 'Événements',
      icon: Calendar,
      path: '/admin/events',
      description: 'Programme et gestion des événements'
    },
    {
      id: 'gallery',
      name: 'Galerie',
      icon: Image,
      path: '/admin/gallery',
      description: 'Gestion des images et médias'
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageSquare,
      path: '/admin/messages',
      description: 'Communication et notifications',
      badge: '3'
    },
    {
      id: 'settings',
      name: 'Paramètres',
      icon: Settings,
      path: '/admin/settings',
      description: 'Configuration du site'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header-clofas px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div>
              <h1 className="text-xl font-bold text-clofas-dark">CLOFAS Admin</h1>
              <p className="text-sm text-gray-500">Panel d'administration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="bg-clofas-coral text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          sidebar-clofas fixed lg:static inset-y-0 left-0 z-50 
          transform transition-transform duration-200 ease-in-out lg:translate-x-0`}>
          <div className="p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start h-auto p-3 ${
                      isActive(item.path) 
                        ? 'bg-clofas-coral text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center w-full">
                      <item.icon className="h-5 w-5 mr-3" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <Badge className="bg-clofas-coral text-white ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs opacity-75 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SimpleAdminLayout;
