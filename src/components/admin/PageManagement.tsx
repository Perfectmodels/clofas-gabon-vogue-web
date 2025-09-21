import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSiteSettingsFirebase } from '@/hooks/useSiteSettingsFirebase';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Copy,
  ExternalLink,
  Image,
  Type,
  Layout,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  author: string;
}

const defaultPages: Page[] = [
  {
    id: 'home',
    title: 'Accueil',
    slug: '/',
    description: 'Page d\'accueil de CLOFAS 241',
    content: 'Bienvenue sur CLOFAS 241, l\'événement de mode le plus prestigieux du Gabon.',
    metaTitle: 'CLOFAS 241 - Événement de Mode',
    metaDescription: 'Découvrez CLOFAS 241, l\'événement de mode le plus prestigieux du Gabon.',
    featuredImage: '',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['accueil', 'mode'],
    author: 'Admin'
  },
  {
    id: 'about',
    title: 'À Propos',
    slug: '/about',
    description: 'Découvrez l\'histoire et la mission de CLOFAS',
    content: 'CLOFAS est un événement de mode qui célèbre la créativité et l\'innovation...',
    metaTitle: 'À Propos - CLOFAS 241',
    metaDescription: 'Découvrez l\'histoire et la mission de CLOFAS 241.',
    featuredImage: '',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['à propos', 'histoire'],
    author: 'Admin'
  }
];

const PageManagement = () => {
  const { settings: siteSettings, updateSettings: updateSiteSettings, loading } = useSiteSettingsFirebase();
  const { autoSave, isSaving, lastSaved, error } = useAutoSave();
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPage, setNewPage] = useState<Partial<Page>>({
    title: '',
    slug: '',
    description: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    featuredImage: '',
    status: 'draft',
    tags: [],
    author: 'Admin'
  });

  useEffect(() => {
    if (siteSettings?.pages) {
      setPages(siteSettings.pages);
    }
  }, [siteSettings]);

  const handleSavePage = async (pageData: Page) => {
    const updatedPages = pages.map(p => p.id === pageData.id ? { ...pageData, updatedAt: new Date().toISOString() } : p);
    setPages(updatedPages);
    
    await autoSave(async () => {
      await updateSiteSettings({
        pages: updatedPages
      });
    });
    
    toast.success('Page sauvegardée !');
  };

  const handleCreatePage = async () => {
    if (!newPage.title || !newPage.slug) {
      toast.error('Titre et slug requis');
      return;
    }

    const page: Page = {
      id: newPage.slug.replace('/', '').replace(/\//g, '-') || 'new-page',
      title: newPage.title,
      slug: newPage.slug,
      description: newPage.description || '',
      content: newPage.content || '',
      metaTitle: newPage.metaTitle || newPage.title,
      metaDescription: newPage.metaDescription || newPage.description || '',
      featuredImage: newPage.featuredImage || '',
      status: newPage.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: newPage.tags || [],
      author: newPage.author || 'Admin'
    };

    const updatedPages = [...pages, page];
    setPages(updatedPages);
    
    await autoSave(async () => {
      await updateSiteSettings({
        pages: updatedPages
      });
    });

    setNewPage({
      title: '',
      slug: '',
      description: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      featuredImage: '',
      status: 'draft',
      tags: [],
      author: 'Admin'
    });
    
    toast.success('Page créée !');
  };

  const handleDeletePage = async (pageId: string) => {
    const updatedPages = pages.filter(p => p.id !== pageId);
    setPages(updatedPages);
    
    await autoSave(async () => {
      await updateSiteSettings({
        pages: updatedPages
      });
    });
    
    toast.success('Page supprimée !');
  };

  const duplicatePage = (page: Page) => {
    const duplicatedPage: Page = {
      ...page,
      id: `${page.id}-copy`,
      title: `${page.title} (Copie)`,
      slug: `${page.slug}-copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPages([...pages, duplicatedPage]);
    toast.success('Page dupliquée !');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publié';
      case 'draft': return 'Brouillon';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Pages</h2>
          <p className="text-gray-600">Créez et gérez le contenu de votre site</p>
        </div>
        <div className="flex items-center space-x-2">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une Nouvelle Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      value={newPage.title}
                      onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                      placeholder="Titre de la page"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={newPage.slug}
                      onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                      placeholder="/ma-page"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPage.description}
                    onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                    placeholder="Description de la page"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Contenu</Label>
                  <Textarea
                    id="content"
                    value={newPage.content}
                    onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                    placeholder="Contenu de la page"
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Titre</Label>
                    <Input
                      id="metaTitle"
                      value={newPage.metaTitle}
                      onChange={(e) => setNewPage({ ...newPage, metaTitle: e.target.value })}
                      placeholder="Titre SEO"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <select
                      id="status"
                      value={newPage.status}
                      onChange={(e) => setNewPage({ ...newPage, status: e.target.value as any })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setNewPage({
                    title: '',
                    slug: '',
                    description: '',
                    content: '',
                    metaTitle: '',
                    metaDescription: '',
                    featuredImage: '',
                    status: 'draft',
                    tags: [],
                    author: 'Admin'
                  })}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreatePage}>
                    <Save className="h-4 w-4 mr-2" />
                    Créer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Liste des pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Card key={page.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{page.slug}</p>
                </div>
                <Badge className={getStatusColor(page.status)}>
                  {getStatusLabel(page.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {page.description || page.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedPage(page);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => duplicatePage(page)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(page.slug, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePage(page.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(page.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Éditeur de page */}
      {selectedPage && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Éditer: {selectedPage.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content">Contenu</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="media">Média</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Titre</Label>
                    <Input
                      id="edit-title"
                      value={selectedPage.title}
                      onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-slug">Slug</Label>
                    <Input
                      id="edit-slug"
                      value={selectedPage.slug}
                      onChange={(e) => setSelectedPage({ ...selectedPage, slug: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={selectedPage.description}
                      onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-content">Contenu</Label>
                    <Textarea
                      id="edit-content"
                      value={selectedPage.content}
                      onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })}
                      rows={10}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="edit-meta-title">Meta Titre</Label>
                    <Input
                      id="edit-meta-title"
                      value={selectedPage.metaTitle}
                      onChange={(e) => setSelectedPage({ ...selectedPage, metaTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-meta-description">Meta Description</Label>
                    <Textarea
                      id="edit-meta-description"
                      value={selectedPage.metaDescription}
                      onChange={(e) => setSelectedPage({ ...selectedPage, metaDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                  <div>
                    <Label htmlFor="edit-featured-image">Image à la Une</Label>
                    <Input
                      id="edit-featured-image"
                      value={selectedPage.featuredImage}
                      onChange={(e) => setSelectedPage({ ...selectedPage, featuredImage: e.target.value })}
                      placeholder="URL de l'image"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div>
                    <Label htmlFor="edit-status">Statut</Label>
                    <select
                      id="edit-status"
                      value={selectedPage.status}
                      onChange={(e) => setSelectedPage({ ...selectedPage, status: e.target.value as any })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="edit-author">Auteur</Label>
                    <Input
                      id="edit-author"
                      value={selectedPage.author}
                      onChange={(e) => setSelectedPage({ ...selectedPage, author: e.target.value })}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={() => {
                  handleSavePage(selectedPage);
                  setIsEditing(false);
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PageManagement;
