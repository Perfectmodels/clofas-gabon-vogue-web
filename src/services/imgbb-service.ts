// Service pour l'upload d'images via ImgBB API
export interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
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
  success: boolean;
  status: number;
}

export interface UploadOptions {
  name?: string;
  expiration?: number; // en secondes, 0 = pas d'expiration
}

export interface UploadResult {
  success: boolean;
  url?: string;
  displayUrl?: string;
  deleteUrl?: string;
  filename?: string;
  size?: string;
  width?: string;
  height?: string;
  error?: string;
}

class ImgBBService {
  private apiKey: string;
  private baseUrl = 'https://api.imgbb.com/1/upload';

  constructor() {
    this.apiKey = import.meta.env.VITE_IMGBB_API_KEY || '';
    if (!this.apiKey || this.apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
      console.warn('VITE_IMGBB_API_KEY not configured. Image upload features will be disabled.');
    }
  }

  /**
   * Convertit un fichier en base64
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Retire le préfixe data:image/...;base64,
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Valide le type et la taille du fichier
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 32 * 1024 * 1024; // 32MB (limite ImgBB)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Type de fichier non supporté. Utilisez JPG, PNG, GIF ou WebP.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Fichier trop volumineux. Taille maximale : 32MB.'
      };
    }

    return { valid: true };
  }

  /**
   * Upload une image vers ImgBB
   */
  async uploadImage(
    file: File, 
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      // Validation du fichier
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error
        };
      }

      // Vérification de la clé API
      if (!this.apiKey || this.apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
        return {
          success: false,
          error: 'Clé API ImgBB non configurée. Veuillez configurer VITE_IMGBB_API_KEY dans votre fichier .env.local'
        };
      }

      // Conversion en base64
      const base64 = await this.fileToBase64(file);

      // Préparation des données
      const formData = new FormData();
      formData.append('key', this.apiKey);
      formData.append('image', base64);
      
      if (options.name) {
        formData.append('name', options.name);
      }
      
      if (options.expiration) {
        formData.append('expiration', options.expiration.toString());
      }

      // Upload vers ImgBB
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: formData
      });

      const data: ImgBBResponse = await response.json();

      if (data.success) {
        return {
          success: true,
          url: data.data.url,
          displayUrl: data.data.display_url,
          deleteUrl: data.data.delete_url,
          filename: data.data.image.filename,
          size: data.data.size,
          width: data.data.width,
          height: data.data.height
        };
      } else {
        return {
          success: false,
          error: 'Erreur lors de l\'upload vers ImgBB'
        };
      }
    } catch (error) {
      console.error('Erreur ImgBB upload:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(
    files: File[], 
    options: UploadOptions = {}
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, options));
    return Promise.all(uploadPromises);
  }

  /**
   * Supprime une image (nécessite l'URL de suppression)
   */
  async deleteImage(deleteUrl: string): Promise<boolean> {
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Erreur suppression image:', error);
      return false;
    }
  }

  /**
   * Génère une URL de prévisualisation
   */
  generatePreviewUrl(url: string, size: 'thumb' | 'medium' | 'full' = 'medium'): string {
    if (size === 'full') return url;
    
    // ImgBB génère automatiquement des URLs de différentes tailles
    // Format: https://i.ibb.co/xxxxx/image.jpg
    // Pour thumb: https://i.ibb.co/xxxxx/image-thumb.jpg
    // Pour medium: https://i.ibb.co/xxxxx/image-medium.jpg
    
    const baseUrl = url.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    const extension = url.match(/\.(jpg|jpeg|png|gif|webp)$/i)?.[0] || '.jpg';
    
    if (size === 'thumb') {
      return `${baseUrl}-thumb${extension}`;
    } else if (size === 'medium') {
      return `${baseUrl}-medium${extension}`;
    }
    
    return url;
  }
}

// Instance singleton
export const imgbbService = new ImgBBService();

// Hook React pour l'upload
export const useImgBBUpload = () => {
  const uploadImage = async (file: File, options?: UploadOptions) => {
    return imgbbService.uploadImage(file, options);
  };

  const uploadMultipleImages = async (files: File[], options?: UploadOptions) => {
    return imgbbService.uploadMultipleImages(files, options);
  };

  const deleteImage = async (deleteUrl: string) => {
    return imgbbService.deleteImage(deleteUrl);
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    generatePreviewUrl: imgbbService.generatePreviewUrl.bind(imgbbService)
  };
};
