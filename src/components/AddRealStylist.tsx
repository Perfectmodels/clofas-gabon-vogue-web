import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCreators } from '@/hooks/useCreators';
import { Plus, Users, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AddRealStylist = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { createCreator } = useCreators();
  
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    bio: '',
    website: '',
    instagram: '',
    facebook: '',
    twitter: '',
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.country.trim()) {
      toast.error('Le nom et le pays sont requis');
      return;
    }

    setIsAdding(true);
    
    try {
      const socialMedia: any = {};
      if (formData.instagram) socialMedia.instagram = formData.instagram;
      if (formData.facebook) socialMedia.facebook = formData.facebook;
      if (formData.twitter) socialMedia.twitter = formData.twitter;

      await createCreator({
        name: formData.name,
        country: formData.country,
        bio: formData.bio || undefined,
        website: formData.website || undefined,
        socialMedia: Object.keys(socialMedia).length > 0 ? socialMedia : undefined,
        featured: formData.featured,
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Reset form
      setFormData({
        name: '',
        country: '',
        bio: '',
        website: '',
        instagram: '',
        facebook: '',
        twitter: '',
        featured: false
      });

      toast.success(`${formData.name} ajouté avec succès !`);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du styliste');
      console.error('Erreur:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Ajouter un Styliste
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom du Styliste *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nom complet du styliste"
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Pays *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="Pays d'origine"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Biographie du styliste..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="website">Site Web</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://exemple.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="@username"
              />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                placeholder="Nom de la page"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                placeholder="@username"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="featured">Styliste vedette</Label>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isAdding}
              className="bg-clofas-coral hover:bg-clofas-coral/90"
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {isAdding ? 'Ajout en cours...' : 'Ajouter le Styliste'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRealStylist;
