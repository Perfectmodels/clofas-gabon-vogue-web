import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/services/firebase';

export interface DashboardStats {
  totalRegistrations: number;
  totalEvents: number;
  totalImages: number;
  totalCreators: number;
  recentRegistrations: any[];
  upcomingEvents: any[];
  recentImages: any[];
  registrationStats: {
    confirmed: number;
    pending: number;
    cancelled: number;
  };
  eventStats: {
    upcoming: number;
    ongoing: number;
    completed: number;
  };
  imageStats: {
    total: number;
    featured: number;
    byCategory: Record<string, number>;
  };
  creatorStats: {
    total: number;
    featured: number;
    byCountry: Record<string, number>;
  };
}

export const useDashboardStatsFirebase = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const registrationsRef = ref(database, 'registrations');
    const eventsRef = ref(database, 'events');
    const imagesRef = ref(database, 'images');
    const creatorsRef = ref(database, 'creators');

    let registrationsData: any[] = [];
    let eventsData: any[] = [];
    let imagesData: any[] = [];
    let creatorsData: any[] = [];

    const updateStats = () => {
      try {
        // Calculer les statistiques
        const totalRegistrations = registrationsData.length;
        const totalEvents = eventsData.length;
        const totalImages = imagesData.length;
        const totalCreators = creatorsData.length;

        // Statistiques des inscriptions
        const registrationStats = {
          confirmed: registrationsData.filter((r: any) => r.status === 'confirmed').length,
          pending: registrationsData.filter((r: any) => r.status === 'pending').length,
          cancelled: registrationsData.filter((r: any) => r.status === 'cancelled').length
        };

        // Statistiques des événements
        const eventStats = {
          upcoming: eventsData.filter((e: any) => e.status === 'upcoming').length,
          ongoing: eventsData.filter((e: any) => e.status === 'ongoing').length,
          completed: eventsData.filter((e: any) => e.status === 'completed').length
        };

        // Statistiques des images
        const imageStats = {
          total: totalImages,
          featured: imagesData.filter((i: any) => i.featured).length,
          byCategory: imagesData.reduce((acc: Record<string, number>, img: any) => {
            acc[img.category] = (acc[img.category] || 0) + 1;
            return acc;
          }, {})
        };

        // Statistiques des créateurs
        const creatorStats = {
          total: totalCreators,
          featured: creatorsData.filter((c: any) => c.featured).length,
          byCountry: creatorsData.reduce((acc: Record<string, number>, creator: any) => {
            acc[creator.country] = (acc[creator.country] || 0) + 1;
            return acc;
          }, {})
        };

        // Inscriptions récentes (5 dernières)
        const recentRegistrations = registrationsData
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        // Événements à venir (5 prochains)
        const upcomingEvents = eventsData
          .filter((e: any) => e.status === 'upcoming')
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 5);

        // Images récentes (5 dernières)
        const recentImages = imagesData
          .sort((a: any, b: any) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
          .slice(0, 5);

        const dashboardStats: DashboardStats = {
          totalRegistrations,
          totalEvents,
          totalImages,
          totalCreators,
          recentRegistrations,
          upcomingEvents,
          recentImages,
          registrationStats,
          eventStats,
          imageStats,
          creatorStats
        };

        setStats(dashboardStats);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    const unsubscribeRegistrations = onValue(registrationsRef, (snapshot) => {
      const data = snapshot.val();
      registrationsData = data ? Object.values(data) : [];
      updateStats();
    });

    const unsubscribeEvents = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      eventsData = data ? Object.values(data) : [];
      updateStats();
    });

    const unsubscribeImages = onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      imagesData = data ? Object.values(data) : [];
      updateStats();
    });

    const unsubscribeCreators = onValue(creatorsRef, (snapshot) => {
      const data = snapshot.val();
      creatorsData = data ? Object.values(data) : [];
      updateStats();
    });

    return () => {
      unsubscribeRegistrations();
      unsubscribeEvents();
      unsubscribeImages();
      unsubscribeCreators();
    };
  }, []);

  return {
    stats,
    loading,
    error
  };
};
