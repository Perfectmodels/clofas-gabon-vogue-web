import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettingsFirebase } from '@/hooks/useSiteSettingsFirebase';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { ImageIcon, Settings, Eye, EyeOff, Palette } from 'lucide-react';

interface BackgroundOption {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'default' | 'beitch-faro' | 'custom';
  enabled: boolean;
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'default',
    name: 'Arrière-plan par défaut',
    url: 'https://i.ibb.co/2zRKpF4/DSC-0273.jpg',
    description: 'Image par défaut du site CLOFAS',
    category: 'default',
    enabled: true
  },
  {
    id: 'beitch-faro',
    name: 'Beitch Faro - Célébration',
    url: '/creators/beitch-faro/Beitch Faro (1).jpg',
    description: 'Image de Beitch Faro lors d\'une célébration CLOFAS',
    category: 'beitch-faro',
    enabled: false
  }
];

const BackgroundManager: React.FC = () => {
  const [selectedBackground, setSelectedBackground] = useState<string>('default');
  const [showBackground, setShowBackground] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0.85);
  const { toast } = useToast();
  
  // Firebase et sauvegarde automatique
  const { settings, updateSettings } = useSiteSettingsFirebase();
  const { autoSave, isSaving, lastSaved, error } = useAutoSave({
    onSave: (data) => console.log('🔄 Sauvegarde des paramètres d\'arrière-plan:', data),
    onSuccess: () => toast({ title: "Paramètres sauvegardés", description: "Les paramètres d'arrière-plan ont été sauvegardés automatiquement" }),
    onError: (error) => toast({ title: "Erreur de sauvegarde", description: error, variant: "destructive" })
  });

  useEffect(() => {
    // Charger les préférences depuis Firebase ou localStorage
    if (settings?.background) {
      const bgSettings = settings.background;
      setSelectedBackground(bgSettings.selectedBackground || 'default');
      setShowBackground(bgSettings.showBackground !== false);
      setOverlayOpacity(bgSettings.overlayOpacity || 0.85);
    } else {
      // Fallback vers localStorage
      const savedBackground = localStorage.getItem('clofas-background');
      const savedVisibility = localStorage.getItem('clofas-background-visible');
      const savedOpacity = localStorage.getItem('clofas-background-opacity');

      if (savedBackground) {
        setSelectedBackground(savedBackground);
      }
      if (savedVisibility !== null) {
        setShowBackground(savedVisibility === 'true');
      }
      if (savedOpacity) {
        setOverlayOpacity(parseFloat(savedOpacity));
      }
    }
  }, [settings]);

  const applyBackground = (backgroundId: string) => {
    const background = backgroundOptions.find(bg => bg.id === backgroundId);
    if (!background) return;

    setSelectedBackground(backgroundId);

    // Appliquer l'arrière-plan via CSS
    const root = document.documentElement;
    if (showBackground) {
      root.style.setProperty('--background-image', `url('${background.url}')`);
    } else {
      root.style.setProperty('--background-image', 'none');
    }

    // Sauvegarde automatique dans Firebase
    autoSave(async () => {
      const backgroundSettings = {
        selectedBackground: backgroundId,
        showBackground,
        overlayOpacity,
        lastUpdated: new Date().toISOString()
      };
      
      await updateSettings({
        background: backgroundSettings
      });
      
      // Sauvegarder aussi en localStorage comme backup
      localStorage.setItem('clofas-background', backgroundId);
    }, { backgroundId, showBackground, overlayOpacity });

    toast({
      title: "Arrière-plan mis à jour",
      description: `Arrière-plan changé vers: ${background.name}`,
    });
  };

  const toggleBackgroundVisibility = (visible: boolean) => {
    setShowBackground(visible);

    const root = document.documentElement;
    if (visible) {
      const background = backgroundOptions.find(bg => bg.id === selectedBackground);
      if (background) {
        root.style.setProperty('--background-image', `url('${background.url}')`);
      }
    } else {
      root.style.setProperty('--background-image', 'none');
    }

    // Sauvegarde automatique dans Firebase
    autoSave(async () => {
      const backgroundSettings = {
        selectedBackground,
        showBackground: visible,
        overlayOpacity,
        lastUpdated: new Date().toISOString()
      };
      
      await updateSettings({
        background: backgroundSettings
      });
      
      // Sauvegarder aussi en localStorage comme backup
      localStorage.setItem('clofas-background-visible', visible.toString());
    }, { selectedBackground, showBackground: visible, overlayOpacity });

    toast({
      title: visible ? "Arrière-plan activé" : "Arrière-plan désactivé",
      description: visible ? "L'arrière-plan est maintenant visible" : "L'arrière-plan est maintenant masqué",
    });
  };

  const updateOverlayOpacity = (opacity: number) => {
    setOverlayOpacity(opacity);

    // Mettre à jour l'overlay
    const root = document.documentElement;
    root.style.setProperty('--background-overlay', `rgba(255, 255, 255, ${opacity})`);

    // Sauvegarde automatique dans Firebase
    autoSave(async () => {
      const backgroundSettings = {
        selectedBackground,
        showBackground,
        overlayOpacity: opacity,
        lastUpdated: new Date().toISOString()
      };
      
      await updateSettings({
        background: backgroundSettings
      });
      
      // Sauvegarder aussi en localStorage comme backup
      localStorage.setItem('clofas-background-opacity', opacity.toString());
    }, { selectedBackground, showBackground, overlayOpacity: opacity });
  };

  const getBackgroundPreview = (url: string) => {
    return {
      backgroundImage: `url('${url}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 text-clofas-coral mr-2" />
              Gestionnaire d'Arrière-plan
            </CardTitle>
            <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sélection de l'arrière-plan */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sélectionner un arrière-plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {backgroundOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedBackground === option.id 
                      ? 'ring-2 ring-clofas-coral bg-clofas-coral/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => applyBackground(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-video rounded-lg mb-3 overflow-hidden" 
                         style={getBackgroundPreview(option.url)}>
                      <div className="w-full h-full bg-black/20 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{option.name}</h4>
                        {selectedBackground === option.id && (
                          <Badge className="bg-clofas-coral text-white">
                            Actif
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {option.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contrôles de visibilité */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contrôles de visibilité</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-background"
                checked={showBackground}
                onCheckedChange={toggleBackgroundVisibility}
              />
              <Label htmlFor="show-background" className="flex items-center">
                {showBackground ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                Afficher l'arrière-plan
              </Label>
            </div>

            {showBackground && (
              <div className="space-y-2">
                <Label>Opacité de l'overlay: {Math.round(overlayOpacity * 100)}%</Label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={overlayOpacity}
                  onChange={(e) => updateOverlayOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Transparent</span>
                  <span>Opaque</span>
                </div>
              </div>
            )}
          </div>

          {/* Informations sur l'image actuelle */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Informations sur l'arrière-plan actuel</h3>
            {(() => {
              const currentBg = backgroundOptions.find(bg => bg.id === selectedBackground);
              return currentBg ? (
                <div className="space-y-1 text-sm">
                  <p><strong>Nom:</strong> {currentBg.name}</p>
                  <p><strong>URL:</strong> <code className="bg-gray-200 px-1 rounded">{currentBg.url}</code></p>
                  <p><strong>Description:</strong> {currentBg.description}</p>
                  <p><strong>Statut:</strong> {showBackground ? 'Visible' : 'Masqué'}</p>
                  {showBackground && (
                    <p><strong>Opacité overlay:</strong> {Math.round(overlayOpacity * 100)}%</p>
                  )}
                </div>
              ) : null;
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundManager;
