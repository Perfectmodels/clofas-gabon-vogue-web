import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoSaveIndicatorProps {
  isSaving?: boolean;
  lastSaved?: Date;
  error?: string | null;
  className?: string;
}

const AutoSaveIndicator = ({ 
  isSaving = false, 
  lastSaved, 
  error = null, 
  className 
}: AutoSaveIndicatorProps) => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (isSaving || lastSaved || error) {
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved, error]);

  if (!showIndicator) return null;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg transition-all duration-300",
      error 
        ? "bg-red-100 text-red-800 border border-red-200" 
        : isSaving 
        ? "bg-blue-100 text-blue-800 border border-blue-200"
        : "bg-green-100 text-green-800 border border-green-200",
      className
    )}>
      {error ? (
        <>
          <AlertCircle className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">Erreur de sauvegarde</span>
        </>
      ) : isSaving ? (
        <>
          <Clock className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Sauvegarde en cours...</span>
        </>
      ) : (
        <>
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">
            Sauvegardé {lastSaved && `à ${lastSaved.toLocaleTimeString()}`}
          </span>
        </>
      )}
    </div>
  );
};

export default AutoSaveIndicator;
