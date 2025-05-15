
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadGalleryImage } from '@/services/gallery-service';
import { toast } from '@/components/ui/sonner';

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Veuillez sélectionner une image');
      return;
    }
    
    try {
      setUploading(true);
      await uploadGalleryImage(file, { 
        title: title || undefined,
        description: description || undefined
      });
      
      toast.success('Image ajoutée à la galerie');
      setFile(null);
      setTitle('');
      setDescription('');
      setPreview(null);
      
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors de l\'ajout de l\'image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image-upload">Image</Label>
        <Input 
          id="image-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>

      {preview && (
        <div className="mt-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-60 max-w-full object-contain rounded-md border border-gray-200"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Titre (optionnel)</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={uploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optionnelle)</Label>
        <Textarea 
          id="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
          rows={3}
        />
      </div>

      <Button type="submit" disabled={!file || uploading}>
        {uploading ? 'Envoi en cours...' : 'Ajouter à la galerie'}
      </Button>
    </form>
  );
};

export default ImageUploader;
