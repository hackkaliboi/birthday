import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface WishingCoinProps {
  onCoinDrop: () => void;
}

// Floating particle component
const FloatingParticle = ({ delay, duration, index }: { delay: number; duration: number; index: number }) => {
  const colors = ['text-birthday-gold', 'text-birthday-purple', 'text-birthday-pink', 'text-birthday-blue'];
  const emojis = ['✨', '⭐', '💫', '🌟', '✦'];
  
  return (
    <motion.div
      className={`absolute ${colors[index % colors.length]} text-sm`}
      initial={{
        x: Math.random() * 400 - 200,
        y: 100,
        opacity: 0,
        scale: 0.5
      }}
      animate={{
        y: -100,
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1.2, 0.8],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2
      }}
    >
      {emojis[index % emojis.length]}
    </motion.div>
  );
};

export const WishingCoin = ({ onCoinDrop }: WishingCoinProps) => {
  const [isDropping, setIsDropping] = useState(false);
  const [showMagicalEffect, setShowMagicalEffect] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { playSound } = useSoundEffects();

  // Create floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 3
  }));

  const handleCoinClick = () => {
    if (isDropping) return;
    
    playSound('coin');
    setIsDropping(true);
    setShowMagicalEffect(true);
    
    setTimeout(() => {
      onCoinDrop();
    }, 2000); // Extended for more elaborate animation
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-birthday-purple/20 via-birthday-pink/15 to-birthday-blue/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating magical particles */}
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            index={particle.id}
          />
        ))}
        
        {/* Mystical fog effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Enhanced Wishing Well */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Magical aura around well */}
          <motion.div
            className="absolute -inset-8 rounded-full"
            animate={{
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.3)',
                '0 0 60px rgba(59, 130, 246, 0.3)',
                '0 0 20px rgba(168, 85, 247, 0.3)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Well structure with enhanced details */}
          <div className="relative">
            {/* Base stone well */}
            <motion.div 
              className="w-64 h-40 bg-gradient-to-b from-stone-500 via-stone-600 to-stone-800 rounded-2xl relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stone texture overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(0,0,0,0.2)_0%,_transparent_50%)]" />
              </div>
              
              {/* Water surface with enhanced effects */}
              <div className="absolute inset-3 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 rounded-xl overflow-hidden">
                {/* Water shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    transform: ['translateX(-100%)', 'translateX(100%)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                
                {/* Mystical glow in water */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-birthday-gold/30 rounded-full blur-md"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                
                {/* Water ripples when coin drops */}
                <AnimatePresence>
                  {isDropping && (
                    <motion.div className="absolute inset-0">
                      {/* Multiple ripple rings */}
                      {[1, 2, 3, 4].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute top-1/2 left-1/2 border-2 border-birthday-gold/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                          initial={{ width: 0, height: 0, opacity: 0.8 }}
                          animate={{
                            width: [0, 120, 200],
                            height: [0, 120, 200],
                            opacity: [0.8, 0.4, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: ring * 0.1 + 1.0,
                            ease: 'easeOut'
                          }}
                          exit={{ opacity: 0 }}
                        />
                      ))}
                      
                      {/* Splash effect */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                      >
                        <div className="text-4xl">💧</div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Enhanced well rim with magical runes */}
            <motion.div 
              className="absolute -top-3 -left-3 -right-3 h-8 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 rounded-2xl shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(245, 158, 11, 0.5)',
                  '0 0 20px rgba(245, 158, 11, 0.3)',
                  '0 0 10px rgba(245, 158, 11, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Mystical runes on the rim */}
              <div className="absolute inset-0 flex items-center justify-around text-amber-200 text-xs">
                <span>✦</span>
                <span>◆</span>
                <span>✧</span>
                <span>◇</span>
                <span>✦</span>
              </div>
            </motion.div>
            
            {/* Elaborate roof structure */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              {/* Main roof */}
              <motion.div 
                className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[32px] border-l-transparent border-r-transparent border-b-gradient-to-b from-red-600 to-red-800"
                animate={{ rotateZ: [0, 1, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Roof tiles detail */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-red-700 to-red-900 rounded-sm" />
              
              {/* Weather vane */}
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                🐓
              </motion.div>
            </div>
            
            {/* Enhanced support posts with carvings */}
            <motion.div 
              className="absolute -top-12 left-6 w-3 h-16 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-sm shadow-md"
              animate={{ scaleY: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            </motion.div>
            <motion.div 
              className="absolute -top-12 right-6 w-3 h-16 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-sm shadow-md"
              animate={{ scaleY: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            </motion.div>
            
            {/* Chain and bucket */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gray-600"
              animate={{ rotateZ: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 ml-8 w-6 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm"
              animate={{ 
                x: [0, 4, -4, 0],
                rotate: [0, 2, -2, 0] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-1 border border-amber-400 rounded-sm" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Magical Gold Coin */}
        <motion.div
          className="relative cursor-pointer group"
          onClick={handleCoinClick}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          animate={!isDropping ? {
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0]
          } : {
            y: [0, -20, 300],
            rotate: [0, 1440], // 4 full rotations
            scale: [1, 1.1, 0.8]
          }}
          transition={!isDropping ? {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          } : {
            duration: 2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          whileHover={{ scale: 1.15, rotateY: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Magical aura around coin */}
          <motion.div
            className="absolute -inset-4 rounded-full"
            animate={hovering ? {
              background: [
                'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-birthday-gold via-yellow-500 to-yellow-700 border-4 border-yellow-300 shadow-2xl relative overflow-hidden">
            {/* Enhanced coin surface with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-yellow-200/30 to-transparent rounded-full" />
            
            {/* Detailed coin center */}
            <div className="absolute inset-3 border-3 border-yellow-200/60 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-300/20 to-yellow-600/20">
              <motion.div
                className="text-4xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                🌟
              </motion.div>
            </div>
            
            {/* Enhanced sparkle effects */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) + (hovering ? 30 : 0);
              const distance = 45;
              const x = Math.cos(angle * Math.PI / 180) * distance;
              const y = Math.sin(angle * Math.PI / 180) * distance;
              
              return (
                <motion.div
                  key={i}
                  className="absolute text-birthday-gold text-xl"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(${x - 10}px, ${y - 10}px)`
                  }}
                  animate={{
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180, 360],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2
                  }}
                >
                  ✨
                </motion.div>
              );
            })}
            
            {/* Magical trail effect when dropping */}
            <AnimatePresence>
              {isDropping && showMagicalEffect && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-birthday-gold rounded-full"
                      style={{
                        left: '50%',
                        top: '50%'
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, Math.random() * 300],
                        scale: [1, 0],
                        opacity: [1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced instruction text with magical effects */}
        <motion.div
          className="text-center max-w-lg mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-birthday-gold via-birthday-purple to-birthday-pink bg-clip-text text-transparent mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ✨ Make Your Wish ✨
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-foreground/70 font-medium"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Drop the golden coin into the mystical wishing well
          </motion.p>
          
          {hovering && (
            <motion.p
              className="text-sm text-birthday-gold mt-2 font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              ✦ Click to cast your magical wish ✦
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
