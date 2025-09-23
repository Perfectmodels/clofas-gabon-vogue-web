import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useSiteSettingsFirebase } from '@/hooks/useSiteSettingsFirebase';
import { 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Database,
  Cloud,
  Wifi,
  WifiOff
} from 'lucide-react';
import { toast } from 'sonner';

interface AutoSaveManagerProps {
  className?: string;
}

const AutoSaveManager: React.FC<AutoSaveManagerProps> = ({ className }) => {
  const { settings, updateSettings } = useSiteSettingsFirebase();
  const { 
    autoSave, 
    saveImmediately,
    isSaving, 
    lastSaved, 
    error, 
    hasUnsavedChanges,
    clearError 
  } = useAutoSave({
    onSave: (data) => console.log('🔄 Sauvegarde globale en cours...', data),
    onSuccess: () => {
      console.log('✅ Sauvegarde globale réussie');
    },
    onError: (error) => {
      console.error('❌ Erreur de sauvegarde globale:', error);
      toast.error(`Erreur de sauvegarde: ${error}`);
    }
  });

  // Vérifier la connexion internet
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sauvegarde de test
  const testAutoSave = async () => {
    await saveImmediately(async () => {
      await updateSettings({
        lastAutoSaveTest: new Date().toISOString(),
        autoSaveEnabled: true
      });
    }, { test: true });
  };

  // Forcer la sauvegarde
  const forceSave = async () => {
    if (!isOnline) {
      toast.error('Pas de connexion internet');
      return;
    }

    await saveImmediately(async () => {
      await updateSettings({
        lastManualSave: new Date().toISOString(),
        settings: settings
      });
    }, { manual: true });
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4 text-red-500" />;
    if (error) return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (isSaving) return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
    if (hasUnsavedChanges) return <Clock className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const getStatusText = () => {
    if (!isOnline) return 'Hors ligne';
    if (error) return 'Erreur';
    if (isSaving) return 'Sauvegarde...';
    if (hasUnsavedChanges) return 'Modifications en attente';
    if (lastSaved) return `Sauvegardé à ${lastSaved.toLocaleTimeString()}`;
    return 'Prêt';
  };

  const getStatusColor = () => {
    if (!isOnline || error) return 'bg-red-100 text-red-800';
    if (isSaving || hasUnsavedChanges) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Gestionnaire de Sauvegarde
          </div>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <Badge className={getStatusColor()}>
              {getStatusIcon()}
              <span className="ml-1">{getStatusText()}</span>
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informations de statut */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Connexion:</span>
            <span className={`ml-2 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </span>
          </div>
          <div>
            <span className="font-medium">Base de données:</span>
            <span className="ml-2 text-blue-600">Firebase</span>
          </div>
          <div>
            <span className="font-medium">Dernière sauvegarde:</span>
            <span className="ml-2 text-gray-600">
              {lastSaved ? lastSaved.toLocaleString('fr-FR') : 'Jamais'}
            </span>
          </div>
          <div>
            <span className="font-medium">Modifications en attente:</span>
            <span className={`ml-2 ${hasUnsavedChanges ? 'text-yellow-600' : 'text-green-600'}`}>
              {hasUnsavedChanges ? 'Oui' : 'Non'}
            </span>
          </div>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2"
              onClick={clearError}
            >
              Effacer l'erreur
            </Button>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={testAutoSave}
            disabled={!isOnline || isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            Test de sauvegarde
          </Button>
          <Button 
            size="sm" 
            onClick={forceSave}
            disabled={!isOnline || isSaving}
          >
            <Cloud className="h-4 w-4 mr-2" />
            Sauvegarder maintenant
          </Button>
        </div>

        {/* Informations sur la sauvegarde automatique */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-medium text-blue-900 mb-2">Sauvegarde Automatique</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Toutes les modifications sont sauvegardées automatiquement</li>
            <li>• Délai de sauvegarde: 1 seconde après la dernière modification</li>
            <li>• Retry automatique en cas d'échec (3 tentatives)</li>
            <li>• Sauvegarde dans Firebase + localStorage comme backup</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoSaveManager;
