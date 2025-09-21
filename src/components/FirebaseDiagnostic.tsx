import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ref, get } from 'firebase/database';
import { database } from '@/services/firebase';
import { 
  Database, 
  Users, 
  CheckCircle, 
  XCircle, 
  Loader2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const FirebaseDiagnostic = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [diagnostic, setDiagnostic] = useState<any>(null);

  const checkFirebaseData = async () => {
    setIsChecking(true);
    
    try {
      // Vérifier les créateurs
      const creatorsRef = ref(database, 'creators');
      const creatorsSnapshot = await get(creatorsRef);
      const creatorsData = creatorsSnapshot.val();
      
      // Vérifier les images de créateurs
      const creatorImagesRef = ref(database, 'creatorImages');
      const creatorImagesSnapshot = await get(creatorImagesRef);
      const creatorImagesData = creatorImagesSnapshot.val();
      
      // Vérifier les inscriptions
      const registrationsRef = ref(database, 'registrations');
      const registrationsSnapshot = await get(registrationsRef);
      const registrationsData = registrationsSnapshot.val();
      
      // Vérifier les événements
      const eventsRef = ref(database, 'events');
      const eventsSnapshot = await get(eventsRef);
      const eventsData = eventsSnapshot.val();
      
      // Vérifier les images générales
      const imagesRef = ref(database, 'images');
      const imagesSnapshot = await get(imagesRef);
      const imagesData = imagesSnapshot.val();

      const diagnosticResult = {
        creators: {
          exists: !!creatorsData,
          count: creatorsData ? Object.keys(creatorsData).length : 0,
          data: creatorsData
        },
        creatorImages: {
          exists: !!creatorImagesData,
          count: creatorImagesData ? Object.keys(creatorImagesData).length : 0,
          data: creatorImagesData
        },
        registrations: {
          exists: !!registrationsData,
          count: registrationsData ? Object.keys(registrationsData).length : 0
        },
        events: {
          exists: !!eventsData,
          count: eventsData ? Object.keys(eventsData).length : 0
        },
        images: {
          exists: !!imagesData,
          count: imagesData ? Object.keys(imagesData).length : 0
        }
      };

      setDiagnostic(diagnosticResult);
      
      if (creatorsData && Object.keys(creatorsData).length > 0) {
        toast.success(`${Object.keys(creatorsData).length} créateurs trouvés dans Firebase !`);
      } else {
        toast.warning('Aucun créateur trouvé dans Firebase. Importez vos créateurs existants.');
      }
      
    } catch (error: any) {
      console.error('Erreur lors du diagnostic Firebase:', error);
      toast.error('Erreur lors de la vérification Firebase');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkFirebaseData();
  }, []);

  const getStatusIcon = (exists: boolean, count: number) => {
    if (count > 0) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (exists) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = (exists: boolean, count: number) => {
    if (count > 0) {
      return `${count} élément${count > 1 ? 's' : ''}`;
    } else if (exists) {
      return 'Vide';
    } else {
      return 'Non trouvé';
    }
  };

  const getStatusColor = (exists: boolean, count: number) => {
    if (count > 0) {
      return 'bg-green-100 text-green-800';
    } else if (exists) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Diagnostic Firebase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bouton de vérification */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={checkFirebaseData}
            disabled={isChecking}
            variant="outline"
          >
            {isChecking ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {isChecking ? 'Vérification...' : 'Vérifier Firebase'}
          </Button>
          
          {diagnostic && (
            <div className="text-sm text-gray-600">
              Dernière vérification : {new Date().toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Résultats du diagnostic */}
        {diagnostic && (
          <div className="space-y-3">
            <h4 className="font-medium">État de la Base de Données :</h4>
            
            {/* Créateurs */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(diagnostic.creators.exists, diagnostic.creators.count)}
                <div>
                  <span className="font-medium">Créateurs</span>
                  <p className="text-sm text-gray-600">
                    {diagnostic.creators.count > 0 
                      ? `${diagnostic.creators.count} créateur${diagnostic.creators.count > 1 ? 's' : ''} trouvé${diagnostic.creators.count > 1 ? 's' : ''}`
                      : 'Aucun créateur dans Firebase'
                    }
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(diagnostic.creators.exists, diagnostic.creators.count)}>
                {getStatusText(diagnostic.creators.exists, diagnostic.creators.count)}
              </Badge>
            </div>

            {/* Images de créateurs */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(diagnostic.creatorImages.exists, diagnostic.creatorImages.count)}
                <div>
                  <span className="font-medium">Images de Créateurs</span>
                  <p className="text-sm text-gray-600">
                    {diagnostic.creatorImages.count > 0 
                      ? `${diagnostic.creatorImages.count} galerie${diagnostic.creatorImages.count > 1 ? 's' : ''}`
                      : 'Aucune galerie de créateur'
                    }
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(diagnostic.creatorImages.exists, diagnostic.creatorImages.count)}>
                {getStatusText(diagnostic.creatorImages.exists, diagnostic.creatorImages.count)}
              </Badge>
            </div>

            {/* Autres données */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Inscriptions</span>
                </div>
                <Badge className={getStatusColor(diagnostic.registrations.exists, diagnostic.registrations.count)}>
                  {diagnostic.registrations.count}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Événements</span>
                </div>
                <Badge className={getStatusColor(diagnostic.events.exists, diagnostic.events.count)}>
                  {diagnostic.events.count}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Images</span>
                </div>
                <Badge className={getStatusColor(diagnostic.images.exists, diagnostic.images.count)}>
                  {diagnostic.images.count}
                </Badge>
              </div>
            </div>

            {/* Message d'action */}
            {diagnostic.creators.count === 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-900">Action Requise</h5>
                    <p className="text-sm text-yellow-800 mt-1">
                      Aucun créateur trouvé dans Firebase. Utilisez le composant "Importer vos Créateurs Existants" 
                      ci-dessus pour transférer vos créateurs depuis vos fichiers locaux.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Détails des créateurs si ils existent */}
            {diagnostic.creators.count > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">Créateurs Trouvés :</h5>
                <div className="space-y-1">
                  {Object.entries(diagnostic.creators.data).map(([id, creator]: [string, any]) => (
                    <div key={id} className="text-sm text-green-800">
                      • {creator.name} ({creator.country})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FirebaseDiagnostic;
