import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteSettingsFirebase } from '@/hooks/useSiteSettingsFirebase';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import {
  Palette,
  Save,
  RotateCcw,
  Eye,
  Download,
  Upload,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  successLight: string;
  warningLight: string;
  errorLight: string;
}

const defaultColors: ColorScheme = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFD93D',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#2C3E50',
  textSecondary: '#6C757D',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  successLight: '#D1FAE5',
  warningLight: '#FEF3C7',
  errorLight: '#FEE2E2'
};

const ColorManagement = () => {
  const { siteSettings, updateSiteSettings, loading } = useSiteSettingsFirebase();
  const { autoSave, isSaving, lastSaved, error } = useAutoSave();
  const [colors, setColors] = useState<ColorScheme>(defaultColors);
  const [previewMode, setPreviewMode] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    if (siteSettings?.colors) {
      setColors({ ...defaultColors, ...siteSettings.colors });
    }
  }, [siteSettings]);

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    
    // Auto-save
    autoSave(async () => {
      await updateSiteSettings({
        colors: newColors
      });
    });
  };

  const resetColors = () => {
    setColors(defaultColors);
    autoSave(async () => {
      await updateSiteSettings({
        colors: defaultColors
      });
    });
    toast.success('Couleurs réinitialisées');
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
    toast.success('Couleur copiée !');
  };

  const exportColors = () => {
    const colorData = {
      colors,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(colorData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clofas-colors.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Couleurs exportées !');
  };

  const importColors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.colors) {
          setColors({ ...defaultColors, ...data.colors });
          toast.success('Couleurs importées !');
        }
      } catch (error) {
        toast.error('Erreur lors de l\'import');
      }
    };
    reader.readAsText(file);
  };

  const colorCategories = [
    {
      title: 'Couleurs Principales',
      colors: [
        { key: 'primary', label: 'Primaire', description: 'Couleur principale du site' },
        { key: 'secondary', label: 'Secondaire', description: 'Couleur secondaire' },
        { key: 'accent', label: 'Accent', description: 'Couleur d\'accentuation' }
      ]
    },
    {
      title: 'Arrière-plans',
      colors: [
        { key: 'background', label: 'Arrière-plan', description: 'Couleur de fond générale' },
        { key: 'surface', label: 'Surface', description: 'Couleur des surfaces' }
      ]
    },
    {
      title: 'Texte',
      colors: [
        { key: 'text', label: 'Texte Principal', description: 'Couleur du texte principal' },
        { key: 'textSecondary', label: 'Texte Secondaire', description: 'Couleur du texte secondaire' }
      ]
    },
    {
      title: 'États',
      colors: [
        { key: 'success', label: 'Succès', description: 'Couleur pour les états de succès' },
        { key: 'warning', label: 'Avertissement', description: 'Couleur pour les avertissements' },
        { key: 'error', label: 'Erreur', description: 'Couleur pour les erreurs' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Couleurs</h2>
          <p className="text-gray-600">Personnalisez la palette de couleurs de votre site</p>
        </div>
        <div className="flex items-center space-x-2">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className={previewMode ? 'bg-blue-100' : ''}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Quitter l\'aperçu' : 'Aperçu'}
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button onClick={resetColors} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
        <Button onClick={exportColors} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={importColors}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
        </div>
      </div>

      {/* Aperçu en temps réel */}
      {previewMode && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Aperçu en Temps Réel</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                Titre d'Exemple
              </h3>
              <p 
                className="mb-4"
                style={{ color: colors.textSecondary }}
              >
                Ceci est un exemple de texte secondaire pour voir l'effet des couleurs.
              </p>
              <div className="flex space-x-2">
                <Button 
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: 'white',
                    border: 'none'
                  }}
                >
                  Bouton Primaire
                </Button>
                <Button 
                  variant="outline"
                  style={{ 
                    borderColor: colors.secondary,
                    color: colors.secondary
                  }}
                >
                  Bouton Secondaire
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gestion des couleurs par catégorie */}
      <Tabs defaultValue="main" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="main">Principales</TabsTrigger>
          <TabsTrigger value="backgrounds">Arrière-plans</TabsTrigger>
          <TabsTrigger value="text">Texte</TabsTrigger>
          <TabsTrigger value="states">États</TabsTrigger>
        </TabsList>

        {colorCategories.map((category, categoryIndex) => (
          <TabsContent key={categoryIndex} value={categoryIndex === 0 ? 'main' : categoryIndex === 1 ? 'backgrounds' : categoryIndex === 2 ? 'text' : 'states'}>
            <Card>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.colors.map((color) => (
                  <div key={color.key} className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-gray-200 overflow-hidden">
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: colors[color.key as keyof ColorScheme] }}
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium">{color.label}</Label>
                      <p className="text-xs text-gray-500">{color.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Input
                          value={colors[color.key as keyof ColorScheme]}
                          onChange={(e) => handleColorChange(color.key as keyof ColorScheme, e.target.value)}
                          className="w-32"
                          placeholder="#000000"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyColor(colors[color.key as keyof ColorScheme])}
                        >
                          {copiedColor === colors[color.key as keyof ColorScheme] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Palette complète */}
      <Card>
        <CardHeader>
          <CardTitle>Palette Complète</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 border-gray-200 mb-2 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: value }}
                  onClick={() => copyColor(value)}
                />
                <p className="text-xs font-medium capitalize">{key}</p>
                <p className="text-xs text-gray-500 font-mono">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorManagement;
