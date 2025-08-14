import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface WishingCoinProps {
  onCoinDrop: () => void;
}

export const WishingCoin = ({ onCoinDrop }: WishingCoinProps) => {
  const [isDropping, setIsDropping] = useState(false);
  const { playSound } = useSoundEffects();

  const handleCoinClick = () => {
    if (isDropping) return;
    
    playSound('coin');
    setIsDropping(true);
    setTimeout(() => {
      onCoinDrop();
    }, 1500); // Wait for animation to finish
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-birthday-purple/10 via-birthday-pink/10 to-birthday-blue/10 flex flex-col items-center justify-center">
      {/* Wishing Well */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Well base */}
        <div className="w-48 h-32 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg relative overflow-hidden">
          <div className="absolute inset-2 bg-gradient-to-b from-blue-900 to-blue-950 rounded-lg" />
          {/* Water ripples */}
          {isDropping && (
            <motion.div
              className="absolute inset-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-birthday-gold rounded-full transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 4],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  ease: 'easeOut'
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-birthday-gold rounded-full transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 6],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.4,
                  ease: 'easeOut'
                }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Well rim */}
        <div className="absolute -top-2 -left-2 -right-2 h-6 bg-gradient-to-b from-stone-400 to-stone-600 rounded-lg" />
        
        {/* Well roof */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[24px] border-r-[24px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-700" />
        
        {/* Support posts */}
        <div className="absolute -top-6 left-4 w-2 h-8 bg-gradient-to-b from-amber-700 to-amber-900" />
        <div className="absolute -top-6 right-4 w-2 h-8 bg-gradient-to-b from-amber-700 to-amber-900" />
      </motion.div>

      {/* Gold Coin */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleCoinClick}
        animate={!isDropping ? {
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        } : {
          y: [0, 200],
          rotate: [0, 720]
        }}
        transition={!isDropping ? {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {
          duration: 1.5,
          ease: 'easeIn'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-birthday-gold to-yellow-600 border-4 border-yellow-400 shadow-lg relative overflow-hidden">
          {/* Coin shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full" />
          {/* Coin pattern */}
          <div className="absolute inset-2 border-2 border-yellow-300/50 rounded-full flex items-center justify-center">
            <span className="text-yellow-100 text-2xl font-bold">💫</span>
          </div>
          {/* Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2 text-birthday-gold text-lg"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2 text-birthday-purple text-lg"
            animate={{
              scale: [1.2, 0.8, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            ✨
          </motion.div>
        </div>
      </motion.div>

      {/* Instruction text */}
      <motion.p
        className="text-xl md:text-2xl text-foreground/80 text-center max-w-md font-medium mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Drop me into the wishing well to continue
      </motion.p>
    </div>
  );
};