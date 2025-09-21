import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { database } from '@/services/firebase';

export interface Creator {
  id: string;
  name: string;
  country: string;
  bio?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  images: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const creatorsRef = ref(database, 'creators');
    
    const unsubscribe = onValue(creatorsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const creatorsList = Object.entries(data).map(([id, creator]: [string, any]) => ({
            id,
            ...creator
          })) as Creator[];
          setCreators(creatorsList);
        } else {
          setCreators([]);
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

  const createCreator = async (creatorData: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('🔄 Création d\'un nouveau créateur...', creatorData);
      const newCreatorRef = push(ref(database, 'creators'));
      const creatorId = newCreatorRef.key!;
      
      const creator: Creator = {
        id: creatorId,
        ...creatorData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await set(newCreatorRef, creator);
      console.log('✅ Créateur créé avec succès:', creatorId);
      return creator;
    } catch (err: any) {
      console.error('❌ Erreur lors de la création du créateur:', err);
      throw new Error(`Erreur lors de la création: ${err.message}`);
    }
  };

  const updateCreator = async (creatorId: string, updates: Partial<Creator>) => {
    try {
      console.log('🔄 Mise à jour du créateur...', creatorId, updates);
      const creatorRef = ref(database, `creators/${creatorId}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await update(creatorRef, updateData);
      console.log('✅ Créateur mis à jour avec succès:', creatorId);
    } catch (err: any) {
      console.error('❌ Erreur lors de la mise à jour du créateur:', err);
      throw new Error(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const deleteCreator = async (creatorId: string) => {
    try {
      const creatorRef = ref(database, `creators/${creatorId}`);
      await remove(creatorRef);
    } catch (err: any) {
      throw new Error(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  const addCreatorImage = async (creatorId: string, imageUrl: string) => {
    try {
      const creatorRef = ref(database, `creators/${creatorId}`);
      const creator = creators.find(c => c.id === creatorId);
      
      if (creator) {
        const updatedImages = [...creator.images, imageUrl];
        await update(creatorRef, {
          images: updatedImages,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      throw new Error(`Erreur lors de l'ajout d'image: ${err.message}`);
    }
  };

  const removeCreatorImage = async (creatorId: string, imageUrl: string) => {
    try {
      const creatorRef = ref(database, `creators/${creatorId}`);
      const creator = creators.find(c => c.id === creatorId);
      
      if (creator) {
        const updatedImages = creator.images.filter(img => img !== imageUrl);
        await update(creatorRef, {
          images: updatedImages,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      throw new Error(`Erreur lors de la suppression d'image: ${err.message}`);
    }
  };

  const toggleFeatured = async (creatorId: string) => {
    try {
      const creator = creators.find(c => c.id === creatorId);
      if (creator) {
        await updateCreator(creatorId, { featured: !creator.featured });
      }
    } catch (err: any) {
      throw new Error(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  return {
    creators,
    loading,
    error,
    createCreator,
    updateCreator,
    deleteCreator,
    addCreatorImage,
    removeCreatorImage,
    toggleFeatured
  };
};
