import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import AutoSaveIndicator from '@/components/ui/auto-save-indicator';
import { 
  MessageSquare, 
  Send, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Filter, 
  Reply, 
  Trash2, 
  Eye, 
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  MessageCircle,
  Bell,
  Archive,
  Star
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'support' | 'partnership' | 'event' | 'technical';
  createdAt: string;
  readAt?: string;
  repliedAt?: string;
  tags: string[];
}

interface Reply {
  id: string;
  messageId: string;
  content: string;
  sentAt: string;
  sentBy: string;
}

const MessagesManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [newMessageForm, setNewMessageForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();
  
  // Sauvegarde automatique
  const { autoSave, isSaving, lastSaved, error } = useAutoSave({
    onSave: (data) => console.log('🔄 Sauvegarde des messages:', data),
    onSuccess: () => toast({ title: "Messages sauvegardés", description: "Les modifications ont été sauvegardées automatiquement" }),
    onError: (error) => toast({ title: "Erreur de sauvegarde", description: error, variant: "destructive" })
  });

  // Charger les messages depuis localStorage (simulation de base de données)
  useEffect(() => {
    const savedMessages = localStorage.getItem('clofas-messages');
    const savedReplies = localStorage.getItem('clofas-replies');
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Messages d'exemple
      const exampleMessages: Message[] = [
        {
          id: 'msg-1',
          name: 'Marie Koumba',
          email: 'marie.koumba@email.com',
          phone: '+241 01 23 45 67',
          subject: 'Inscription à la conférence',
          message: 'Bonjour, je souhaiterais m\'inscrire à la conférence CLOFAS 241. Pourriez-vous me donner plus d\'informations sur les modalités d\'inscription ?',
          status: 'new',
          priority: 'medium',
          category: 'event',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          tags: ['conférence', 'inscription']
        },
        {
          id: 'msg-2',
          name: 'Pierre Mba',
          email: 'pierre.mba@email.com',
          subject: 'Partenariat avec CLOFAS',
          message: 'Nous représentons une marque de mode gabonaise et souhaiterions établir un partenariat avec CLOFAS 241. Seriez-vous intéressés ?',
          status: 'read',
          priority: 'high',
          category: 'partnership',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          readAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          tags: ['partenariat', 'mode']
        },
        {
          id: 'msg-3',
          name: 'Sarah Nguema',
          email: 'sarah.nguema@email.com',
          phone: '+241 07 89 12 34',
          subject: 'Problème technique sur le site',
          message: 'Je n\'arrive pas à télécharger les images de ma galerie. Le bouton d\'upload ne fonctionne pas correctement.',
          status: 'replied',
          priority: 'high',
          category: 'technical',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          readAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
          repliedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
          tags: ['technique', 'upload']
        }
      ];
      setMessages(exampleMessages);
    }
    
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    }
  }, []);

  // Sauvegarder les messages
  const saveMessages = () => {
    localStorage.setItem('clofas-messages', JSON.stringify(messages));
    localStorage.setItem('clofas-replies', JSON.stringify(replies));
  };

  // Filtrage des messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'new': 'bg-blue-100 text-blue-800',
      'read': 'bg-yellow-100 text-yellow-800',
      'replied': 'bg-green-100 text-green-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    return variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      'general': 'bg-blue-100 text-blue-800',
      'support': 'bg-green-100 text-green-800',
      'partnership': 'bg-purple-100 text-purple-800',
      'event': 'bg-orange-100 text-orange-800',
      'technical': 'bg-red-100 text-red-800'
    };
    return variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const updateMessageStatus = (messageId: string, status: Message['status']) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            status, 
            readAt: status === 'read' && !msg.readAt ? new Date().toISOString() : msg.readAt,
            repliedAt: status === 'replied' && !msg.repliedAt ? new Date().toISOString() : msg.repliedAt
          }
        : msg
    );
    
    setMessages(updatedMessages);
    
    // Sauvegarde automatique
    autoSave(async () => {
      localStorage.setItem('clofas-messages', JSON.stringify(updatedMessages));
    }, updatedMessages);
    
    toast({
      title: "Statut mis à jour",
      description: `Le message a été marqué comme ${status}`,
    });
  };

  const sendReply = (messageId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un message de réponse",
        variant: "destructive"
      });
      return;
    }

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      messageId,
      content: replyContent,
      sentAt: new Date().toISOString(),
      sentBy: 'Admin CLOFAS'
    };

    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    setReplyContent('');
    
    // Mettre à jour le statut du message
    updateMessageStatus(messageId, 'replied');
    
    toast({
      title: "Réponse envoyée",
      description: "Votre réponse a été envoyée avec succès",
    });
  };

  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    const updatedReplies = replies.filter(reply => reply.messageId !== messageId);
    
    setMessages(updatedMessages);
    setReplies(updatedReplies);
    
    // Sauvegarde automatique
    autoSave(async () => {
      localStorage.setItem('clofas-messages', JSON.stringify(updatedMessages));
      localStorage.setItem('clofas-replies', JSON.stringify(updatedReplies));
    }, { messages: updatedMessages, replies: updatedReplies });
    
    toast({
      title: "Message supprimé",
      description: "Le message a été supprimé avec succès",
    });
  };

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    replied: messages.filter(m => m.status === 'replied').length,
    highPriority: messages.filter(m => m.priority === 'high').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="h-6 w-6 text-clofas-coral mr-2" />
            Gestion des Messages
          </h1>
          <p className="text-gray-600">Communication et support client</p>
        </div>
        <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} error={error} />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nouveaux</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Répondus</p>
                <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Priorité Haute</p>
                <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher dans les messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouveaux</SelectItem>
                <SelectItem value="read">Lus</SelectItem>
                <SelectItem value="replied">Répondus</SelectItem>
                <SelectItem value="archived">Archivés</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="general">Général</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="partnership">Partenariat</SelectItem>
                <SelectItem value="event">Événement</SelectItem>
                <SelectItem value="technical">Technique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des messages */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun message trouvé</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                        <Badge className={getStatusBadge(message.status)}>
                          {message.status === 'new' && 'Nouveau'}
                          {message.status === 'read' && 'Lu'}
                          {message.status === 'replied' && 'Répondu'}
                          {message.status === 'archived' && 'Archivé'}
                        </Badge>
                        <Badge className={getPriorityBadge(message.priority)}>
                          {message.priority === 'high' && 'Haute'}
                          {message.priority === 'medium' && 'Moyenne'}
                          {message.priority === 'low' && 'Basse'}
                        </Badge>
                        <Badge className={getCategoryBadge(message.category)}>
                          {message.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {message.name}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {message.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(message.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 line-clamp-2">{message.message}</p>
                      
                      {message.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{message.subject}</DialogTitle>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Nom</label>
                                  <p className="text-gray-900">{selectedMessage.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Email</label>
                                  <p className="text-gray-900">{selectedMessage.email}</p>
                                </div>
                                {selectedMessage.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Téléphone</label>
                                    <p className="text-gray-900">{selectedMessage.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Date</label>
                                  <p className="text-gray-900">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-gray-600">Message</label>
                                <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                              </div>
                              
                              <div className="border-t pt-4">
                                <label className="text-sm font-medium text-gray-600 mb-2 block">Répondre</label>
                                <Textarea
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  placeholder="Tapez votre réponse ici..."
                                  rows={4}
                                />
                                <Button 
                                  onClick={() => sendReply(selectedMessage.id)}
                                  className="mt-2 bg-clofas-coral hover:bg-clofas-coral/90"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Envoyer la réponse
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {message.status === 'new' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, 'read')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateMessageStatus(message.id, 'archived')}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesManagement;
