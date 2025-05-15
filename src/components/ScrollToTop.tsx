
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop = ({
  threshold = 300,
  className
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 bg-clofas-coral text-white p-3 rounded-full shadow-lg hover:bg-clofas-coral/90 transition-all z-50 animate-fade-in',
        className
      )}
      aria-label="Retourner en haut"
      size="icon"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
};

export default ScrollToTop;
