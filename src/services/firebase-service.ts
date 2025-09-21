import { 
  ref, 
  get, 
  set, 
  push, 
  update, 
  remove, 
  onValue, 
  off,
  query,
  orderByChild,
  equalTo,
  limitToLast
} from 'firebase/database';
import { database } from '@/lib/firebase';

// Types pour les données
export interface Registration {
  id?: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  date: string;
  status: 'en attente' | 'confirmé' | 'annulé';
  payment: 'payé' | 'en attente' | 'non payé';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  status: 'active' | 'inactive' | 'completed';
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id?: string;
  title: string;
  type: 'page' | 'section' | 'text' | 'image' | 'video';
  content: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id?: string;
  name: string;
  url: string;
  displayUrl?: string;
  category: string;
  tags: string[];
  size: string;
  dimensions: string;
  uploadDate: string;
  author: string;
  alt: string;
  description?: string;
  creatorId?: string;
  year?: number;
  deleteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id?: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  contactEmail: string;
  contactPhone: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkColor: string;
  fontFamily: string;
  headerFont: string;
  maintenanceMode: boolean;
  userRegistration: boolean;
  emailNotifications: boolean;
  analyticsEnabled: boolean;
  socialSharing: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  emailFrom: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  maxLoginAttempts: number;
  sessionTimeout: number;
  passwordMinLength: number;
  twoFactorAuth: boolean;
  updatedAt: string;
}

// Service pour les inscriptions
export class RegistrationService {
  private static readonly COLLECTION = 'registrations';

  static async getAll(): Promise<Registration[]> {
    try {
      const snapshot = await get(ref(database, this.COLLECTION));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Registration | null> {
    try {
      const snapshot = await get(ref(database, `${this.COLLECTION}/${id}`));
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'inscription:', error);
      throw error;
    }
  }

  static async create(registration: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date().toISOString();
      const newRegistration = {
        ...registration,
        createdAt: now,
        updatedAt: now
      };
      
      const newRef = push(ref(database, this.COLLECTION));
      await set(newRef, newRegistration);
      return newRef.key!;
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error);
      throw error;
    }
  }

  static async update(id: string, updates: Partial<Registration>): Promise<void> {
    try {
      const updatesWithTimestamp = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await update(ref(database, `${this.COLLECTION}/${id}`), updatesWithTimestamp);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'inscription:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await remove(ref(database, `${this.COLLECTION}/${id}`));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'inscription:', error);
      throw error;
    }
  }

  static subscribeToAll(callback: (registrations: Registration[]) => void): () => void {
    const registrationsRef = ref(database, this.COLLECTION);
    
    const unsubscribe = onValue(registrationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const registrations = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        callback(registrations);
      } else {
        callback([]);
      }
    });

    return () => off(registrationsRef, 'value', unsubscribe);
  }

  static async getByEvent(eventName: string): Promise<Registration[]> {
    try {
      const q = query(
        ref(database, this.COLLECTION),
        orderByChild('event'),
        equalTo(eventName)
      );
      const snapshot = await get(q);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions par événement:', error);
      throw error;
    }
  }

  static async getByStatus(status: string): Promise<Registration[]> {
    try {
      const q = query(
        ref(database, this.COLLECTION),
        orderByChild('status'),
        equalTo(status)
      );
      const snapshot = await get(q);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions par statut:', error);
      throw error;
    }
  }
}

// Service pour les événements
export class EventService {
  private static readonly COLLECTION = 'events';

  static async getAll(): Promise<Event[]> {
    try {
      const snapshot = await get(ref(database, this.COLLECTION));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Event | null> {
    try {
      const snapshot = await get(ref(database, `${this.COLLECTION}/${id}`));
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'événement:', error);
      throw error;
    }
  }

  static async create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date().toISOString();
      const newEvent = {
        ...event,
        createdAt: now,
        updatedAt: now
      };
      
      const newRef = push(ref(database, this.COLLECTION));
      await set(newRef, newEvent);
      return newRef.key!;
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
      throw error;
    }
  }

  static async update(id: string, updates: Partial<Event>): Promise<void> {
    try {
      const updatesWithTimestamp = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await update(ref(database, `${this.COLLECTION}/${id}`), updatesWithTimestamp);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await remove(ref(database, `${this.COLLECTION}/${id}`));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
      throw error;
    }
  }

  static subscribeToAll(callback: (events: Event[]) => void): () => void {
    const eventsRef = ref(database, this.COLLECTION);
    
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const events = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        callback(events);
      } else {
        callback([]);
      }
    });

    return () => off(eventsRef, 'value', unsubscribe);
  }
}

