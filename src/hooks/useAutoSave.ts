import { useState, useCallback, useRef, useEffect } from 'react';

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
  pendingChanges: boolean;
}

interface AutoSaveOptions {
  delay?: number;
  maxRetries?: number;
  onSave?: (data: any) => void;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const useAutoSave = (options: AutoSaveOptions = {}) => {
  const {
    delay = 1000,
    maxRetries = 3,
    onSave,
    onError,
    onSuccess
  } = options;

  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    error: null,
    pendingChanges: false
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const lastDataRef = useRef<any>(null);

  const startSaving = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isSaving: true, 
      error: null,
      pendingChanges: true 
    }));
  }, []);

  const finishSaving = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isSaving: false, 
      lastSaved: new Date(),
      error: null,
      pendingChanges: false
    }));
    retryCountRef.current = 0;
    onSuccess?.();
  }, [onSuccess]);

  const setError = useCallback((error: string) => {
    setState(prev => ({ 
      ...prev, 
      isSaving: false, 
      error,
      pendingChanges: false
    }));
    onError?.(error);
  }, [onError]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const autoSave = useCallback(async (
    saveFunction: () => Promise<void>,
    data?: any,
    customDelay?: number
  ) => {
    // Annuler la sauvegarde précédente si elle existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Sauvegarder les données pour les retry
    if (data !== undefined) {
      lastDataRef.current = data;
    }

    const saveDelay = customDelay ?? delay;

    // Démarrer la sauvegarde après le délai
    timeoutRef.current = setTimeout(async () => {
      try {
        startSaving();
        onSave?.(lastDataRef.current);
        
        await saveFunction();
        
        finishSaving();
      } catch (error: any) {
        console.error('Erreur de sauvegarde automatique:', error);
        
        // Retry logic
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++;
          console.log(`Tentative de sauvegarde ${retryCountRef.current}/${maxRetries}`);
          
          // Retry avec un délai exponentiel
          setTimeout(() => {
            autoSave(saveFunction, lastDataRef.current, saveDelay * 2);
          }, saveDelay * Math.pow(2, retryCountRef.current));
        } else {
          setError(error.message || 'Erreur de sauvegarde');
          retryCountRef.current = 0;
        }
      }
    }, saveDelay);
  }, [startSaving, finishSaving, setError, delay, maxRetries, onSave]);

  // Sauvegarde immédiate (sans délai)
  const saveImmediately = useCallback(async (
    saveFunction: () => Promise<void>,
    data?: any
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      startSaving();
      onSave?.(data);
      
      await saveFunction();
      
      finishSaving();
    } catch (error: any) {
      setError(error.message || 'Erreur de sauvegarde');
    }
  }, [startSaving, finishSaving, setError, onSave]);

  // Nettoyage au démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Indicateur de changement non sauvegardé
  const hasUnsavedChanges = state.pendingChanges && !state.isSaving && !state.error;

  return {
    ...state,
    hasUnsavedChanges,
    autoSave,
    saveImmediately,
    startSaving,
    finishSaving,
    setError,
    clearError
  };
};