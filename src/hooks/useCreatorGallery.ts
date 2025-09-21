import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { database } from '@/services/firebase';

export interface CreatorImage {
  id: string;
  creatorId: string;
  url: string;
  displayUrl: string;
  name: string;
  description?: string;
  category?: string;
  tags: string[];
  featured: boolean;
  uploadDate: string;
  size: string;
  dimensions: string;
  createdAt: string;
  updatedAt: string;
}

export const useCreatorGallery = (creatorId: string) => {
  const [images, setImages] = useState<CreatorImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!creatorId) {
      setImages([]);
      setLoading(false);
      return;
    }

    console.log('🔄 Chargement de la galerie pour le créateur:', creatorId);
    const imagesRef = ref(database, `creatorImages/${creatorId}`);
    
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const imagesList = Object.entries(data).map(([id, imageData]: [string, any]) => ({
            id,
            creatorId,
            ...imageData
          }));
          setImages(imagesList);
          console.log('✅ Images chargées pour le créateur:', creatorId, imagesList.length);
        } else {
          setImages([]);
          console.log('ℹ️ Aucune image trouvée pour le créateur:', creatorId);
        }
        setLoading(false);
      } catch (err: any) {
        console.error('❌ Erreur lors du chargement des images:', err);
        setError(err.message);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [creatorId]);

  const addImage = async (imageData: Omit<CreatorImage, 'id' | 'creatorId' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('🔄 Ajout d\'une image au créateur:', creatorId);
      const newImageRef = push(ref(database, `creatorImages/${creatorId}`));
      const imageId = newImageRef.key!;
      
      const image: CreatorImage = {
        id: imageId,
        creatorId,
        ...imageData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await set(newImageRef, image);
      console.log('✅ Image ajoutée avec succès:', imageId);
      return image;
    } catch (err: any) {
      console.error('❌ Erreur lors de l\'ajout de l\'image:', err);
      throw new Error(`Erreur lors de l'ajout: ${err.message}`);
    }
  };

  const updateImage = async (imageId: string, updates: Partial<CreatorImage>) => {
    try {
      console.log('🔄 Mise à jour de l\'image:', imageId);
      const imageRef = ref(database, `creatorImages/${creatorId}/${imageId}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await update(imageRef, updateData);
      console.log('✅ Image mise à jour avec succès:', imageId);
    } catch (err: any) {
      console.error('❌ Erreur lors de la mise à jour de l\'image:', err);
      throw new Error(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      console.log('🔄 Suppression de l\'image:', imageId);
      const imageRef = ref(database, `creatorImages/${creatorId}/${imageId}`);
      await remove(imageRef);
      console.log('✅ Image supprimée avec succès:', imageId);
    } catch (err: any) {
      console.error('❌ Erreur lors de la suppression de l\'image:', err);
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
      console.error('❌ Erreur lors du toggle featured:', err);
      throw new Error(`Erreur lors du toggle: ${err.message}`);
    }
  };

  const getFeaturedImages = () => {
    return images.filter(img => img.featured);
  };

  const getImagesByCategory = (category: string) => {
    return images.filter(img => img.category === category);
  };

  const getImagesByTag = (tag: string) => {
    return images.filter(img => img.tags.includes(tag));
  };

  return {
    images,
    loading,
    error,
    addImage,
    updateImage,
    deleteImage,
    toggleFeatured,
    getFeaturedImages,
    getImagesByCategory,
    getImagesByTag
  };
};

// Hook pour gérer toutes les galeries de créateurs
export const useAllCreatorGalleries = () => {
  const [allImages, setAllImages] = useState<CreatorImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 Chargement de toutes les galeries de créateurs');
    const allImagesRef = ref(database, 'creatorImages');
    
    const unsubscribe = onValue(allImagesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const allImagesList: CreatorImage[] = [];
          Object.entries(data).forEach(([creatorId, creatorImages]: [string, any]) => {
            if (creatorImages) {
              Object.entries(creatorImages).forEach(([imageId, imageData]: [string, any]) => {
                allImagesList.push({
                  id: imageId,
                  creatorId,
                  ...imageData
                });
              });
            }
          });
          setAllImages(allImagesList);
          console.log('✅ Toutes les images chargées:', allImagesList.length);
        } else {
          setAllImages([]);
          console.log('ℹ️ Aucune image trouvée');
        }
        setLoading(false);
      } catch (err: any) {
        console.error('❌ Erreur lors du chargement de toutes les images:', err);
        setError(err.message);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getImagesByCreator = (creatorId: string) => {
    return allImages.filter(img => img.creatorId === creatorId);
  };

  const getFeaturedImages = () => {
    return allImages.filter(img => img.featured);
  };

  const getImagesByCategory = (category: string) => {
    return allImages.filter(img => img.category === category);
  };

  return {
    allImages,
    loading,
    error,
    getImagesByCreator,
    getFeaturedImages,
    getImagesByCategory
  };
};
