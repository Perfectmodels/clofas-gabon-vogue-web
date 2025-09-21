import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FolderOpen, 
  Image as ImageIcon, 
  Check, 
  X, 
  AlertCircle,
  Loader2,
  Trash2,
  Eye
} from 'lucide-react';
import { useImgBBUpload, UploadResult } from '@/services/imgbb-service';
import { toast } from '@/components/ui/use-toast';

interface BulkImageUploadProps {
  creatorId: string;
  creatorName: string;
  onUploadComplete?: (results: UploadResult[]) => void;
  onUploadError?: (error: string) => void;
}

interface UploadedFile {
  file: File;
  result?: UploadResult;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

const BulkImageUpload = ({ 
  creatorId, 
  creatorName, 
  onUploadComplete, 
  onUploadError 
}: BulkImageUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useImgBBUpload();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

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
      variant: "success"
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
    if (files.length === 0) {
      toast({
        title: "Aucun fichier",
        description: "Veuillez sélectionner des images à uploader.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const results: UploadResult[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Mettre à jour le statut
      setFiles(prev => prev.map((f, index) => 
        index === i ? { ...f, status: 'uploading' } : f
      ));

      try {
        const result = await uploadImage(file.file);
        results.push(result);
        
        if (result.success) {
          successCount++;
          setFiles(prev => prev.map((f, index) => 
            index === i ? { ...f, result, status: 'success' } : f
          ));
        } else {
          errorCount++;
          setFiles(prev => prev.map((f, index) => 
            index === i ? { 
              ...f, 
              status: 'error', 
              error: result.error || 'Erreur inconnue' 
            } : f
          ));
        }
      } catch (error: any) {
        errorCount++;
        setFiles(prev => prev.map((f, index) => 
          index === i ? { 
            ...f, 
            status: 'error', 
            error: error.message || 'Erreur inconnue' 
          } : f
        ));
      }

      // Mettre à jour la progression
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setIsUploading(false);

    // Notifier les résultats
    if (successCount > 0) {
      onUploadComplete?.(results.filter(r => r.success));
      toast({
        title: "Upload terminé",
        description: `${successCount} image(s) uploadée(s) avec succès.`,
        variant: "success"
      });
    }

    if (errorCount > 0) {
      onUploadError?.(`${errorCount} image(s) ont échoué.`);
      toast({
        title: "Erreurs d'upload",
        description: `${errorCount} image(s) ont échoué.`,
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setFiles([]);
    setUploadProgress(0);
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'pending': return <ImageIcon className="h-4 w-4 text-gray-400" />;
      case 'uploading': return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'success': return <Check className="h-4 w-4 text-green-500" />;
      case 'error': return <X className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderOpen className="h-5 w-5 text-clofas-coral mr-2" />
            Upload en Masse - {creatorName}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 text-clofas-coral mr-2" />
                Fichiers sélectionnés ({files.length})
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  onClick={uploadFiles}
                  disabled={isUploading}
                  className="bg-clofas-coral hover:bg-clofas-coral/90"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Uploader tout
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  disabled={isUploading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vider
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Barre de progression */}
            {isUploading && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progression</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {/* Liste des fichiers */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="font-medium text-sm">{file.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(file.status)}>
                      {file.status === 'pending' && 'En attente'}
                      {file.status === 'uploading' && 'Upload...'}
                      {file.status === 'success' && 'Succès'}
                      {file.status === 'error' && 'Erreur'}
                    </Badge>
                    
                    {file.status === 'success' && file.result?.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.result!.url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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

export default BulkImageUpload;
