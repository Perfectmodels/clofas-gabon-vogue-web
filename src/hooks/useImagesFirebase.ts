import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { database } from '@/services/firebase';

export interface Image {
  id: string;
  name: string;
  url: string;
  displayUrl?: string;
  category: string;
  tags: string[];
  size: string;
  dimensions: string;
  uploadDate: string;
  author: string;
  alt: string;
  description?: string;
  deleteUrl?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useImagesFirebase = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const imagesRef = ref(database, 'images');
    
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const imagesList = Object.entries(data).map(([id, image]: [string, any]) => ({
            id,
            ...image
          })) as Image[];
          setImages(imagesList);
        } else {
          setImages([]);
        }
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createImage = async (imageData: Omit<Image, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('🔄 Création d\'une nouvelle image...', imageData.name);
      const newImageRef = push(ref(database, 'images'));
      const imageId = newImageRef.key!;
      
      const image: Image = {
        id: imageId,
        ...imageData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await set(newImageRef, image);
      console.log('✅ Image créée avec succès:', imageId);
      return image;
    } catch (err: any) {
      console.error('❌ Erreur lors de la création de l\'image:', err);
      throw new Error(`Erreur lors de la création: ${err.message}`);
    }
  };

  const updateImage = async (imageId: string, updates: Partial<Image>) => {
    try {
      const imageRef = ref(database, `images/${imageId}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await update(imageRef, updateData);
    } catch (err: any) {
      throw new Error(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const imageRef = ref(database, `images/${imageId}`);
      await remove(imageRef);
    } catch (err: any) {
      throw new Error(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  const toggleFeatured = async (imageId: string) => {
    try {
      const image = images.find(img => img.id === imageId);
      if (image) {
        await updateImage(imageId, { featured: !image.featured });
      }
    } catch (err: any) {
      throw new Error(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  return {
    images,
    loading,
    error,
    createImage,
    updateImage,
    deleteImage,
    toggleFeatured
  };
};
