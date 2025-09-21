import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEvents, useFilteredEvents } from '@/hooks/useFirebase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Eye,
  Save
} from 'lucide-react';

const EventsManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents();
  
  const { events: filteredEvents } = useFilteredEvents({
    searchTerm,
    categoryFilter: 'all',
    statusFilter: 'all'
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      'Conférence': 'bg-purple-100 text-purple-800',
      'Atelier': 'bg-orange-100 text-orange-800',
      'Défilé': 'bg-pink-100 text-pink-800'
    };
    return variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des événements</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-clofas-dark">Gestion des Événements</h1>
          <p className="text-gray-600">Gérez les événements de CLOFAS 241</p>
        </div>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel événement
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <Input
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Événements</p>
                <p className="text-2xl font-bold text-clofas-dark">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Participants Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {events.reduce((sum, event) => sum + event.currentParticipants, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Événements Actifs</p>
                <p className="text-2xl font-bold text-purple-600">
                  {events.filter(e => e.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux d'Occupation</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    (events.reduce((sum, event) => sum + event.currentParticipants, 0) /
                     events.reduce((sum, event) => sum + event.maxParticipants, 0)) * 100
                  )}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusBadge(event.status)}>
                      {event.status}
                    </Badge>
                    <Badge className={getCategoryBadge(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.date} à {event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {event.price === 0 ? 'Gratuit' : `${event.price.toLocaleString()} FCFA`}
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-clofas-coral h-2 rounded-full" 
                      style={{ 
                        width: `${(event.currentParticipants / event.maxParticipants) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? `Modifier: ${selectedEvent.title}` : 'Nouvel événement'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Titre</label>
                <Input 
                  defaultValue={selectedEvent?.title || ''}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Catégorie</label>
                <Select defaultValue={selectedEvent?.category || ''}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conférence">Conférence</SelectItem>
                    <SelectItem value="Atelier">Atelier</SelectItem>
                    <SelectItem value="Défilé">Défilé</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Description</label>
              <Textarea 
                defaultValue={selectedEvent?.description || ''}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Date</label>
                <Input 
                  defaultValue={selectedEvent?.date || ''}
                  className="mt-1"
                  type="date"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Heure</label>
                <Input 
                  defaultValue={selectedEvent?.time || ''}
                  className="mt-1"
                  type="time"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Lieu</label>
              <Input 
                defaultValue={selectedEvent?.location || ''}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Participants max</label>
                <Input 
                  defaultValue={selectedEvent?.maxParticipants || ''}
                  className="mt-1"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Prix (FCFA)</label>
                <Input 
                  defaultValue={selectedEvent?.price || ''}
                  className="mt-1"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Statut</label>
                <Select defaultValue={selectedEvent?.status || 'active'}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsManagement;
