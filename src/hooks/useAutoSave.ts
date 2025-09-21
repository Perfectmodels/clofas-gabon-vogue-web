import { useState, useCallback, useRef } from 'react';

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
}

export const useAutoSave = () => {
  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    error: null
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startSaving = useCallback(() => {
    setState(prev => ({ ...prev, isSaving: true, error: null }));
  }, []);

  const finishSaving = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isSaving: false, 
      lastSaved: new Date(),
      error: null 
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ 
      ...prev, 
      isSaving: false, 
      error 
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const autoSave = useCallback(async (
    saveFunction: () => Promise<void>,
    delay: number = 1000
  ) => {
    // Annuler la sauvegarde précédente si elle existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Démarrer la sauvegarde après le délai
    timeoutRef.current = setTimeout(async () => {
      try {
        startSaving();
        await saveFunction();
        finishSaving();
      } catch (error: any) {
        setError(error.message);
      }
    }, delay);
  }, [startSaving, finishSaving, setError]);

  return {
    ...state,
    autoSave,
    startSaving,
    finishSaving,
    setError,
    clearError
  };
};
