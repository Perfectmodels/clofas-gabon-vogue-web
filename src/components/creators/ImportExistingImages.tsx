import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { useCreatorGallery } from '@/hooks/useCreatorGallery';
import { 
  FolderOpen, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Upload, 
  Database,
  Image as ImageIcon,
  Users
} from 'lucide-react';

// Données des stylistes avec images existantes
const stylistsWithExistingImages = [
  {
    id: 'creator-3',
    name: 'Angèle Epouta',
    folder: 'angele-epouta',
    imageCount: 18,
    status: 'Créatrice avec images existantes',
    description: 'Maître Créatrice avec 18 images dans le dossier local'
  },
  {
    id: 'creator-4',
    name: 'Angelina Creations',
    folder: 'angelina-creations',
    imageCount: 20,
    status: 'Maison de couture',
    description: 'Atelier réputé avec 20 images dans le dossier local'
  },
  {
    id: 'creator-5',
    name: 'L\'atelier Issé By Lita',
    folder: 'atelier-isse-by-lita',
    imageCount: 15,
    status: 'Créatrice',
    description: 'Espace créatif avec 15 images dans le dossier local'
  },
  {
    id: 'creator-11',
    name: 'Beitch Faro',
    folder: 'beitch-faro',
    imageCount: 45,
    status: 'Promotrice de l\'événement',
    description: 'Visionnaire avec 45 images dans le dossier local'
  }
];

interface ImportStatus {
  stylistId: string;
  status: 'pending' | 'importing' | 'success' | 'error';
  progress: number;
  error?: string;
}

