
import { supabase } from '@/integrations/supabase/client';

export const uploadGalleryImage = async (
  file: File,
  metadata: { title?: string; description?: string; eventId?: string }
) => {
  try {
    // Generate a unique file path using the current timestamp
    const filePath = `gallery/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Upload the file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('clofas_images')
      .upload(filePath, file);
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get the public URL for the uploaded file
    const { data: publicURL } = supabase.storage
      .from('clofas_images')
      .getPublicUrl(filePath);
    
    // Insert record into gallery_images table
    const { data: imageRecord, error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        title: metadata.title || null,
        description: metadata.description || null,
        event_id: metadata.eventId || null,
        image_url: publicURL.publicUrl,
      })
      .select()
      .single();
    
    if (dbError) {
      throw dbError;
    }
    
    return imageRecord;
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    throw error;
  }
};
