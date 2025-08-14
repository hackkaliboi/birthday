import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

export const ThemeSelector = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="secondary"
          className="backdrop-blur-sm bg-card/90 border border-border/50 shadow-lg"
        >
          <Palette className="w-4 h-4 mr-2" />
          {themes[theme].emoji} Themes
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-12 right-0 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-xl p-4 min-w-[200px]"
          >
            <h3 className="text-sm font-medium text-foreground mb-3">Choose Theme</h3>
            <div className="space-y-2">
              {Object.entries(themes).map(([key, themeData]) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    setTheme(key as any);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                    theme === key
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">{themeData.emoji}</span>
                  {themeData.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
