import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { database } from '@/services/firebase';

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export const useRegistrationsFirebase = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const registrationsRef = ref(database, 'registrations');
    
    const unsubscribe = onValue(registrationsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const registrationsList = Object.entries(data).map(([id, registration]: [string, any]) => ({
            id,
            ...registration
          })) as Registration[];
          setRegistrations(registrationsList);
        } else {
          setRegistrations([]);
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

  const createRegistration = async (registrationData: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('🔄 Création d\'une nouvelle inscription...', registrationData);
      const newRegistrationRef = push(ref(database, 'registrations'));
      const registrationId = newRegistrationRef.key!;
      
      const registration: Registration = {
        id: registrationId,
        ...registrationData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await set(newRegistrationRef, registration);
      console.log('✅ Inscription créée avec succès:', registrationId);
      return registration;
    } catch (err: any) {
      console.error('❌ Erreur lors de la création de l\'inscription:', err);
      throw new Error(`Erreur lors de la création: ${err.message}`);
    }
  };

  const updateRegistration = async (registrationId: string, updates: Partial<Registration>) => {
    try {
      const registrationRef = ref(database, `registrations/${registrationId}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await update(registrationRef, updateData);
    } catch (err: any) {
      throw new Error(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const deleteRegistration = async (registrationId: string) => {
    try {
      const registrationRef = ref(database, `registrations/${registrationId}`);
      await remove(registrationRef);
    } catch (err: any) {
      throw new Error(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  const updateRegistrationStatus = async (registrationId: string, status: Registration['status']) => {
    try {
      await updateRegistration(registrationId, { status });
    } catch (err: any) {
      throw new Error(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  return {
    registrations,
    loading,
    error,
    createRegistration,
    updateRegistration,
    deleteRegistration,
    updateRegistrationStatus
  };
};
