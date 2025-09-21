import { useState, useEffect, useCallback } from 'react';
import { 
  RegistrationService, 
  EventService, 
  ContentService, 
  ImageService, 
  SiteSettingsService,
  AnalyticsService,
  type Registration,
  type Event,
  type Content,
  type Image,
  type SiteSettings
} from '@/services/firebase-service';

// Hook pour les inscriptions
export const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = RegistrationService.subscribeToAll((data) => {
      setRegistrations(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createRegistration = useCallback(async (registration: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      return await RegistrationService.create(registration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      throw err;
    }
  }, []);

  const updateRegistration = useCallback(async (id: string, updates: Partial<Registration>) => {
    try {
      setError(null);
      await RegistrationService.update(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  const deleteRegistration = useCallback(async (id: string) => {
    try {
      setError(null);
      await RegistrationService.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    }
  }, []);

  return {
    registrations,
    loading,
    error,
    createRegistration,
    updateRegistration,
    deleteRegistration
  };
};

// Hook pour les événements
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = EventService.subscribeToAll((data) => {
      setEvents(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createEvent = useCallback(async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      return await EventService.create(event);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      throw err;
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    try {
      setError(null);
      await EventService.update(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      setError(null);
      await EventService.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    }
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent
  };
};

// Hook pour le contenu
export const useContent = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = ContentService.subscribeToAll((data) => {
      setContent(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createContent = useCallback(async (contentItem: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      return await ContentService.create(contentItem);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      throw err;
    }
  }, []);

  const updateContent = useCallback(async (id: string, updates: Partial<Content>) => {
    try {
      setError(null);
      await ContentService.update(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  const deleteContent = useCallback(async (id: string) => {
    try {
      setError(null);
      await ContentService.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    }
  }, []);

  return {
    content,
    loading,
    error,
    createContent,
    updateContent,
    deleteContent
  };
};

// Hook pour les images
export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = ImageService.subscribeToAll((data) => {
      setImages(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createImage = useCallback(async (image: Omit<Image, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      return await ImageService.create(image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      throw err;
    }
  }, []);

  const updateImage = useCallback(async (id: string, updates: Partial<Image>) => {
    try {
      setError(null);
      await ImageService.update(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  const deleteImage = useCallback(async (id: string) => {
    try {
      setError(null);
      await ImageService.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    }
  }, []);

  return {
    images,
    loading,
    error,
    createImage,
    updateImage,
    deleteImage
  };
};

// Hook pour les images d'un créateur spécifique
export const useCreatorImages = (creatorId: string) => {
  const [creatorImages, setCreatorImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = ImageService.subscribeToAll((allImages) => {
      // Filtrer les images par creatorId
      const filteredImages = allImages.filter(image => 
        image.creatorId === creatorId || 
        (image as any).creatorId === creatorId
      );
      setCreatorImages(filteredImages);
      setLoading(false);
    });

    return unsubscribe;
  }, [creatorId]);

  const createCreatorImage = useCallback(async (imageData: Omit<Image, 'id' | 'createdAt' | 'updatedAt'> & { creatorId: string }) => {
    try {
      setError(null);
      return await ImageService.create(imageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      throw err;
    }
  }, []);

  const updateCreatorImage = useCallback(async (id: string, updates: Partial<Image>) => {
    try {
      setError(null);
      await ImageService.update(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  const deleteCreatorImage = useCallback(async (id: string) => {
    try {
      setError(null);
      await ImageService.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    }
  }, []);

  return {
    creatorImages,
    loading,
    error,
    createCreatorImage,
    updateCreatorImage,
    deleteCreatorImage
  };
};

// Hook pour les paramètres du site
export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = SiteSettingsService.subscribeToSettings((data) => {
      setSettings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateSettings = useCallback(async (updates: Partial<SiteSettings>) => {
    try {
      setError(null);
      await SiteSettingsService.update(updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings
  };
};

// Hook pour les statistiques du tableau de bord
export const useDashboardStats = () => {
  const [stats, setStats] = useState<{
    totalRegistrations: number;
    totalEvents: number;
    totalMessages: number;
    totalImages: number;
    recentRegistrations: Registration[];
    upcomingEvents: Event[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await AnalyticsService.getDashboardStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AnalyticsService.getDashboardStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats
  };
};

// Hook pour les inscriptions filtrées
export const useFilteredRegistrations = (filters: {
  searchTerm?: string;
  statusFilter?: string;
  eventFilter?: string;
}) => {
  const { registrations, loading, error } = useRegistrations();
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    let filtered = registrations;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(reg =>
        reg.name.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.statusFilter && filters.statusFilter !== 'all') {
      filtered = filtered.filter(reg => reg.status === filters.statusFilter);
    }

    if (filters.eventFilter && filters.eventFilter !== 'all') {
      filtered = filtered.filter(reg => reg.event === filters.eventFilter);
    }

    setFilteredRegistrations(filtered);
  }, [registrations, filters]);

  return {
    registrations: filteredRegistrations,
    loading,
    error
  };
};

// Hook pour les événements filtrés
export const useFilteredEvents = (filters: {
  searchTerm?: string;
  categoryFilter?: string;
  statusFilter?: string;
}) => {
  const { events, loading, error } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    let filtered = events;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.categoryFilter && filters.categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === filters.categoryFilter);
    }

    if (filters.statusFilter && filters.statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === filters.statusFilter);
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  return {
    events: filteredEvents,
    loading,
    error
  };
};

// Hook pour les images filtrées
export const useFilteredImages = (filters: {
  searchTerm?: string;
  categoryFilter?: string;
}) => {
  const { images, loading, error } = useImages();
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);

  useEffect(() => {
    let filtered = images;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(image =>
        image.name.toLowerCase().includes(searchLower) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.categoryFilter && filters.categoryFilter !== 'all') {
      filtered = filtered.filter(image => image.category === filters.categoryFilter);
    }

    setFilteredImages(filtered);
  }, [images, filters]);

  return {
    images: filteredImages,
    loading,
    error
  };
};
