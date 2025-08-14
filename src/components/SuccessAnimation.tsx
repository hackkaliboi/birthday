import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const SuccessAnimation = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    setShowFireworks(true);
    playSound('confetti');
    
    // Play additional celebration sound after a delay
    setTimeout(() => playSound('sparkle'), 1000);
  }, [playSound]);

  // Generate firework bursts
  const fireworks = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-3 h-3 rounded-full ${
        i % 4 === 0 ? 'bg-birthday-gold' :
        i % 4 === 1 ? 'bg-birthday-purple' :
        i % 4 === 2 ? 'bg-birthday-pink' : 'bg-birthday-blue'
      }`}
      style={{
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: [0, (Math.random() - 0.5) * 200],
        y: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration: 2,
        delay: Math.random() * 2,
        repeat: Infinity,
        repeatDelay: 1 + Math.random() * 2
      }}
    />
  ));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-birthday-purple/20 via-birthday-pink/20 to-birthday-blue/20 flex items-center justify-center">
      {/* Fireworks */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {fireworks}
        </div>
      )}

      {/* Success message */}
      <motion.div
        className="text-center z-10 max-w-md px-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🎉
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-birthday-gold via-birthday-purple to-birthday-pink bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Website Idea Submitted! 🚀
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-foreground/80 mb-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Thank you for sharing your amazing website idea! Your creativity helps make birthdays even more special! 🌟💻
        </motion.p>

        <motion.div
          className="flex justify-center space-x-4 text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0
            }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3
            }}
          >
            🎈
          </motion.span>
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6
            }}
          >
            🎁
          </motion.span>
        </motion.div>

        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};