import { useState } from 'react';

interface ImgBBResponse {
  success: boolean;
  data?: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  error?: {
    message: string;
    code: number;
  };
}

interface UploadResult {
  success: boolean;
  url?: string;
  displayUrl?: string;
  filename?: string;
  size?: number;
  width?: number;
  height?: number;
  deleteUrl?: string;
  error?: string;
}

export const useImgBBUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Clé API ImgBB (vous devrez la configurer dans vos variables d'environnement)
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || 'demo_key';

  const uploadImage = async (file: File): Promise<UploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Vérifier la taille du fichier (ImgBB limite à 32MB)
      if (file.size > 32 * 1024 * 1024) {
        throw new Error('Le fichier est trop volumineux. Taille maximum: 32MB');
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image');
      }

      // Créer le FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', IMGBB_API_KEY);

      // Simuler le progrès d'upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Upload vers ImgBB
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result: ImgBBResponse = await response.json();

      if (result.success && result.data) {
        const uploadResult: UploadResult = {
          success: true,
          url: result.data.url,
          displayUrl: result.data.display_url,
          filename: result.data.image.filename,
          size: result.data.size,
          width: result.data.width,
          height: result.data.height,
          deleteUrl: result.data.delete_url,
        };

        setIsUploading(false);
        setUploadProgress(0);
        return uploadResult;
      } else {
        throw new Error(result.error?.message || 'Erreur lors de l\'upload');
      }
    } catch (error: any) {
      setIsUploading(false);
      setUploadProgress(0);
      
      // En cas d'erreur, retourner une URL locale pour les tests
      if (IMGBB_API_KEY === 'demo_key') {
        console.warn('Mode démo: utilisation d\'une URL locale');
        return {
          success: true,
          url: URL.createObjectURL(file),
          displayUrl: URL.createObjectURL(file),
          filename: file.name,
          size: file.size,
          width: 0,
          height: 0,
          deleteUrl: '',
        };
      }

      return {
        success: false,
        error: error.message || 'Erreur lors de l\'upload vers ImgBB',
      };
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const result = await uploadImage(files[i]);
        results.push(result);
      } catch (error: any) {
        results.push({
          success: false,
          error: error.message,
        });
      }
    }
    
    return results;
  };

  const deleteImage = async (deleteUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    isUploading,
    uploadProgress,
  };
};

export default useImgBBUpload;
