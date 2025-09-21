import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Users, 
  Calendar, 
  Image, 
  Mail, 
  Settings, 
  FileText,
  Award,
  BarChart3,
  MessageSquare,
  Camera,
  Video,
  Globe,
  Smartphone,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  Star,
  Target,
  Send,
  Download,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'action' | 'data';
  icon: any;
  path?: string;
  badge?: string;
  category: string;
}

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchData: SearchResult[] = [
    // Pages principales
    { id: 'dashboard', title: 'Tableau de bord', description: 'Vue d\'ensemble et statistiques', type: 'page', icon: TrendingUp, path: '/admin', category: 'Navigation' },
    { id: 'registrations', title: 'Inscriptions', description: 'Gestion des participants', type: 'page', icon: Users, path: '/admin/registrations', category: 'Participants' },
    { id: 'creators', title: 'Créateurs', description: 'Gestion des créateurs et talents', type: 'page', icon: Award, path: '/admin/creators', category: 'Créateurs' },
    { id: 'gallery', title: 'Galerie', description: 'Gestion des images et médias', type: 'page', icon: Image, path: '/admin/gallery', category: 'Médias' },
    { id: 'events', title: 'Événements', description: 'Planning et gestion des événements', type: 'page', icon: Calendar, path: '/admin/events', category: 'Événements' },
    { id: 'messages', title: 'Messages', description: 'Centre de communication', type: 'page', icon: Mail, path: '/admin/messages', category: 'Communication' },
    { id: 'settings', title: 'Paramètres', description: 'Configuration du site', type: 'page', icon: Settings, path: '/admin/settings', category: 'Administration' },
    
    // Actions rapides
    { id: 'new-creator', title: 'Nouveau Créateur', description: 'Ajouter un nouveau créateur', type: 'action', icon: Plus, path: '/admin/creators', category: 'Actions' },
    { id: 'upload-images', title: 'Upload d\'Images', description: 'Ajouter des images à la galerie', type: 'action', icon: Camera, path: '/admin/gallery', category: 'Actions' },
    { id: 'send-newsletter', title: 'Envoyer Newsletter', description: 'Communication avec les participants', type: 'action', icon: Send, path: '/admin/newsletter', category: 'Actions' },
    { id: 'export-data', title: 'Exporter Données', description: 'Générer des rapports', type: 'action', icon: Download, path: '/admin/export', category: 'Actions' },
    
    // Sections spécialisées
    { id: 'validation', title: 'Validation des Inscriptions', description: 'Approuver les inscriptions', type: 'page', icon: Shield, path: '/admin/validation', category: 'Participants' },
    { id: 'analytics', title: 'Analytics', description: 'Statistiques et rapports', type: 'page', icon: BarChart3, path: '/admin/analytics', category: 'Analytics' },
    { id: 'newsletter', title: 'Newsletter', description: 'Gestion des communications', type: 'page', icon: MessageSquare, path: '/admin/newsletter', category: 'Communication' },
    { id: 'social-media', title: 'Réseaux Sociaux', description: 'Gestion des médias sociaux', type: 'page', icon: Globe, path: '/admin/social-media', category: 'Communication' },
    
    // Gestion des créateurs
    { id: 'creator-galleries', title: 'Mini Galeries', description: 'Galerie des créateurs', type: 'page', icon: Camera, path: '/admin/creator-galleries', category: 'Créateurs' },
    { id: 'featured-creators', title: 'Créateurs Vedettes', description: 'Mise en avant des créateurs', type: 'page', icon: Star, path: '/admin/featured-creators', category: 'Créateurs' },
    
    // Événements
    { id: 'workshops', title: 'Ateliers', description: 'Gestion des ateliers', type: 'page', icon: Target, path: '/admin/workshops', category: 'Événements' },
    { id: 'fashion-show', title: 'Défilé de Mode', description: 'Organisation du défilé', type: 'page', icon: Award, path: '/admin/fashion-show', category: 'Événements' },
    
    // Médias
    { id: 'videos', title: 'Vidéos', description: 'Gestion des vidéos', type: 'page', icon: Video, path: '/admin/videos', category: 'Médias' },
    { id: 'stories', title: 'Stories', description: 'Gestion des stories', type: 'page', icon: Smartphone, path: '/admin/stories', category: 'Médias' },
    
    // Administration
    { id: 'users', title: 'Utilisateurs', description: 'Gestion des utilisateurs', type: 'page', icon: Users, path: '/admin/users', category: 'Administration' },
    { id: 'security', title: 'Sécurité', description: 'Paramètres de sécurité', type: 'page', icon: Shield, path: '/admin/security', category: 'Administration' },
    { id: 'logs', title: 'Logs Système', description: 'Journal des activités', type: 'page', icon: Clock, path: '/admin/logs', category: 'Administration' }
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm('');
      }
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const selectedResult = results[selectedIndex];
          if (selectedResult.path) {
            window.location.href = selectedResult.path;
            setIsOpen(false);
            setSearchTerm('');
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-100 text-blue-800';
      case 'action': return 'bg-green-100 text-green-800';
      case 'data': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return <Eye className="h-3 w-3" />;
      case 'action': return <Zap className="h-3 w-3" />;
      case 'data': return <BarChart3 className="h-3 w-3" />;
      default: return <Search className="h-3 w-3" />;
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Search className="h-4 w-4 mr-2" />
        Recherche globale
        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded">⌘K</kbd>
      </Button>
    );
  }

  return (
    <div ref={searchRef} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              ref={inputRef}
              placeholder="Rechercher dans le panel admin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus:ring-0 text-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                setSearchTerm('');
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {searchTerm.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex ? 'bg-clofas-coral text-white' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      if (result.path) {
                        window.location.href = result.path;
                        setIsOpen(false);
                        setSearchTerm('');
                      }
                    }}
                  >
                    <result.icon className={`h-5 w-5 ${
                      index === selectedIndex ? 'text-white' : 'text-gray-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{result.title}</p>
                        <Badge className={getTypeColor(result.type)}>
                          {getTypeIcon(result.type)}
                          <span className="ml-1">{result.type}</span>
                        </Badge>
                        {result.badge && (
                          <Badge variant="secondary">{result.badge}</Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        index === selectedIndex ? 'text-white' : 'text-gray-600'
                      }`}>
                        {result.description}
                      </p>
                      <p className={`text-xs ${
                        index === selectedIndex ? 'text-white' : 'text-gray-500'
                      }`}>
                        {result.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun résultat trouvé pour "{searchTerm}"</p>
                <p className="text-sm text-gray-500 mt-2">
                  Essayez avec d'autres mots-clés
                </p>
              </div>
            )}
          </div>
        )}

        {searchTerm.length === 0 && (
          <div className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Recherche globale</p>
            <p className="text-sm text-gray-500 mb-4">
              Tapez pour rechercher dans les pages, actions et données
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Pages</Badge>
              <Badge variant="outline">Actions</Badge>
              <Badge variant="outline">Données</Badge>
              <Badge variant="outline">Navigation</Badge>
            </div>
          </div>
        )}

        <div className="p-3 border-t bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>↑↓ pour naviguer</span>
              <span>↵ pour sélectionner</span>
              <span>Esc pour fermer</span>
            </div>
            <span>⌘K pour ouvrir</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