// Service pour le contenu
export class ContentService {
  private static readonly COLLECTION = 'content';

  static async getAll(): Promise<Content[]> {
    try {
      const snapshot = await get(ref(database, this.COLLECTION));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Content | null> {
    try {
      const snapshot = await get(ref(database, `${this.COLLECTION}/${id}`));
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
      throw error;
    }
  }

  static async create(content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date().toISOString();
      const newContent = {
        ...content,
        createdAt: now,
        updatedAt: now
      };
      
      const newRef = push(ref(database, this.COLLECTION));
      await set(newRef, newContent);
      return newRef.key!;
    } catch (error) {
      console.error('Erreur lors de la création du contenu:', error);
      throw error;
    }
  }

  static async update(id: string, updates: Partial<Content>): Promise<void> {
    try {
      const updatesWithTimestamp = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await update(ref(database, `${this.COLLECTION}/${id}`), updatesWithTimestamp);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contenu:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await remove(ref(database, `${this.COLLECTION}/${id}`));
    } catch (error) {
      console.error('Erreur lors de la suppression du contenu:', error);
      throw error;
    }
  }

  static subscribeToAll(callback: (content: Content[]) => void): () => void {
    const contentRef = ref(database, this.COLLECTION);
    
    const unsubscribe = onValue(contentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const content = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        callback(content);
      } else {
        callback([]);
      }
    });

    return () => off(contentRef, 'value', unsubscribe);
  }
}

// Service pour les images
export class ImageService {
  private static readonly COLLECTION = 'images';

  static async getAll(): Promise<Image[]> {
    try {
      const snapshot = await get(ref(database, this.COLLECTION));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Image | null> {
    try {
      const snapshot = await get(ref(database, `${this.COLLECTION}/${id}`));
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image:', error);
      throw error;
    }
  }

  static async create(image: Omit<Image, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date().toISOString();
      const newImage = {
        ...image,
        createdAt: now,
        updatedAt: now
      };
      
      const newRef = push(ref(database, this.COLLECTION));
      await set(newRef, newImage);
      return newRef.key!;
    } catch (error) {
      console.error('Erreur lors de la création de l\'image:', error);
      throw error;
    }
  }

  static async update(id: string, updates: Partial<Image>): Promise<void> {
    try {
      const updatesWithTimestamp = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await update(ref(database, `${this.COLLECTION}/${id}`), updatesWithTimestamp);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'image:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await remove(ref(database, `${this.COLLECTION}/${id}`));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      throw error;
    }
  }

  static subscribeToAll(callback: (images: Image[]) => void): () => void {
    const imagesRef = ref(database, this.COLLECTION);
    
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const images = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        callback(images);
      } else {
        callback([]);
      }
    });

    return () => off(imagesRef, 'value', unsubscribe);
  }

  static async getByCategory(category: string): Promise<Image[]> {
    try {
      const q = query(
        ref(database, this.COLLECTION),
        orderByChild('category'),
        equalTo(category)
      );
      const snapshot = await get(q);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des images par catégorie:', error);
      throw error;
    }
  }
}

// Service pour les paramètres du site
export class SiteSettingsService {
  private static readonly COLLECTION = 'siteSettings';

  static async get(): Promise<SiteSettings | null> {
    try {
      const snapshot = await get(ref(database, this.COLLECTION));
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      throw error;
    }
  }

  static async update(settings: Partial<SiteSettings>): Promise<void> {
    try {
      const updatesWithTimestamp = {
        ...settings,
        updatedAt: new Date().toISOString()
      };
      await set(ref(database, this.COLLECTION), updatesWithTimestamp);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      throw error;
    }
  }

  static subscribeToSettings(callback: (settings: SiteSettings | null) => void): () => void {
    const settingsRef = ref(database, this.COLLECTION);
    
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    });

    return () => off(settingsRef, 'value', unsubscribe);
  }
}

// Service pour les statistiques
export class AnalyticsService {
  static async getDashboardStats(): Promise<{
    totalRegistrations: number;
    totalEvents: number;
    totalMessages: number;
    totalImages: number;
    recentRegistrations: Registration[];
    upcomingEvents: Event[];
  }> {
    try {
      const [registrations, events, images] = await Promise.all([
        RegistrationService.getAll(),
        EventService.getAll(),
        ImageService.getAll()
      ]);

      const recentRegistrations = registrations
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      const upcomingEvents = events
        .filter(event => event.status === 'active')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);

      return {
        totalRegistrations: registrations.length,
        totalEvents: events.length,
        totalMessages: 0, // À implémenter avec un service de messages
        totalImages: images.length,
        recentRegistrations,
        upcomingEvents
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}
