import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Users, 
  Calendar, 
  Image, 
  MessageSquare,
  Award,
  Clock,
  Eye,
  Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'registration' | 'creator' | 'event' | 'image' | 'system';
  actionUrl?: string;
  metadata?: any;
}

const RealTimeNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();
  
  // Sauvegarde automatique
  const { autoSave, isSaving, lastSaved, error } = useAutoSave({
    onSave: (data) => console.log('🔄 Sauvegarde des notifications:', data),
    onSuccess: () => console.log('✅ Notifications sauvegardées'),
    onError: (error) => toast({ title: "Erreur de sauvegarde", description: error, variant: "destructive" })
  });

  // Charger les notifications depuis localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('clofas-notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Notifications d'exemple basées sur des événements réels
      const exampleNotifications: Notification[] = [
        {
          id: 'notif-1',
          type: 'info',
          title: 'Nouvelle inscription',
          message: 'Marie Koumba s\'est inscrite à la conférence CLOFAS 241',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          category: 'registration',
          actionUrl: '/admin/participants',
          metadata: { userId: 'user-1', event: 'Conférence CLOFAS 241' }
        },
        {
          id: 'notif-2',
          type: 'success',
          title: 'Images uploadées',
          message: '15 nouvelles images ont été ajoutées à la galerie par Beitch Faro',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          read: false,
          category: 'image',
          actionUrl: '/admin/gallery',
          metadata: { creatorId: 'creator-11', imageCount: 15 }
        },
        {
          id: 'notif-3',
          type: 'warning',
          title: 'Inscription en attente',
          message: '3 inscriptions nécessitent votre validation',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          read: true,
          category: 'registration',
          actionUrl: '/admin/participants',
          metadata: { pendingCount: 3 }
        },
        {
          id: 'notif-4',
          type: 'info',
          title: 'Nouveau créateur',
          message: 'Lady Riaba a été ajoutée à la base de données',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          category: 'creator',
          actionUrl: '/admin/creators',
          metadata: { creatorId: 'creator-0' }
        }
      ];
      setNotifications(exampleNotifications);
    }
  }, []);

  // Sauvegarder les notifications
  const saveNotifications = (updatedNotifications: Notification[]) => {
    localStorage.setItem('clofas-notifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    
    // Sauvegarde automatique
    autoSave(async () => {
      saveNotifications(updatedNotifications);
    }, updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    
    // Sauvegarde automatique
    autoSave(async () => {
      saveNotifications(updatedNotifications);
    }, updatedNotifications);
    
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
    setNotifications(updatedNotifications);
    
    // Sauvegarde automatique
    autoSave(async () => {
      saveNotifications(updatedNotifications);
    }, updatedNotifications);
    
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès",
    });
  };

  const getNotificationIcon = (type: string, category: string) => {
    if (category === 'registration') return Users;
    if (category === 'creator') return Award;
    if (category === 'event') return Calendar;
    if (category === 'image') return Image;
    if (category === 'system') return MessageSquare;
    
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'registration': return 'bg-blue-100 text-blue-800';
      case 'creator': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-orange-100 text-orange-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = showAll ? notifications : notifications.filter(notif => !notif.read);
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bell className="h-6 w-6 text-clofas-coral mr-2" />
            Notifications en Temps Réel
          </h1>
          <p className="text-gray-600">Centre de notifications du panel admin</p>
        </div>
        <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Non lues</p>
                <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lues</p>
                <p className="text-2xl font-bold text-green-600">{notifications.length - unreadCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant={showAll ? 'default' : 'outline'}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Voir seulement les non lues' : 'Voir toutes'}
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
            >
              Marquer tout comme lu
            </Button>
          )}
        </div>
        <Badge variant="secondary" className="text-sm">
          {filteredNotifications.length} notification(s)
        </Badge>
      </div>

      {/* Liste des notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {showAll ? 'Aucune notification trouvée' : 'Aucune notification non lue'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type, notification.category);
                
                return (
                  <div 
                    key={notification.id} 
                    className={`border rounded-lg p-4 transition-colors ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full ${
                          !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            !notification.read ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={getNotificationColor(notification.type)}>
                              {notification.type}
                            </Badge>
                            <Badge className={getCategoryColor(notification.category)}>
                              {notification.category}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {notification.actionUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = notification.actionUrl}
                          >
                            Voir
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeNotifications;