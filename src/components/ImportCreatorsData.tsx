import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCreators } from '@/hooks/useCreators';
import { useCreatorGallery } from '@/hooks/useCreatorGallery';
import { creators2024 } from '@/components/creators/CreatorsData';
import {
  Upload,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  Camera,
  Globe,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

const ImportCreatorsData = () => {
  const { createCreator, loading: isCreatingCreator } = useCreators();
  const { addImage } = useCreatorGallery();
  const [importing, setImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [importedCreators, setImportedCreators] = useState<string[]>([]);
  const [currentCreator, setCurrentCreator] = useState<string>('');

  const handleImportAll = async () => {
    setImporting(true);
    setImportedCount(0);
    setImportedCreators([]);
    toast.info('Importation des créateurs en cours...');

    for (const creatorData of creators2024) {
      try {
        setCurrentCreator(creatorData.name);
        
        // Créer le créateur
        const newCreator = await createCreator({
          name: creatorData.name,
          country: creatorData.country,
          bio: `Créateur de mode de ${creatorData.country}. Spécialisé dans la création de vêtements uniques et modernes.`,
          images: [],
          featured: false,
          website: '',
          socialMedia: {}
        });

        console.log(`✅ Créateur ${creatorData.name} créé avec succès`);

        // Ajouter les images si elles existent
        if (creatorData.images && creatorData.images.length > 0) {
          for (const imageUrl of creatorData.images) {
            try {
              await addImage(newCreator.id, {
                url: imageUrl,
                name: `Image de ${creatorData.name}`,
                description: `Photo de création de ${creatorData.name}`,
                category: 'création',
                featured: false,
                tags: ['mode', 'création', creatorData.country.toLowerCase()]
              });
              console.log(`📸 Image ajoutée pour ${creatorData.name}`);
            } catch (imageError) {
              console.error(`❌ Erreur image pour ${creatorData.name}:`, imageError);
            }
          }
        }

        setImportedCreators(prev => [...prev, creatorData.name]);
        setImportedCount(prev => prev + 1);
        
        toast.success(`${creatorData.name} importé avec succès`);
        
        // Petite pause pour éviter de surcharger Firebase
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error: any) {
        console.error(`❌ Erreur lors de l'importation de ${creatorData.name}:`, error);
        toast.error(`Erreur lors de l'importation de ${creatorData.name}: ${error.message}`);
      }
    }
    
    setImporting(false);
    setCurrentCreator('');
    toast.success('Tous les créateurs ont été importés !');
  };

  const totalImages = creators2024.reduce((acc, creator) => acc + (creator.images?.length || 0), 0);
  const creatorsWithImages = creators2024.filter(creator => creator.images && creator.images.length > 0);
  const creatorsWithoutImages = creators2024.filter(creator => !creator.images || creator.images.length === 0);

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Créateurs</p>
                <p className="text-2xl font-bold text-gray-900">{creators2024.length}</p>
              </div>
              <Users className="h-8 w-8 text-clofas-coral" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avec Images</p>
                <p className="text-2xl font-bold text-green-600">{creatorsWithImages.length}</p>
              </div>
              <Camera className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-2xl font-bold text-blue-600">{totalImages}</p>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bouton d'import */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Importer les Données CLOFAS 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Importation Complète</h3>
              <p className="text-gray-600">
                Importez tous les créateurs et leurs images dans votre base de données Firebase
              </p>
            </div>
            <Button 
              onClick={handleImportAll} 
              disabled={importing || isCreatingCreator}
              className="bg-clofas-coral hover:bg-clofas-coral-dark"
            >
              {importing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importation... ({importedCount}/{creators2024.length})
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Importer Tous les Créateurs
                </>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          {importing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span>{importedCount}/{creators2024.length}</span>
              </div>
              <Progress value={(importedCount / creators2024.length) * 100} className="w-full" />
              {currentCreator && (
                <p className="text-sm text-gray-600">
                  Importation de: <strong>{currentCreator}</strong>
                </p>
              )}
            </div>
          )}

          {/* Liste des créateurs importés */}
          {importedCreators.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Créateurs Importés :</h4>
              <div className="flex flex-wrap gap-2">
                {importedCreators.map(name => (
                  <Badge key={name} className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" /> {name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Détails des créateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Créateurs avec images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-green-600" />
              Créateurs avec Images ({creatorsWithImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creatorsWithImages.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{creator.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-3 w-3 mr-1" />
                      {creator.country}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {creator.images.length} images
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Créateurs sans images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
              Créateurs sans Images ({creatorsWithoutImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creatorsWithoutImages.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{creator.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-3 w-3 mr-1" />
                      {creator.country}
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Aucune image
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note importante */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900">Note Importante</h5>
              <p className="text-sm text-blue-800 mt-1">
                Cette action va importer tous vos créateurs CLOFAS 2024 dans Firebase. 
                Les créateurs avec des images auront leurs galeries automatiquement créées. 
                Les créateurs sans images pourront avoir leurs images ajoutées manuellement plus tard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCreatorsData;
