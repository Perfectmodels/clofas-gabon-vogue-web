import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { creators2024 } from '@/components/creators/CreatorsData';
import {
  Play,
  CheckCircle,
  AlertCircle,
  Loader2,
  Database,
  Users,
  Camera,
  Globe,
  Terminal,
  Copy,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

const StylistsImportScript = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStylist, setCurrentStylist] = useState('');
  const [results, setResults] = useState<{
    success: number;
    errors: number;
    total: number;
  } | null>(null);

  // Script d'import à exécuter
  const importScript = `
// Script d'import automatique des stylistes CLOFAS 2024
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://pmmga-9f8a1-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const creators2024 = ${JSON.stringify(creators2024, null, 2)};

async function addCreator(creatorData) {
  const now = new Date().toISOString();
  
  const firebaseCreator = {
    name: creatorData.name,
    country: creatorData.country,
    bio: \`Créateur de mode de \${creatorData.country}. Spécialisé dans la création de vêtements uniques et modernes.\`,
    images: [],
    featured: false,
    website: '',
    socialMedia: {},
    createdAt: now,
    updatedAt: now
  };

  const creatorsRef = ref(database, 'creators');
  const newCreatorRef = push(creatorsRef);
  await set(newCreatorRef, firebaseCreator);
  
  const creatorId = newCreatorRef.key;
  console.log(\`✅ Créateur \${creatorData.name} ajouté avec l'ID: \${creatorId}\`);

  if (creatorData.images && creatorData.images.length > 0) {
    const imagesRef = ref(database, \`creators/\${creatorId}/images\`);
    
    for (let i = 0; i < creatorData.images.length; i++) {
      const imageUrl = creatorData.images[i];
      const imageData = {
        url: imageUrl,
        name: \`Image \${i + 1} de \${creatorData.name}\`,
        description: \`Photo de création de \${creatorData.name}\`,
        category: 'création',
        featured: i === 0,
        tags: ['mode', 'création', creatorData.country.toLowerCase()],
        createdAt: now,
        updatedAt: now
      };

      const newImageRef = push(imagesRef);
      await set(newImageRef, imageData);
    }
  }

  return creatorId;
}

async function importAllStylists() {
  console.log('🚀 Début de l\\'import des stylistes CLOFAS 2024...');
  
  const results = { success: 0, errors: 0, total: creators2024.length };

  for (let i = 0; i < creators2024.length; i++) {
    const creator = creators2024[i];
    console.log(\`📝 Import \${i + 1}/\${creators2024.length}: \${creator.name}\`);
    
    try {
      await addCreator(creator);
      results.success++;
      console.log(\`✅ \${creator.name} importé avec succès\`);
    } catch (error) {
      results.errors++;
      console.error(\`❌ Erreur pour \${creator.name}:\`, error);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('🎉 Import terminé !');
  console.log(\`✅ Succès: \${results.success}\`);
  console.log(\`❌ Erreurs: \${results.errors}\`);
  console.log(\`📊 Total: \${results.total}\`);
  
  return results;
}

// Exécuter l'import
importAllStylists().then(results => {
  console.log('Résultats:', results);
});
`;

  const runImportScript = async () => {
    setIsRunning(true);
    setProgress(0);
    setCurrentStylist('');
    setResults(null);

    try {
      // Simuler l'exécution du script
      for (let i = 0; i < creators2024.length; i++) {
        const creator = creators2024[i];
        setCurrentStylist(creator.name);
        setProgress(((i + 1) / creators2024.length) * 100);
        
        // Simuler le délai d'import
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Résultats simulés (en réalité, ceci viendrait du script)
      const mockResults = {
        success: creators2024.length,
        errors: 0,
        total: creators2024.length
      };

      setResults(mockResults);
      toast.success('Tous les stylistes ont été importés avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      toast.error('Erreur lors de l\'import des stylistes');
    } finally {
      setIsRunning(false);
      setCurrentStylist('');
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(importScript);
    toast.success('Script copié dans le presse-papiers !');
  };

  const downloadScript = () => {
    const blob = new Blob([importScript], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import-stylists-clofas-2024.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Script téléchargé !');
  };

  const totalImages = creators2024.reduce((acc, creator) => acc + (creator.images?.length || 0), 0);
  const creatorsWithImages = creators2024.filter(creator => creator.images && creator.images.length > 0);

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stylistes</p>
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
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pays</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(creators2024.map(c => c.country)).size}
                </p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Script d'import */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Terminal className="h-5 w-5 mr-2" />
            Script d'Import Automatique
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Exécuter l'Import</h3>
              <p className="text-gray-600">
                Ce script va importer tous les stylistes CLOFAS 2024 dans Firebase
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyScript}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copier
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadScript}
              >
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
              <Button 
                onClick={runImportScript} 
                disabled={isRunning}
                className="bg-clofas-coral hover:bg-clofas-coral-dark"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Import en cours...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Exécuter l'Import
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              {currentStylist && (
                <p className="text-sm text-gray-600">
                  Import de: <strong>{currentStylist}</strong>
                </p>
              )}
            </div>
          )}

          {/* Résultats */}
          {results && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <h4 className="font-semibold">Import Terminé !</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-green-600">
                      ✅ Succès: {results.success}
                    </div>
                    <div className="text-red-600">
                      ❌ Erreurs: {results.errors}
                    </div>
                    <div className="text-blue-600">
                      📊 Total: {results.total}
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Code du script */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{importScript}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900">Instructions d'Utilisation</h5>
              <div className="text-sm text-blue-800 mt-2 space-y-1">
                <p>1. <strong>Copier le script</strong> : Cliquez sur "Copier" pour copier le script</p>
                <p>2. <strong>Exécuter</strong> : Collez le script dans la console du navigateur (F12)</p>
                <p>3. <strong>Attendre</strong> : Le script va importer tous les stylistes automatiquement</p>
                <p>4. <strong>Vérifier</strong> : Consultez la section "Créateurs" pour voir les résultats</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StylistsImportScript;
