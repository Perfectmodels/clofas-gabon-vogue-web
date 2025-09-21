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
  Image,
  Type,
  Settings,
  Save,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  Upload,
  Download,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    values: string[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
      linkedin: string;
    };
  };
  event: {
    title: string;
    date: string;
    location: string;
    description: string;
    schedule: Array<{
      time: string;
      activity: string;
      description: string;
    }>;
  };
  footer: {
    copyright: string;
    links: Array<{
      title: string;
      url: string;
    }>;
  };
}

const defaultContent: SiteContent = {
  hero: {
    title: 'CLOFAS 241',
    subtitle: 'Événement de Mode',
    description: 'Découvrez la créativité et l\'innovation de la mode gabonaise',
    backgroundImage: '',
    ctaText: 'Découvrir',
    ctaLink: '/about'
  },
  about: {
    title: 'À Propos de CLOFAS',
    description: 'CLOFAS est un événement de mode qui célèbre la créativité et l\'innovation de la mode gabonaise.',
    mission: 'Promouvoir la mode gabonaise et africaine sur la scène internationale.',
    vision: 'Devenir la référence en matière d\'événements de mode en Afrique.',
    values: ['Créativité', 'Innovation', 'Excellence', 'Tradition']
  },
  contact: {
    email: 'contact@clofas241.com',
    phone: '+241 XX XX XX XX',
    address: 'Libreville, Gabon',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  },
  event: {
    title: 'CLOFAS 241',
    date: '2024',
    location: 'Libreville, Gabon',
    description: 'L\'événement de mode le plus prestigieux du Gabon',
    schedule: [
      { time: '09:00', activity: 'Accueil', description: 'Accueil des invités' },
      { time: '10:00', activity: 'Conférence', description: 'Conférence sur la mode' },
      { time: '14:00', activity: 'Défilé', description: 'Défilé de mode' }
    ]
  },
  footer: {
    copyright: '© 2024 CLOFAS. Tous droits réservés.',
    links: [
      { title: 'Accueil', url: '/' },
      { title: 'À Propos', url: '/about' },
      { title: 'Contact', url: '/contact' }
    ]
  }
};

