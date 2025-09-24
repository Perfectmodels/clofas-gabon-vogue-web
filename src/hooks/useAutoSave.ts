import { useState, useEffect, useCallback } from 'react';
import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from '../config/firebase-config';

interface AutoSaveOptions {
  debounceMs?: number;
  onSave?: () => void;
  onError?: (error: Error) => void;
}

export const useAutoSave = <T>(
  path: string,
  initialData: T,
  options: AutoSaveOptions = {}
) => {
  const { debounceMs = 1000, onSave, onError } = options;
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Charger les données depuis Firebase
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dataRef = ref(database, path);
      const snapshot = await get(dataRef);
      
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        setData(firebaseData);
        setLastSaved(new Date());
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(errorMessage);
      if (onError) onError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [path, onError]);

  // Sauvegarder les données vers Firebase
  const saveData = useCallback(async (newData: T) => {
    setIsSaving(true);
    setError(null);
    
    try {
      const dataRef = ref(database, path);
      await set(dataRef, newData);
      setLastSaved(new Date());
      if (onSave) onSave();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      setError(errorMessage);
      if (onError) onError(err as Error);
    } finally {
      setIsSaving(false);
    }
  }, [path, onSave, onError]);

  // Mettre à jour les données avec sauvegarde automatique
  const updateData = useCallback((newData: T | ((prev: T) => T)) => {
    const updatedData = typeof newData === 'function' ? newData(data) : newData;
    setData(updatedData);
    
    // Debounce la sauvegarde
    const timeoutId = setTimeout(() => {
      saveData(updatedData);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [data, saveData, debounceMs]);

  // Écouter les changements en temps réel
  useEffect(() => {
    const dataRef = ref(database, path);
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        setData(firebaseData);
        setLastSaved(new Date());
      }
    }, (error) => {
      setError(error.message);
      if (onError) onError(error);
    });

    return () => off(dataRef, 'value', unsubscribe);
  }, [path, onError]);

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    updateData,
    saveData,
    loadData,
    isLoading,
    isSaving,
    lastSaved,
    error
  };
};

export default useAutoSave;
