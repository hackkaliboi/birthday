import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const SoundControl = () => {
  const { soundEnabled, toggleSound, playSound } = useSoundEffects();

  const handleToggle = () => {
    if (!soundEnabled) {
      playSound('click');
    }
    toggleSound();
  };

  return (
    <motion.div
      className="fixed top-4 left-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2 }}
    >
      <Button
        onClick={handleToggle}
        size="sm"
        variant="secondary"
        className="backdrop-blur-sm bg-card/90 border border-border/50 shadow-lg"
        title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
      >
        <motion.div
          animate={{ scale: soundEnabled ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
};
