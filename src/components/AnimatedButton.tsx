
import React from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'scale' | 'pulse' | 'slide' | 'glow' | 'none';
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animationType = 'none', children, ...props }, ref) => {
    const getAnimationClass = () => {
      switch (animationType) {
        case 'scale':
          return 'transition-transform hover:scale-105 active:scale-95';
        case 'pulse':
          return 'hover:animate-pulse';
        case 'slide':
          return 'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:animate-[slide_0.5s_forwards]';
        case 'glow':
          return 'transition-shadow hover:shadow-[0_0_10px_rgba(254,58,74,0.7)]';
        default:
          return '';
      }
    };

    return (
      <Button
        className={cn(getAnimationClass(), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };

// Add this to index.css or create a new file for animations
// @keyframes slide {
//   100% {
//     transform: translateX(100%);
//   }
// }
