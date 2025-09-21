import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Image as ImageIcon,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

interface AdvancedImageUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // en MB
  className?: string;
}

const AdvancedImageUpload: React.FC<AdvancedImageUploadProps> = ({
  onUploadComplete,
  maxFiles = 50,
  maxSize = 32,
  className = ''
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Vérifier si ImgBB est configuré
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const isImgbbConfigured = !!imgbbApiKey;

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    newFiles.forEach(file => {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Type de fichier non supporté`);
        return;
      }

      // Vérifier la taille
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name}: Fichier trop volumineux (max ${maxSize}MB)`);
        return;
      }

      // Vérifier le nombre de fichiers
      if (files.length + validFiles.length >= maxFiles) {
        errors.push(`Nombre maximum de fichiers atteint (${maxFiles})`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }

    if (validFiles.length > 0) {
      const newUploadFiles: UploadFile[] = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'pending'
      }));

      setFiles(prev => [...prev, ...newUploadFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const uploadToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error?.message || 'Erreur lors de l\'upload');
    }

    return data.data.url;
  };

  const uploadFile = async (uploadFile: UploadFile): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simuler la progression
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { ...f, progress, status: 'uploading' as const }
            : f
        ));

        if (progress >= 90) {
          clearInterval(interval);
        }
      }, 200);

      // Upload réel
      uploadToImgbb(uploadFile.file)
        .then(url => {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id 
              ? { ...f, progress: 100, status: 'completed' as const, url }
              : f
          ));
          resolve();
        })
        .catch(error => {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id 
              ? { ...f, status: 'error' as const, error: error.message }
              : f
          ));
          reject(error);
        });
    });
  };

  const uploadAllFiles = async () => {
    if (!isImgbbConfigured) {
      toast.error('Clé API ImgBB non configurée');
      return;
    }

    if (files.length === 0) {
      toast.error('Aucun fichier à télécharger');
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload simultané de tous les fichiers
      const uploadPromises = files
        .filter(f => f.status === 'pending')
        .map(file => uploadFile(file));

      await Promise.allSettled(uploadPromises);

      const completedFiles = files.filter(f => f.status === 'completed');
      const errorFiles = files.filter(f => f.status === 'error');

      if (completedFiles.length > 0) {
        const urls = completedFiles.map(f => f.url!).filter(Boolean);
        onUploadComplete?.(urls);
        toast.success(`${completedFiles.length} image(s) téléchargée(s) avec succès`);
      }

      if (errorFiles.length > 0) {
        toast.error(`${errorFiles.length} image(s) n'ont pas pu être téléchargées`);
      }

    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'uploading':
        return <Download className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <ImageIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'uploading':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'error':
        return 'Erreur';
      case 'uploading':
        return 'Téléchargement...';
      default:
        return 'En attente';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone de drop */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-clofas-coral bg-clofas-coral/5' 
            : 'border-gray-300 hover:border-clofas-coral'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Glissez-déposez vos images ici
        </p>
        <p className="text-sm text-gray-500 mb-4">
          ou cliquez pour sélectionner des fichiers
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-clofas-coral text-white rounded-lg hover:bg-clofas-coral-dark transition-colors cursor-pointer"
        >
          <Upload className="h-4 w-4 mr-2" />
          Sélectionner des images
        </label>
        <p className="text-xs text-gray-400 mt-2">
          Maximum {maxFiles} fichiers, {maxSize}MB par fichier
        </p>
      </div>

      {/* Configuration ImgBB */}
      {!isImgbbConfigured && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              Clé API ImgBB non configurée. Les fonctionnalités d'upload sont désactivées.
            </p>
          </div>
        </div>
      )}

      {/* Grille des fichiers */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Fichiers sélectionnés ({files.length})
            </h3>
            <div className="flex space-x-2">
              <Button
                onClick={uploadAllFiles}
                disabled={isUploading || !isImgbbConfigured}
                className="bg-clofas-coral hover:bg-clofas-coral-dark"
              >
                {isUploading ? 'Téléchargement...' : 'Télécharger tout'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  files.forEach(f => URL.revokeObjectURL(f.preview));
                  setFiles([]);
                }}
              >
                Effacer tout
              </Button>
            </div>
          </div>

          {/* Grille des aperçus */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {files.map((file) => (
              <Card key={file.id} className="relative overflow-hidden">
                <CardContent className="p-2">
                  {/* Aperçu de l'image */}
                  <div className="relative aspect-square mb-2">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover rounded"
                    />
                    
                    {/* Overlay de statut */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => window.open(file.preview, '_blank')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Icône de statut */}
                    <div className="absolute top-2 right-2">
                      {getStatusIcon(file.status)}
                    </div>
                  </div>

                  {/* Informations du fichier */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${getStatusColor(file.status)}`}>
                        {getStatusText(file.status)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </div>

                    {/* Barre de progression */}
                    {file.status === 'uploading' && (
                      <div className="space-y-1">
                        <Progress value={file.progress} className="h-1" />
                        <p className="text-xs text-center text-gray-600">
                          {Math.round(file.progress)}%
                        </p>
                      </div>
                    )}

                    {/* Message d'erreur */}
                    {file.status === 'error' && file.error && (
                      <p className="text-xs text-red-600 truncate">
                        {file.error}
                      </p>
                    )}

                    {/* URL de l'image uploadée */}
                    {file.status === 'completed' && file.url && (
                      <div className="space-y-1">
                        <p className="text-xs text-green-600 font-medium">
                          ✓ Uploadé
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={() => {
                            navigator.clipboard.writeText(file.url!);
                            toast.success('URL copiée');
                          }}
                        >
                          Copier URL
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedImageUpload;
