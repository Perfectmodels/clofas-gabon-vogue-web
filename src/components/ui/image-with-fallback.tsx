
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "bg-gray-100 flex items-center justify-center" 
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <div className={`${className} ${fallbackClassName}`}>
      <ImageOff className="h-8 w-8 text-gray-400" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageWithFallback;
