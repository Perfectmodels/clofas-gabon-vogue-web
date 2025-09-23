import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { Upload, FolderOpen, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';
import { useCreatorGallery } from '@/hooks/useCreatorGallery';
import { useImgBBUpload } from '@/hooks/useImgBBUpload';

interface StylistWithoutImages {
  id: string;
  name: string;
  status: string;
  description: string;
}

interface UploadedFile {
  file: File;
  url?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

const stylistsWithoutImages: StylistWithoutImages[] = [
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

const ImportStylistImages: React.FC = () => {
  const [selectedStylist, setSelectedStylist] = useState<StylistWithoutImages | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const { uploadImage } = useImgBBUpload();
  const { addImage } = useCreatorGallery(selectedStylist?.id || '');
  
  // Sauvegarde automatique
  const { autoSave, isSaving, lastSaved, error } = useAutoSave({
    onSave: (data) => console.log('🔄 Sauvegarde des images de styliste:', data),
    onSuccess: () => console.log('✅ Images de styliste sauvegardées avec succès'),
    onError: (error) => {
      console.error('❌ Erreur de sauvegarde des images:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: `Les images n'ont pas pu être sauvegardées: ${error}`,
        variant: "destructive"
      });
    }
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Aucune image valide",
        description: "Veuillez sélectionner des fichiers image.",
        variant: "destructive"
      });
      return;
    }

    const uploadedFiles: UploadedFile[] = imageFiles.map(file => ({
      file,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...uploadedFiles]);
    
    toast({
      title: "Fichiers ajoutés",
      description: `${imageFiles.length} image(s) ajoutée(s) à la liste d'upload.`,
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (!selectedStylist || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    const totalFiles = files.length;
    let completedFiles = 0;
    const uploadedImages: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        // Mettre à jour le statut en cours
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'uploading' } : f
        ));

        // Upload vers ImgBB
        const result = await uploadImage(file.file);
        
        if (result.success && result.url) {
          const imageData = {
            name: file.file.name,
            url: result.url,
            displayUrl: result.displayUrl || result.url,
            category: 'collection',
            tags: [selectedStylist.name, 'CLOFAS 241', 'Mode Gabonaise'],
            size: file.file.size.toString(),
            dimensions: result.width && result.height ? `${result.width}x${result.height}` : '0x0',
            uploadDate: new Date().toISOString(),
            author: selectedStylist.name,
            alt: `${file.file.name} - ${selectedStylist.name}`,
            description: `Image de ${selectedStylist.name} - ${file.file.name}`,
            deleteUrl: result.deleteUrl,
            creatorId: selectedStylist.id,
            year: new Date().getFullYear()
          };

          // Ajouter l'image à la galerie du créateur avec sauvegarde automatique
          await autoSave(async () => {
            await addImage(imageData);
            console.log('✅ Image ajoutée à la galerie:', file.file.name);
          }, imageData);

          uploadedImages.push(imageData);

          // Mettre à jour le statut de succès
          setFiles(prev => prev.map((f, idx) => 
            idx === i ? { ...f, status: 'success', url: result.url } : f
          ));
        } else {
          throw new Error(result.error || 'Erreur d\'upload');
        }
      } catch (error: any) {
        console.error('Erreur upload:', error);
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'error', error: error.message } : f
        ));
      }

      completedFiles++;
      setUploadProgress((completedFiles / totalFiles) * 100);
    }

    setIsUploading(false);
    
    const successCount = files.filter(f => f.status === 'success').length;
    const errorCount = files.filter(f => f.status === 'error').length;
    
    if (successCount > 0) {
      toast({
        title: "Upload terminé",
        description: `${successCount} image(s) uploadée(s) et sauvegardée(s) avec succès pour ${selectedStylist.name}.`,
      });
      
      // Log pour vérification
      console.log('📸 Images uploadées et sauvegardées:', {
        stylist: selectedStylist.name,
        count: successCount,
        images: uploadedImages.map(img => ({
          name: img.name,
          url: img.url,
          creatorId: img.creatorId
        }))
      });
    }
    
    if (errorCount > 0) {
      toast({
        title: "Erreurs détectées",
        description: `${errorCount} image(s) n'ont pas pu être uploadées.`,
        variant: "destructive"
      });
    }
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadProgress(0);
    setSelectedStylist(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'uploading': return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 text-clofas-coral mr-2" />
              Importation d'Images - Stylistes sans Photos
            </CardTitle>
            <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
          </div>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Cette fonctionnalité permet d'importer des images uniquement pour les stylistes qui n'ont pas encore de photos dans leur galerie.
            </AlertDescription>
          </Alert>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Stylistes sans images :</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stylistsWithoutImages.map((stylist) => (
                <Card 
                  key={stylist.id} 
                  className={`cursor-pointer transition-all ${
                    selectedStylist?.id === stylist.id 
                      ? 'ring-2 ring-clofas-coral bg-clofas-coral/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStylist(stylist)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{stylist.name}</h4>
                      {selectedStylist?.id === stylist.id && (
                        <CheckCircle className="h-5 w-5 text-clofas-coral" />
                      )}
                    </div>
                    <Badge variant="secondary" className="mb-2">
                      {stylist.status}
                    </Badge>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {stylist.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {selectedStylist && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Upload d'images pour : {selectedStylist.name}
              </h3>
              
              {/* Zone de drop */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                  dragActive 
                    ? 'border-clofas-coral bg-clofas-coral/10' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {dragActive ? 'Déposez vos images ici' : 'Glissez-déposez vos images ou cliquez pour sélectionner'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Fichiers illimités • Max 32MB par image • Formats: JPG, PNG, GIF, WebP
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mt-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Sélectionner des images
                  </Button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FolderOpen className="h-5 w-5 text-clofas-coral mr-2" />
                Fichiers sélectionnés ({files.length})
              </span>
              <div className="flex gap-2">
                <Button 
                  onClick={uploadFiles} 
                  disabled={isUploading || selectedStylist === null}
                  className="bg-clofas-coral hover:bg-clofas-coral/90"
                >
                  {isUploading ? 'Upload en cours...' : 'Commencer l\'upload'}
                </Button>
                <Button onClick={resetUpload} variant="outline">
                  Réinitialiser
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isUploading && (
              <div className="mb-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-600 mt-2">
                  Progression : {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="font-medium">{file.file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      {file.error && (
                        <p className="text-sm text-red-600">{file.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(file.status)}>
                      {file.status === 'pending' && 'En attente'}
                      {file.status === 'uploading' && 'Upload...'}
                      {file.status === 'success' && 'Succès'}
                      {file.status === 'error' && 'Erreur'}
                    </Badge>
                    {file.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportStylistImages;
