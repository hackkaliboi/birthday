import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TouchFriendlyProps {
  children: ReactNode;
  onTap?: () => void;
  className?: string;
  disabled?: boolean;
}

export const TouchFriendly = ({ 
  children, 
  onTap, 
  className = '', 
  disabled = false 
}: TouchFriendlyProps) => {
  return (
    <motion.div
      className={`touch-manipulation select-none ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onTap={disabled ? undefined : onTap}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30
      }}
      style={{
        // Ensure touch targets are at least 44x44px for accessibility
        minWidth: '44px',
        minHeight: '44px',
        // Prevent text selection on mobile
        WebkitUserSelect: 'none',
        userSelect: 'none',
        // Prevent callouts on iOS
        WebkitTouchCallout: 'none',
        // Improve touch responsiveness
        touchAction: 'manipulation'
      }}
    >
      {children}
    </motion.div>
  );
};
