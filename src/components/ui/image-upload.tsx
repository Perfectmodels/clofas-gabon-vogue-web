import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Check, 
  AlertCircle,
  Trash2,
  Eye,
  Download
} from 'lucide-react';
import { useImgBBUpload, UploadResult } from '@/services/imgbb-service';
import { toast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  onUploadComplete?: (results: UploadResult[]) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // en MB
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;
  unlimited?: boolean; // Nouvelle option pour upload illimité
}

interface UploadedImage {
  file: File;
  result: UploadResult;
  preview?: string;
}

const ImageUpload = ({
  onUploadComplete,
  onUploadError,
  multiple = false,
  maxFiles = 100, // Augmenté à 100 fichiers maximum
  maxSize = 32, // 32MB par défaut
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  className = '',
  disabled = false,
  showPreview = true,
  showProgress = true,
  unlimited = false // Nouvelle option pour upload illimité
}: ImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploadMultipleImages } = useImgBBUpload();

  // Validation des fichiers
  const validateFiles = (files: FileList): { valid: File[]; errors: string[] } => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file, index) => {
      // Vérifier le type
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: Type de fichier non supporté`);
        return;
      }

      // Vérifier la taille
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name}: Fichier trop volumineux (max ${maxSize}MB)`);
        return;
      }

      // Vérifier le nombre de fichiers (sauf si unlimited)
      if (!unlimited && validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} fichiers autorisés`);
        return;
      }

      validFiles.push(file);
    });

    return { valid: validFiles, errors };
  };

  // Gestion du drag & drop
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

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [disabled]);

  // Gestion des fichiers sélectionnés
  const handleFiles = async (files: FileList) => {
    const { valid, errors } = validateFiles(files);

    if (errors.length > 0) {
      errors.forEach(error => {
        toast({
          title: "Erreur de validation",
          description: error,
          variant: "destructive"
        });
      });
    }

    if (valid.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let results: UploadResult[];

      if (multiple) {
        results = await uploadMultipleImages(valid);
      } else {
        const result = await uploadImage(valid[0]);
        results = [result];
      }

      // Traitement des résultats
      const successfulUploads: UploadedImage[] = [];
      const failedUploads: string[] = [];

      results.forEach((result, index) => {
        if (result.success && result.url) {
          const uploadedImage: UploadedImage = {
            file: valid[index],
            result,
            preview: result.displayUrl || result.url
          };
          successfulUploads.push(uploadedImage);
        } else {
          failedUploads.push(result.error || 'Erreur inconnue');
        }
      });

      // Mise à jour de l'état
      setUploadedImages(prev => [...prev, ...successfulUploads]);

      // Callbacks
      if (successfulUploads.length > 0) {
        onUploadComplete?.(results.filter(r => r.success));
        toast({
          title: "Upload réussi",
          description: `${successfulUploads.length} image(s) uploadée(s) avec succès`
        });
      }

      if (failedUploads.length > 0) {
        onUploadError?.(failedUploads.join(', '));
        toast({
          title: "Erreur d'upload",
          description: `${failedUploads.length} image(s) n'a(ont) pas pu être uploadée(s)`,
          variant: "destructive"
        });
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      onUploadError?.(errorMessage);
      toast({
        title: "Erreur d'upload",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Gestion du clic sur le bouton
  const handleButtonClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  // Gestion du changement de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // Suppression d'une image
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Formatage de la taille
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone d'upload */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-clofas-coral bg-clofas-coral/5' 
            : 'border-gray-300 hover:border-clofas-coral/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <CardContent className="p-8 text-center">
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clofas-coral mx-auto"></div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Upload en cours...</p>
                {showProgress && (
                  <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {dragActive ? 'Déposez vos images ici' : 'Cliquez ou glissez-déposez vos images'}
                </p>
                <p className="text-sm text-gray-500">
                  {unlimited ? 'Fichiers illimités' : (multiple ? `Jusqu'à ${maxFiles} fichiers` : '1 fichier')} • Max {maxSize}MB
                </p>
                <p className="text-xs text-gray-400">
                  {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Input caché */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Prévisualisation des images uploadées */}
      {showPreview && uploadedImages.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            Images uploadées ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((uploadedImage, index) => (
              <Card key={index} className="relative group">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Image preview */}
                    <div className="relative">
                      <img
                        src={uploadedImage.preview}
                        alt={uploadedImage.file.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(uploadedImage.result.url, '_blank')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Informations */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium truncate" title={uploadedImage.file.name}>
                        {uploadedImage.file.name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatFileSize(uploadedImage.file.size)}</span>
                        {uploadedImage.result.width && uploadedImage.result.height && (
                          <span>{uploadedImage.result.width}×{uploadedImage.result.height}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Uploadé
                        </Badge>
                        {uploadedImage.result.deleteUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs"
                            onClick={() => {
                              // TODO: Implémenter la suppression
                              console.log('Delete URL:', uploadedImage.result.deleteUrl);
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Supprimer
                          </Button>
                        )}
                      </div>
                    </div>
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

export default ImageUpload;