const ImportExistingImages: React.FC = () => {
  const [importStatuses, setImportStatuses] = useState<ImportStatus[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();
  
  // Sauvegarde automatique
  const { autoSave, isSaving, lastSaved, error } = useAutoSave({
    onSave: (data) => console.log('🔄 Sauvegarde des images existantes:', data),
    onSuccess: () => console.log('✅ Images existantes sauvegardées avec succès'),
    onError: (error) => {
      console.error('❌ Erreur de sauvegarde des images existantes:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: `Les images n'ont pas pu être sauvegardées: ${error}`,
        variant: "destructive"
      });
    }
  });

  const getLocalImageUrl = (folder: string, filename: string): string => {
    return `/creators/${folder}/${filename}`;
  };

  const importStylistImages = async (stylist: typeof stylistsWithExistingImages[0]) => {
    try {
      // Mettre à jour le statut
      setImportStatuses(prev => prev.map(status => 
        status.stylistId === stylist.id 
          ? { ...status, status: 'importing', progress: 0 }
          : status
      ));

      // Utiliser le hook useCreatorGallery pour ce stylist
      const { addImage } = useCreatorGallery(stylist.id);
      
      // Générer les URLs des images locales
      const imageUrls = Array.from({ length: stylist.imageCount }, (_, i) => 
        getLocalImageUrl(stylist.folder, `${stylist.name.replace(/\s+/g, '')} (${i + 1}).jpg`)
      );

      let importedCount = 0;

      // Importer chaque image avec sauvegarde automatique
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        
        try {
          const imageData = {
            name: `${stylist.name} - Image ${i + 1}`,
            url: imageUrl,
            displayUrl: imageUrl,
            category: 'collection',
            tags: [stylist.name, 'CLOFAS 241', 'Mode Gabonaise', 'Import Local'],
            size: '0', // Taille inconnue pour les images locales
            dimensions: '0x0', // Dimensions inconnues
            uploadDate: new Date().toISOString(),
            author: stylist.name,
            alt: `${stylist.name} - Image ${i + 1}`,
            description: `Image locale de ${stylist.name} importée depuis le dossier ${stylist.folder}`,
            deleteUrl: '', // Pas de deleteUrl pour les images locales
            creatorId: stylist.id,
            year: new Date().getFullYear()
          };

          // Sauvegarder avec autoSave
          await autoSave(async () => {
            await addImage(imageData);
            console.log(`✅ Image ${i + 1} importée pour ${stylist.name}`);
          }, imageData);

          importedCount++;
          
          // Mettre à jour le progrès
          const progress = Math.round((importedCount / imageUrls.length) * 100);
          setImportStatuses(prev => prev.map(status => 
            status.stylistId === stylist.id 
              ? { ...status, progress }
              : status
          ));

        } catch (error: any) {
          console.error(`❌ Erreur import image ${i + 1} pour ${stylist.name}:`, error);
          // Continuer avec les autres images
        }
      }

      // Marquer comme succès
      setImportStatuses(prev => prev.map(status => 
        status.stylistId === stylist.id 
          ? { ...status, status: 'success', progress: 100 }
          : status
      ));

      console.log(`✅ Images importées pour ${stylist.name}: ${importedCount}/${imageUrls.length} images`);
      return true;
    } catch (error: any) {
      setImportStatuses(prev => prev.map(status => 
        status.stylistId === stylist.id 
          ? { ...status, status: 'error', error: error.message }
          : status
      ));
      return false;
    }
  };

  const importAllImages = async () => {
    setIsImporting(true);
    setOverallProgress(0);
    
    // Initialiser les statuts
    setImportStatuses(stylistsWithExistingImages.map(stylist => ({
      stylistId: stylist.id,
      status: 'pending',
      progress: 0
    })));

    let successCount = 0;
    const totalStylists = stylistsWithExistingImages.length;

    for (let i = 0; i < stylistsWithExistingImages.length; i++) {
      const stylist = stylistsWithExistingImages[i];
      const success = await importStylistImages(stylist);
      if (success) successCount++;
      
      setOverallProgress(((i + 1) / totalStylists) * 100);
    }

    setIsImporting(false);
    
    if (successCount === totalStylists) {
      toast({
        title: "Importation terminée avec succès",
        description: `${successCount} stylistes traités avec succès.`,
      });
    } else {
      toast({
        title: "Importation terminée avec des erreurs",
        description: `${successCount}/${totalStylists} stylistes traités avec succès.`,
        variant: "destructive"
      });
    }
  };

  const resetImport = () => {
    setImportStatuses([]);
    setOverallProgress(0);
    setIsImporting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'importing': return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'importing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'importing': return 'Importation...';
      case 'success': return 'Succès';
      case 'error': return 'Erreur';
      default: return 'Inconnu';
    }
  };

  const totalImages = stylistsWithExistingImages.reduce((sum, stylist) => sum + stylist.imageCount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 text-clofas-coral mr-2" />
              Importation des Images Existantes
            </CardTitle>
            <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Cette fonctionnalité importe les images déjà présentes dans le dossier <code>/creators/</code> 
              vers Firebase pour les stylistes qui ont des images locales mais pas encore dans la base de données.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">{stylistsWithExistingImages.length}</p>
                  <p className="text-sm text-blue-700">Stylistes</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <ImageIcon className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-green-900">{totalImages}</p>
                  <p className="text-sm text-green-700">Images totales</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FolderOpen className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-orange-900">4</p>
                  <p className="text-sm text-orange-700">Dossiers</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Upload className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-purple-900">Local</p>
                  <p className="text-sm text-purple-700">Source</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {stylistsWithExistingImages.map((stylist) => {
              const status = importStatuses.find(s => s.stylistId === stylist.id);
              return (
                <Card key={stylist.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(status?.status || 'pending')}
                        <div>
                          <h4 className="font-semibold">{stylist.name}</h4>
                          <p className="text-sm text-gray-600">{stylist.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{stylist.status}</Badge>
                            <Badge variant="outline">{stylist.imageCount} images</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {status && (
                          <>
                            <Badge className={getStatusColor(status.status)}>
                              {getStatusText(status.status)}
                            </Badge>
                            {status.status === 'importing' && (
                              <div className="w-32 mt-2">
                                <Progress value={status.progress} className="h-2" />
                              </div>
                            )}
                            {status.error && (
                              <p className="text-xs text-red-600 mt-1">{status.error}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isImporting && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progression globale</span>
                <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="w-full" />
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <Button 
              onClick={importAllImages} 
              disabled={isImporting}
              className="bg-clofas-coral hover:bg-clofas-coral/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? 'Importation en cours...' : 'Importer toutes les images'}
            </Button>
            <Button onClick={resetImport} variant="outline" disabled={isImporting}>
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informations sur les dossiers */}
      <Card>
        <CardHeader>
          <CardTitle>Structure des dossiers d'images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stylistsWithExistingImages.map((stylist) => (
              <div key={stylist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="h-5 w-5 text-gray-600" />
                  <div>
                    <code className="text-sm font-mono">/creators/{stylist.folder}/</code>
                    <p className="text-xs text-gray-600 mt-1">{stylist.name}</p>
                  </div>
                </div>
                <Badge variant="outline">{stylist.imageCount} fichiers</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportExistingImages;
