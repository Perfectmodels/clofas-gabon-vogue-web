import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Mail, 
  BarChart3,
  Calendar,
  Image,
  FileText,
  Settings,
  Shield,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  TrendingUp,
  Globe,
  Smartphone,
  Camera,
  Video,
  MessageSquare,
  Send,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  Star,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  path?: string;
  badge?: string;
  children?: NavigationItem[];
  isNew?: boolean;
}

const ImprovedNavigation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);

  const navigationItems: NavigationItem[] = [
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
      badge: '12',
      children: [
        { id: 'registrations', name: 'Inscriptions', icon: UserCheck, path: '/admin/registrations', badge: '12' },
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
      icon: Image,
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

  return (
    <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto">
      {/* Header avec recherche */}
      <div className="p-6 border-b">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-clofas-coral" />
          <span className="ml-2 text-xl font-bold text-clofas-dark">CLOFAS Admin</span>
        </div>
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

      {/* Navigation améliorée */}
      <nav className="p-4 space-y-2">
        {filteredItems.map((section) => (
          <Collapsible
            key={section.id}
            open={expandedSections.includes(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-3 h-auto"
              >
                <div className="flex items-center">
                  <section.icon className="h-5 w-5 mr-3 text-clofas-coral" />
                  <span className="font-medium">{section.name}</span>
                  {section.badge && (
                    <Badge className="ml-2 bg-clofas-gold text-white">
                      {section.badge}
                    </Badge>
                  )}
                </div>
                {section.children && (
                  expandedSections.includes(section.id) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            
            {section.children && (
              <CollapsibleContent className="ml-6 mt-2 space-y-1">
                {section.children.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto text-sm"
                  >
                    <item.icon className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        Nouveau
                      </Badge>
                    )}
                  </Button>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
      </nav>

      {/* Actions rapides */}
      <div className="p-4 border-t">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Actions Rapides</h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau créateur
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Send className="h-4 w-4 mr-2" />
            Envoyer newsletter
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Exporter données
          </Button>
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
            <strong>3</strong> nouvelles inscriptions
          </div>
          <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
            <strong>5</strong> images uploadées
          </div>
          <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded">
            <strong>2</strong> messages en attente
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedNavigation;
