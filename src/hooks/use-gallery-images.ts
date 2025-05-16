
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { MOCK_GALLERY_IMAGES, MANNEQUIN_IMAGES } from '@/data/gallery-mock';

export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  event_id?: string | null;
  created_at: string;
  updated_at?: string;
  category?: string;
};

export const useGalleryImages = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [mannequinImages, setMannequinImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Split images by category if available in the database
          // Adding explicit type casting to ensure TypeScript recognizes the category property
          const typedData = data as GalleryImage[];
          const eventImages = typedData.filter(img => img.category !== 'mannequins');
          const castingImages = typedData.filter(img => img.category === 'mannequins');
          
          setImages(eventImages);
          setMannequinImages(castingImages);
        } else {
          // If no images in database, use mock data
          setImages(MOCK_GALLERY_IMAGES as GalleryImage[]);
          setMannequinImages(MANNEQUIN_IMAGES as GalleryImage[]);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        toast.error('Erreur lors du chargement des images');
        // Fallback to mock data on error
        setImages(MOCK_GALLERY_IMAGES as GalleryImage[]);
        setMannequinImages(MANNEQUIN_IMAGES as GalleryImage[]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return { images, mannequinImages, loading };
};
