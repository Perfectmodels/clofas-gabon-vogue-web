import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCreators } from '@/hooks/useCreators';
// import { useCreatorGallery } from '@/hooks/useCreatorGallery'; // Utilisé plus tard
import { creators2024 } from '@/components/creators/CreatorsData';
import { 
  Upload, 
  Users, 
  CheckCircle, 
  Loader2, 
  AlertCircle,
  Image,
  Star,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

const ImportExistingCreators = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [importedCreators, setImportedCreators] = useState<string[]>([]);
  const { createCreator } = useCreators();

  const handleImportCreators = async () => {
    setIsImporting(true);
    setImportedCount(0);
    setImportedCreators([]);

    try {
      for (const creatorData of creators2024) {
        try {
          // Créer le créateur
          const newCreator = await createCreator({
            name: creatorData.name,
            country: creatorData.country,
            bio: `Créateur CLOFAS 241 - ${creatorData.name}`,
            featured: false, // Vous pourrez les marquer comme vedettes plus tard
            images: [],
            socialMedia: {},
            website: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });

          // Les images seront ajoutées manuellement depuis la mini-galerie
          // car le hook useCreatorGallery nécessite un composant React
          console.log(`${creatorData.name} créé avec ${creatorData.images?.length || 0} images à ajouter manuellement`);

          setImportedCreators(prev => [...prev, creatorData.name]);
          setImportedCount(prev => prev + 1);
          
          toast.success(`${creatorData.name} importé avec succès`);
        } catch (error) {
          console.error(`Erreur lors de l'import de ${creatorData.name}:`, error);
          toast.error(`Erreur pour ${creatorData.name}`);
        }
      }

      toast.success(`${importedCount} créateurs importés avec succès !`);
    } catch (error) {
      toast.error('Erreur lors de l\'import des créateurs');
      console.error('Erreur:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const getTotalImages = () => {
    return creators2024.reduce((total, creator) => total + (creator.images?.length || 0), 0);
  };

  const getCreatorsWithImages = () => {
    return creators2024.filter(creator => creator.images && creator.images.length > 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Importer vos Créateurs Existants
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informations sur les données existantes */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Données Disponibles</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              <span><strong>{creators2024.length}</strong> créateurs</span>
            </div>
            <div className="flex items-center">
              <Image className="h-4 w-4 mr-2 text-blue-600" />
              <span><strong>{getTotalImages()}</strong> images</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-blue-600" />
              <span><strong>{getCreatorsWithImages().length}</strong> avec galeries</span>
            </div>
          </div>
        </div>

        {/* Liste des créateurs à importer */}
        <div className="space-y-2">
          <h4 className="font-medium">Créateurs à Importer :</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {creators2024.map((creator) => (
              <div key={creator.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span className="font-medium">{creator.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {creator.country}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Image className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {creator.images?.length || 0} images
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton d'import */}
        <div className="flex items-center space-x-4">
          <Button 
            onClick={handleImportCreators}
            disabled={isImporting}
            className="bg-clofas-coral hover:bg-clofas-coral/90"
          >
            {isImporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isImporting ? 'Import en cours...' : 'Importer tous les Créateurs'}
          </Button>

          {importedCount > 0 && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{importedCount} créateurs importés</span>
            </div>
          )}
        </div>

        {/* Liste des créateurs importés */}
        {importedCreators.length > 0 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <h5 className="font-medium text-green-900 mb-2">Créateurs Importés :</h5>
            <div className="flex flex-wrap gap-1">
              {importedCreators.map((name, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* URLs des images pour référence */}
        {creators2024.some(c => c.images && c.images.length > 0) && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">URLs des Images Disponibles :</h5>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {creators2024.map((creator) => (
                creator.images && creator.images.length > 0 && (
                  <div key={creator.id} className="text-xs">
                    <strong>{creator.name}:</strong>
                    <div className="ml-2 space-y-1">
                      {creator.images.slice(0, 3).map((url, index) => (
                        <div key={index} className="text-gray-600 break-all">
                          {url}
                        </div>
                      ))}
                      {creator.images.length > 3 && (
                        <div className="text-gray-500">
                          ... et {creator.images.length - 3} autres images
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Note importante */}
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Note :</strong> Cette action va importer tous vos créateurs existants dans Firebase. 
              Les images devront être ajoutées manuellement depuis la section "Créateurs" → "Mini Galerie" 
              pour chaque créateur. Les URLs sont affichées ci-dessus pour référence.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportExistingCreators;
