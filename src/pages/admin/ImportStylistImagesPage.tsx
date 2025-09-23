import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ImportStylistImages from '@/components/creators/ImportStylistImages';
import ImportExistingImages from '@/components/creators/ImportExistingImages';
import { Users, AlertCircle, CheckCircle } from 'lucide-react';

const ImportStylistImagesPage: React.FC = () => {
  const stylistsWithoutImages = [
    {
      id: "creator-0",
      name: "Lady Riaba",
      status: "Créatrice Émergente",
      description: "Lady Riaba incarne la nouvelle génération de créateurs gabonais avec une approche révolutionnaire qui redéfinit les codes de la mode contemporaine."
    },
    {
      id: "creator-1", 
      name: "Madame Luc-Abiale",
      status: "Designer Innovante",
      description: "Madame Luc-Abiale se distingue par son approche visionnaire de la mode gabonaise, où chaque création raconte une histoire profonde."
    },
    {
      id: "creator-2",
      name: "Belle Soeur", 
      status: "Artiste Créative",
      description: "Belle Soeur apporte une énergie créative unique à la mode gabonaise avec des designs qui célèbrent la féminité et l'élégance."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Importation d'Images Stylistes</h1>
          <p className="text-gray-600">Importez des images uniquement pour les stylistes sans photos</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {stylistsWithoutImages.length} stylistes sans images
        </Badge>
      </div>

      {/* Information sur les stylistes sans images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
            Stylistes identifiés sans images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Les stylistes suivants ont été identifiés comme n'ayant pas d'images dans leur galerie. 
              Vous pouvez utiliser l'outil d'importation ci-dessous pour ajouter leurs photos.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stylistsWithoutImages.map((stylist) => (
              <Card key={stylist.id} className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{stylist.name}</h4>
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {stylist.status}
                  </Badge>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {stylist.description}
                  </p>
                  <div className="mt-3 flex items-center text-xs text-orange-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Aucune image disponible
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Composant d'importation pour stylistes sans images */}
      <ImportStylistImages />

      {/* Composant d'importation pour images existantes */}
      <ImportExistingImages />

      {/* Instructions d'utilisation */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions d'utilisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Importation pour stylistes sans images */}
          <div>
            <h4 className="font-semibold mb-3 text-green-700">📷 Importation pour stylistes sans images</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">✅ Fonctionnalités</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Sélection automatique des stylistes sans images</li>
                  <li>• Upload par glisser-déposer ou sélection</li>
                  <li>• Support de multiples formats (JPG, PNG, GIF, WebP)</li>
                  <li>• Upload automatique vers ImgBB</li>
                  <li>• Sauvegarde dans la base de données Firebase</li>
                  <li>• Suivi en temps réel du progrès</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">📋 Étapes</h5>
                <ol className="space-y-1 text-sm text-gray-600">
                  <li>1. Sélectionnez un styliste dans la liste</li>
                  <li>2. Glissez-déposez ou sélectionnez vos images</li>
                  <li>3. Cliquez sur "Commencer l'upload"</li>
                  <li>4. Suivez le progrès en temps réel</li>
                  <li>5. Les images sont automatiquement ajoutées à la galerie</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Importation des images existantes */}
          <div>
            <h4 className="font-semibold mb-3 text-blue-700">🗂️ Importation des images existantes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">✅ Fonctionnalités</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Import automatique depuis /creators/</li>
                  <li>• 4 stylistes avec images existantes</li>
                  <li>• 98 images au total à importer</li>
                  <li>• URLs locales vers Firebase</li>
                  <li>• Mise à jour des galeries existantes</li>
                  <li>• Progression par styliste</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">📋 Étapes</h5>
                <ol className="space-y-1 text-sm text-gray-600">
                  <li>1. Vérifiez la liste des stylistes avec images</li>
                  <li>2. Cliquez sur "Importer toutes les images"</li>
                  <li>3. Suivez la progression globale et par styliste</li>
                  <li>4. Vérifiez les notifications de succès/erreur</li>
                  <li>5. Les images sont disponibles dans les galeries</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Résumé */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">📊 Résumé des stylistes</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Sans images:</span>
                <span className="ml-2 text-orange-600">3 stylistes</span>
              </div>
              <div>
                <span className="font-medium">Avec images:</span>
                <span className="ml-2 text-green-600">4 stylistes</span>
              </div>
              <div>
                <span className="font-medium">Images existantes:</span>
                <span className="ml-2 text-blue-600">98 images</span>
              </div>
              <div>
                <span className="font-medium">Total:</span>
                <span className="ml-2 text-gray-600">7 stylistes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportStylistImagesPage;
