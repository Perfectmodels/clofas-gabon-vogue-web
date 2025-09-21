import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ClofasBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'clofas';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ClofasBadge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className 
}: ClofasBadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'badge-success',
    warning: 'badge-warning', 
    error: 'badge-error',
    info: 'badge-info',
    clofas: 'badge-clofas'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <Badge
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Badge>
  );
};

export default ClofasBadge;
