import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BirthdayGreetingProps {
  onAnimationComplete: () => void;
}

export const BirthdayGreeting = ({ onAnimationComplete }: BirthdayGreetingProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-2 h-2 ${
        i % 4 === 0 ? 'bg-birthday-gold' :
        i % 4 === 1 ? 'bg-birthday-purple' :
        i % 4 === 2 ? 'bg-birthday-pink' : 'bg-birthday-blue'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
      animate={{
        y: ['0vh', '100vh'],
        rotate: [0, 360],
        opacity: [1, 0]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 3,
        ease: 'linear',
        repeat: Infinity
      }}
    />
  ));

  // Generate balloons
  const balloons = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-12 h-16 rounded-full ${
        i % 4 === 0 ? 'bg-birthday-gold' :
        i % 4 === 1 ? 'bg-birthday-purple' :
        i % 4 === 2 ? 'bg-birthday-pink' : 'bg-birthday-blue'
      }`}
      style={{
        left: `${10 + (i * 10)}%`,
        bottom: '10%',
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: 3,
        delay: i * 0.2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Balloon string */}
      <div className="absolute top-full left-1/2 w-0.5 h-20 bg-foreground/30 transform -translate-x-1/2" />
    </motion.div>
  ));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-birthday-purple/20 via-birthday-pink/20 to-birthday-blue/20 flex items-center justify-center overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces}
        </div>
      )}

      {/* Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons}
      </div>

      {/* Main greeting */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-birthday-gold via-birthday-purple to-birthday-pink bg-clip-text text-transparent mb-4"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          Happy Birthday!
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-3xl text-foreground/80 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          🎉 Hope your special day is magical! 🎉
        </motion.p>
      </motion.div>
    </div>
  );
};