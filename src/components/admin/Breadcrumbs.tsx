import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home, Users, Award, Calendar, Image, Mail, Settings, FileText, BarChart3, Shield, Camera, Video, Globe, Smartphone, Target, MessageSquare, Send, Download, Plus, Eye, Edit, Trash2, Star, TrendingUp, Zap, Activity, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const getPathInfo = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    // Dashboard
    if (pathname === '/admin' || pathname === '/admin/') {
      return [{
        name: 'Tableau de bord',
        href: '/admin',
        icon: Home,
        current: true
      }];
    }
    
    // Construction des breadcrumbs basée sur le chemin
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      switch (segment) {
        case 'admin':
          breadcrumbs.push({
            name: 'Administration',
            href: '/admin',
            icon: Home,
            current: isLast
          });
          break;
          
        case 'registrations':
          breadcrumbs.push({
            name: 'Inscriptions',
            href: '/admin/registrations',
            icon: Users,
            current: isLast
          });
          break;
          
        case 'creators':
          breadcrumbs.push({
            name: 'Créateurs',
            href: '/admin/creators',
            icon: Award,
            current: isLast
          });
          break;
          
        case 'gallery':
          breadcrumbs.push({
            name: 'Galerie',
            href: '/admin/gallery',
            icon: Image,
            current: isLast
          });
          break;
          
        case 'events':
          breadcrumbs.push({
            name: 'Événements',
            href: '/admin/events',
            icon: Calendar,
            current: isLast
          });
          break;
          
        case 'messages':
          breadcrumbs.push({
            name: 'Messages',
            href: '/admin/messages',
            icon: Mail,
            current: isLast
          });
          break;
          
        case 'settings':
          breadcrumbs.push({
            name: 'Paramètres',
            href: '/admin/settings',
            icon: Settings,
            current: isLast
          });
          break;
          
        case 'content':
          breadcrumbs.push({
            name: 'Contenu',
            href: '/admin/content',
            icon: FileText,
            current: isLast
          });
          break;
          
        case 'analytics':
          breadcrumbs.push({
            name: 'Analytics',
            href: '/admin/analytics',
            icon: BarChart3,
            current: isLast
          });
          break;
          
        case 'validation':
          breadcrumbs.push({
            name: 'Validation',
            href: '/admin/validation',
            icon: Shield,
            current: isLast
          });
          break;
          
        case 'creator-galleries':
          breadcrumbs.push({
            name: 'Mini Galeries',
            href: '/admin/creator-galleries',
            icon: Camera,
            current: isLast
          });
          break;
          
        case 'featured-creators':
          breadcrumbs.push({
            name: 'Créateurs Vedettes',
            href: '/admin/featured-creators',
            icon: Star,
            current: isLast
          });
          break;
          
        case 'workshops':
          breadcrumbs.push({
            name: 'Ateliers',
            href: '/admin/workshops',
            icon: Target,
            current: isLast
          });
          break;
          
        case 'fashion-show':
          breadcrumbs.push({
            name: 'Défilé de Mode',
            href: '/admin/fashion-show',
            icon: Award,
            current: isLast
          });
          break;
          
        case 'videos':
          breadcrumbs.push({
            name: 'Vidéos',
            href: '/admin/videos',
            icon: Video,
            current: isLast
          });
          break;
          
        case 'stories':
          breadcrumbs.push({
            name: 'Stories',
            href: '/admin/stories',
            icon: Smartphone,
            current: isLast
          });
          break;
          
        case 'newsletter':
          breadcrumbs.push({
            name: 'Newsletter',
            href: '/admin/newsletter',
            icon: Send,
            current: isLast
          });
          break;
          
        case 'social-media':
          breadcrumbs.push({
            name: 'Réseaux Sociaux',
            href: '/admin/social-media',
            icon: Globe,
            current: isLast
          });
          break;
          
        case 'users':
          breadcrumbs.push({
            name: 'Utilisateurs',
            href: '/admin/users',
            icon: Users,
            current: isLast
          });
          break;
          
        case 'security':
          breadcrumbs.push({
            name: 'Sécurité',
            href: '/admin/security',
            icon: Shield,
            current: isLast
          });
          break;
          
        case 'logs':
          breadcrumbs.push({
            name: 'Logs Système',
            href: '/admin/logs',
            icon: Clock,
            current: isLast
          });
          break;
          
        case 'export':
          breadcrumbs.push({
            name: 'Export de Données',
            href: '/admin/export',
            icon: Download,
            current: isLast
          });
          break;
          
        case 'quick-actions':
          breadcrumbs.push({
            name: 'Actions Rapides',
            href: '/admin/quick-actions',
            icon: Zap,
            current: isLast
          });
          break;
          
        default:
          // Pour les segments non reconnus, utiliser le nom du segment
          breadcrumbs.push({
            name: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
            href: currentPath,
            icon: FileText,
            current: isLast
          });
      }
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getPathInfo(location.pathname);
  
  if (breadcrumbs.length <= 1) {
    return null;
  }
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
          )}
          <Link
            to={breadcrumb.href}
            className={`flex items-center space-x-1 transition-colors ${
              breadcrumb.current
                ? 'text-clofas-coral font-medium'
                : 'text-gray-600 hover:text-clofas-coral'
            }`}
          >
            <breadcrumb.icon className="h-4 w-4" />
            <span>{breadcrumb.name}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
