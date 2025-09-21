
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  Globe,
  FileText,
  Image,
  Video,
  Settings
} from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  type: 'page' | 'section' | 'text' | 'image' | 'video';
  content: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
}

const ContentManagement = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: "Page d'Accueil - Hero Section",
      type: 'section',
      content: "CLOFAS 241 - Célébrer et promouvoir la mode gabonaise...",
      status: 'published',
      lastModified: '2025-01-15',
      author: 'Admin'
    },
    {
      id: 2,
      title: "À Propos - Mission",
      type: 'text',
      content: "CLOFAS 241 a été fondé avec une mission claire...",
      status: 'published',
      lastModified: '2025-01-14',
      author: 'Admin'
    },
    {
      id: 3,
      title: "Galerie - Images Défilé",
      type: 'image',
      content: "Collection d'images du défilé de mode 2024",
      status: 'published',
      lastModified: '2025-01-13',
      author: 'Admin'
    },
    {
      id: 4,
      title: "Programme - Ateliers",
      type: 'section',
      content: "Détails des ateliers de dessin...",
      status: 'draft',
      lastModified: '2025-01-12',
      author: 'Admin'
    },
    {
      id: 5,
      title: "Vidéo Promo CLOFAS 241",
      type: 'video',
      content: "Vidéo promotionnelle de l'événement",
      status: 'published',
      lastModified: '2025-01-11',
      author: 'Admin'
    }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      'page': Globe,
      'section': FileText,
      'text': FileText,
      'image': Image,
      'video': Video
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'published': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-clofas-dark">Gestion du Contenu</h1>
          <p className="text-gray-600">Gérez le contenu de votre site web</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher du contenu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type de contenu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="page">Pages</SelectItem>
                <SelectItem value="section">Sections</SelectItem>
                <SelectItem value="text">Textes</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Vidéos</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tout le contenu</TabsTrigger>
          <TabsTrigger value="published">Publié</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="archived">Archivé</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedContent(item);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.lastModified}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContent ? `Modifier: ${selectedContent.title}` : 'Nouveau contenu'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedContent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Titre</label>
                  <Input 
                    defaultValue={selectedContent.title}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <Select defaultValue={selectedContent.type}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="section">Section</SelectItem>
                      <SelectItem value="text">Texte</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Vidéo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Contenu</label>
                <Textarea 
                  defaultValue={selectedContent.content}
                  className="mt-1 min-h-[300px]"
                  placeholder="Saisissez votre contenu ici..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Statut</label>
                  <Select defaultValue={selectedContent.status}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="archived">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Auteur</label>
                  <Input 
                    defaultValue={selectedContent.author}
                    className="mt-1"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