const ContentManagement = () => {
  const { settings: siteSettings, updateSettings: updateSiteSettings, loading } = useSiteSettingsFirebase();
  const { autoSave, isSaving, lastSaved, error } = useAutoSave();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    if (siteSettings?.content) {
      setContent({ ...defaultContent, ...siteSettings.content });
    }
  }, [siteSettings]);

  const handleContentChange = (section: keyof SiteContent, field: string, value: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [field]: value
      }
    };
    setContent(newContent);
    
    autoSave(async () => {
      await updateSiteSettings({
        content: newContent
      });
    });
  };

  const handleArrayChange = (section: keyof SiteContent, field: string, index: number, value: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [field]: [
          ...(content[section] as any)[field].slice(0, index),
          value,
          ...(content[section] as any)[field].slice(index + 1)
        ]
      }
    };
    setContent(newContent);
    
    autoSave(async () => {
      await updateSiteSettings({
        content: newContent
      });
    });
  };

  const addArrayItem = (section: keyof SiteContent, field: string, newItem: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [field]: [...(content[section] as any)[field], newItem]
      }
    };
    setContent(newContent);
    
    autoSave(async () => {
      await updateSiteSettings({
        content: newContent
      });
    });
  };

  const removeArrayItem = (section: keyof SiteContent, field: string, index: number) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [field]: (content[section] as any)[field].filter((_: any, i: number) => i !== index)
      }
    };
    setContent(newContent);
    
    autoSave(async () => {
      await updateSiteSettings({
        content: newContent
      });
    });
  };

  const exportContent = () => {
    const contentData = {
      content,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(contentData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clofas-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Contenu exporté !');
  };

  const importContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.content) {
          setContent({ ...defaultContent, ...data.content });
          toast.success('Contenu importé !');
        }
      } catch (error) {
        toast.error('Erreur lors de l\'import');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion du Contenu</h2>
          <p className="text-gray-600">Gérez tout le contenu de votre site</p>
        </div>
        <div className="flex items-center space-x-2">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
          <Button variant="outline" onClick={exportContent}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={importContent}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation par sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero" className="flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            Accueil
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            À Propos
          </TabsTrigger>
          <TabsTrigger value="event" className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Événement
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center">
            <Settings className="h-4 w-4 mr-1" />
            Pied
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            Aperçu
          </TabsTrigger>
        </TabsList>

        {/* Section Hero */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Section Accueil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero-title">Titre Principal</Label>
                  <Input
                    id="hero-title"
                    value={content.hero.title}
                    onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                    placeholder="CLOFAS 241"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Sous-titre</Label>
                  <Input
                    id="hero-subtitle"
                    value={content.hero.subtitle}
                    onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                    placeholder="Événement de Mode"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={content.hero.description}
                  onChange={(e) => handleContentChange('hero', 'description', e.target.value)}
                  rows={3}
                  placeholder="Description de l'événement"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero-cta-text">Texte du Bouton</Label>
                  <Input
                    id="hero-cta-text"
                    value={content.hero.ctaText}
                    onChange={(e) => handleContentChange('hero', 'ctaText', e.target.value)}
                    placeholder="Découvrir"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-cta-link">Lien du Bouton</Label>
                  <Input
                    id="hero-cta-link"
                    value={content.hero.ctaLink}
                    onChange={(e) => handleContentChange('hero', 'ctaLink', e.target.value)}
                    placeholder="/about"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="hero-background">Image de Fond</Label>
                <Input
                  id="hero-background"
                  value={content.hero.backgroundImage}
                  onChange={(e) => handleContentChange('hero', 'backgroundImage', e.target.value)}
                  placeholder="URL de l'image de fond"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section À Propos */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Section À Propos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-title">Titre</Label>
                <Input
                  id="about-title"
                  value={content.about.title}
                  onChange={(e) => handleContentChange('about', 'title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={content.about.description}
                  onChange={(e) => handleContentChange('about', 'description', e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="about-mission">Mission</Label>
                  <Textarea
                    id="about-mission"
                    value={content.about.mission}
                    onChange={(e) => handleContentChange('about', 'mission', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="about-vision">Vision</Label>
                  <Textarea
                    id="about-vision"
                    value={content.about.vision}
                    onChange={(e) => handleContentChange('about', 'vision', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div>
                <Label>Valeurs</Label>
                <div className="space-y-2">
                  {content.about.values.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={value}
                        onChange={(e) => handleArrayChange('about', 'values', index, e.target.value)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem('about', 'values', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addArrayItem('about', 'values', 'Nouvelle valeur')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une valeur
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section Événement */}
        <TabsContent value="event">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Section Événement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="event-title">Titre</Label>
                  <Input
                    id="event-title"
                    value={content.event.title}
                    onChange={(e) => handleContentChange('event', 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    value={content.event.date}
                    onChange={(e) => handleContentChange('event', 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="event-location">Lieu</Label>
                  <Input
                    id="event-location"
                    value={content.event.location}
                    onChange={(e) => handleContentChange('event', 'location', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  value={content.event.description}
                  onChange={(e) => handleContentChange('event', 'description', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label>Programme</Label>
                <div className="space-y-2">
                  {content.event.schedule.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 p-3 border rounded-lg">
                      <Input
                        placeholder="Heure"
                        value={item.time}
                        onChange={(e) => handleArrayChange('event', 'schedule', index, { ...item, time: e.target.value })}
                      />
                      <Input
                        placeholder="Activité"
                        value={item.activity}
                        onChange={(e) => handleArrayChange('event', 'schedule', index, { ...item, activity: e.target.value })}
                      />
                      <div className="flex space-x-1">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => handleArrayChange('event', 'schedule', index, { ...item, description: e.target.value })}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeArrayItem('event', 'schedule', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addArrayItem('event', 'schedule', { time: '', activity: '', description: '' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter au programme
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section Contact */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Section Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    value={content.contact.email}
                    onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Téléphone</Label>
                  <Input
                    id="contact-phone"
                    value={content.contact.phone}
                    onChange={(e) => handleContentChange('contact', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-address">Adresse</Label>
                  <Input
                    id="contact-address"
                    value={content.contact.address}
                    onChange={(e) => handleContentChange('contact', 'address', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Réseaux Sociaux</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-facebook">Facebook</Label>
                    <Input
                      id="contact-facebook"
                      value={content.contact.socialMedia.facebook}
                      onChange={(e) => handleContentChange('contact', 'socialMedia', { ...content.contact.socialMedia, facebook: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-instagram">Instagram</Label>
                    <Input
                      id="contact-instagram"
                      value={content.contact.socialMedia.instagram}
                      onChange={(e) => handleContentChange('contact', 'socialMedia', { ...content.contact.socialMedia, instagram: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-twitter">Twitter</Label>
                    <Input
                      id="contact-twitter"
                      value={content.contact.socialMedia.twitter}
                      onChange={(e) => handleContentChange('contact', 'socialMedia', { ...content.contact.socialMedia, twitter: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-linkedin">LinkedIn</Label>
                    <Input
                      id="contact-linkedin"
                      value={content.contact.socialMedia.linkedin}
                      onChange={(e) => handleContentChange('contact', 'socialMedia', { ...content.contact.socialMedia, linkedin: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section Footer */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Pied de Page
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="footer-copyright">Copyright</Label>
                <Input
                  id="footer-copyright"
                  value={content.footer.copyright}
                  onChange={(e) => handleContentChange('footer', 'copyright', e.target.value)}
                />
              </div>
              <div>
                <Label>Liens</Label>
                <div className="space-y-2">
                  {content.footer.links.map((link, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Titre du lien"
                        value={link.title}
                        onChange={(e) => handleArrayChange('footer', 'links', index, { ...link, title: e.target.value })}
                      />
                      <div className="flex space-x-1">
                        <Input
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => handleArrayChange('footer', 'links', index, { ...link, url: e.target.value })}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeArrayItem('footer', 'links', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addArrayItem('footer', 'links', { title: '', url: '' })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un lien
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aperçu */}
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Aperçu du Contenu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Aperçu Hero */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Section Accueil</h3>
                  <h1 className="text-3xl font-bold text-gray-900">{content.hero.title}</h1>
                  <h2 className="text-xl text-gray-700 mb-2">{content.hero.subtitle}</h2>
                  <p className="text-gray-600 mb-4">{content.hero.description}</p>
                  <Button>{content.hero.ctaText}</Button>
                </div>

                {/* Aperçu À Propos */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Section À Propos</h3>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.about.title}</h2>
                  <p className="text-gray-600 mb-4">{content.about.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Mission</h4>
                      <p className="text-gray-600">{content.about.mission}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Vision</h4>
                      <p className="text-gray-600">{content.about.vision}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Valeurs</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.about.values.map((value, index) => (
                        <Badge key={index} variant="secondary">{value}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Aperçu Événement */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Section Événement</h3>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.event.title}</h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-gray-600">{content.event.date}</span>
                    <span className="text-gray-600">{content.event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{content.event.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Programme</h4>
                    <div className="space-y-2">
                      {content.event.schedule.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <span className="font-medium text-gray-900">{item.time}</span>
                          <span className="text-gray-700">{item.activity}</span>
                          <span className="text-gray-600">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
