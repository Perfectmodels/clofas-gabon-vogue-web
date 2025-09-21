import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ui/image-upload';
import BulkImageUpload from './BulkImageUpload';
import { UploadResult } from '@/services/imgbb-service';
import { useCreatorImages } from '@/hooks/useFirebase';
import { 
  Upload, 
  CloudUpload,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
  Save,
  X,
  Plus,
  FolderOpen
} from 'lucide-react';

interface CreatorUploadProps {
  creatorId: string;
  creatorName: string;
  onUploadComplete?: (results: UploadResult[]) => void;
}

const CreatorUpload = ({ creatorId, creatorName, onUploadComplete }: CreatorUploadProps) => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  const [uploadedImages, setUploadedImages] = useState<UploadResult[]>([]);
  const [imageMetadata, setImageMetadata] = useState({
    title: '',
    description: '',
    category: 'défilé',
    tags: '',
    year: new Date().getFullYear().toString()
  });
  const [isSaving, setIsSaving] = useState(false);

  const { createCreatorImage } = useCreatorImages(creatorId);

  const categories = [
    { value: 'défilé', label: 'Défilé', color: 'bg-pink-100 text-pink-800' },
    { value: 'backstage', label: 'Backstage', color: 'bg-purple-100 text-purple-800' },
    { value: 'portrait', label: 'Portrait', color: 'bg-blue-100 text-blue-800' },
    { value: 'collection', label: 'Collection', color: 'bg-green-100 text-green-800' },
    { value: 'atelier', label: 'Atelier', color: 'bg-orange-100 text-orange-800' }
  ];

  const handleUploadComplete = (results: UploadResult[]) => {
    const successfulUploads = results.filter(r => r.success);
    setUploadedImages(prev => [...prev, ...successfulUploads]);
    onUploadComplete?.(successfulUploads);
  };

  const handleUploadError = (error: string) => {
    console.error('Erreur d\'upload:', error);
  };

  const handleSaveImages = async () => {
    if (uploadedImages.length === 0) return;

    setIsSaving(true);
    try {
      for (const result of uploadedImages) {
        if (result.success && result.url) {
          const imageData = {
            name: imageMetadata.title || result.filename || `Image de ${creatorName}`,
            url: result.url,
            displayUrl: result.displayUrl || result.url,
            category: imageMetadata.category,
            tags: imageMetadata.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            size: result.size || '0',
            dimensions: result.width && result.height ? `${result.width}x${result.height}` : '0x0',
            uploadDate: new Date().toLocaleDateString(),
            author: creatorName,
            alt: imageMetadata.title || result.filename || `Image de ${creatorName}`,
            description: imageMetadata.description || `Image uploadée pour ${creatorName}`,
            deleteUrl: result.deleteUrl,
            creatorId: creatorId,
            year: parseInt(imageMetadata.year)
          };
          
          await createCreatorImage(imageData);
        }
      }
      
      // Reset form
      setUploadedImages([]);
      setImageMetadata({
        title: '',
        description: '',
        category: 'défilé',
        tags: '',
        year: new Date().getFullYear().toString()
      });
      setShowUploadDialog(false);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getCategoryBadge = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Button
        onClick={() => setShowUploadDialog(true)}
        className="w-full"
        variant="outline"
      >
        <CloudUpload className="h-4 w-4 mr-2" />
        Uploader des images pour {creatorName}
      </Button>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FolderOpen className="h-5 w-5 mr-2" />
              Uploader des images pour {creatorName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Zone d'upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sélection des images</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                  multiple={true}
                  maxFiles={100}
                  maxSize={32}
                  showPreview={true}
                  showProgress={true}
                  unlimited={true}
                  className="border border-gray-300 rounded-lg p-4"
                />
              </CardContent>
            </Card>

            {/* Métadonnées des images */}
            {uploadedImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations des images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre des images
                      </label>
                      <Input
                        value={imageMetadata.title}
                        onChange={(e) => setImageMetadata(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Collection Printemps 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catégorie
                      </label>
                      <Select
                        value={imageMetadata.category}
                        onValueChange={(value) => setImageMetadata(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={imageMetadata.description}
                      onChange={(e) => setImageMetadata(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Décrivez les images..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (séparés par des virgules)
                      </label>
                      <Input
                        value={imageMetadata.tags}
                        onChange={(e) => setImageMetadata(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="Ex: mode, défilé, printemps, 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Année
                      </label>
                      <Input
                        type="number"
                        value={imageMetadata.year}
                        onChange={(e) => setImageMetadata(prev => ({ ...prev, year: e.target.value }))}
                        min="2020"
                        max="2030"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prévisualisation des images uploadées */}
            {uploadedImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Images uploadées ({uploadedImages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((result, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={result.displayUrl || result.url}
                          alt={result.filename || `Image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs font-medium truncate">
                            {result.filename || `Image ${index + 1}`}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Badge className={getCategoryBadge(imageMetadata.category)}>
                              {imageMetadata.category}
                            </Badge>
                            {result.width && result.height && (
                              <span className="text-xs text-gray-500">
                                {result.width}×{result.height}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowUploadDialog(false)}
                disabled={isSaving}
              >
                Annuler
              </Button>
              <Button
                onClick={handleSaveImages}
                disabled={uploadedImages.length === 0 || isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatorUpload;
