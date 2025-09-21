import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/ui/image-upload';
import AdvancedImageUpload from '@/components/ui/advanced-image-upload';
import BulkImageUpload from './BulkImageUpload';
import { UploadResult } from '@/services/imgbb-service';
import { CloudUpload, FolderOpen } from 'lucide-react';

interface CreatorUploadSimpleProps {
  creatorId: string;
  creatorName: string;
  onUploadComplete?: (results: UploadResult[]) => void;
}

const CreatorUploadSimple = ({ creatorId, creatorName, onUploadComplete }: CreatorUploadSimpleProps) => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');

  const handleUploadComplete = (results: UploadResult[]) => {
    const successfulUploads = results.filter(r => r.success);
    onUploadComplete?.(successfulUploads);
    setShowUploadDialog(false);
  };

  const handleUploadError = (error: string) => {
    console.error('Erreur d\'upload:', error);
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
            <DialogDescription>
              Ajoutez des images à la galerie de ce créateur
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={uploadMode} onValueChange={(value) => setUploadMode(value as 'single' | 'bulk')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Upload Simple</TabsTrigger>
              <TabsTrigger value="bulk">Upload en Masse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="space-y-6">
              {/* Upload simple avec mini-grille */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sélection des images</CardTitle>
                </CardHeader>
                <CardContent>
                  <AdvancedImageUpload
                    onUploadComplete={(urls) => {
                      const results = urls.map(url => ({ success: true, url }));
                      handleUploadComplete(results);
                    }}
                    maxFiles={100}
                    maxSize={32}
                    className="border border-gray-300 rounded-lg p-4"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bulk" className="space-y-6">
              {/* Upload en masse */}
              <BulkImageUpload
                creatorId={creatorId}
                creatorName={creatorName}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatorUploadSimple;
