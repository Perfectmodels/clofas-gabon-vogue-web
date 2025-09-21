import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { database } from '@/services/firebase';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'conference' | 'workshop' | 'fashion-show' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxParticipants?: number;
  currentParticipants: number;
  price?: number;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useEventsFirebase = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventsRef = ref(database, 'events');
    
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const eventsList = Object.entries(data).map(([id, event]: [string, any]) => ({
            id,
            ...event
          })) as Event[];
          setEvents(eventsList);
        } else {
          setEvents([]);
        }
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'currentParticipants'>) => {
    try {
      const newEventRef = push(ref(database, 'events'));
      const eventId = newEventRef.key!;
      
      const event: Event = {
        id: eventId,
        ...eventData,
        currentParticipants: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await set(newEventRef, event);
      return event;
    } catch (err: any) {
      throw new Error(`Erreur lors de la création: ${err.message}`);
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<Event>) => {
    try {
      const eventRef = ref(database, `events/${eventId}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await update(eventRef, updateData);
    } catch (err: any) {
      throw new Error(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const eventRef = ref(database, `events/${eventId}`);
      await remove(eventRef);
    } catch (err: any) {
      throw new Error(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  const updateEventStatus = async (eventId: string, status: Event['status']) => {
    try {
      await updateEvent(eventId, { status });
    } catch (err: any) {
      throw new Error(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  const toggleFeatured = async (eventId: string) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (event) {
        await updateEvent(eventId, { featured: !event.featured });
      }
    } catch (err: any) {
      throw new Error(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
    toggleFeatured
  };
};
