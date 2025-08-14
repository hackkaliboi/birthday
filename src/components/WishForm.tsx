import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface WishFormProps {
  onSuccess: () => void;
}

export const WishForm = ({ onSuccess }: WishFormProps) => {
  const [websiteIdea, setWebsiteIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playSound } = useSoundEffects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteIdea.trim()) {
      playSound('error');
      toast.error('Please describe your website idea');
      return;
    }

    if (websiteIdea.trim().length < 10) {
      playSound('error');
      toast.error('Please provide more details about your website idea (at least 10 characters)');
      return;
    }

    playSound('click');
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('wishes')
        .insert({
          name: 'Anonymous',
          wish: 'Website Idea Submission',
          site_idea: websiteIdea.trim()
        });

      if (error) {
        throw error;
      }

      playSound('success');
      toast.success('Your website idea has been submitted! 🎉');
      onSuccess();
    } catch (error) {
      console.error('Error saving website idea:', error);
      playSound('error');
      toast.error('Failed to submit your idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-birthday-purple/10 via-birthday-pink/10 to-birthday-blue/10 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-card/95 backdrop-blur-sm rounded-lg shadow-xl border border-border/50 p-6"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-birthday-gold via-birthday-purple to-birthday-pink bg-clip-text text-transparent mb-2">
            Share Your Website Idea! 💻✨
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Tell us about the amazing website you'd like to create
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <label htmlFor="websiteIdea" className="block text-sm font-medium text-foreground mb-3">
              Your Website Idea 🎆
            </label>
            <Textarea
              id="websiteIdea"
              value={websiteIdea}
              onChange={(e) => setWebsiteIdea(e.target.value)}
              placeholder="Describe your amazing website idea... What would it do? Who would use it? What makes it special?"
              disabled={isSubmitting}
              className="w-full min-h-[120px] md:min-h-[140px] resize-none"
              maxLength={1000}
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {websiteIdea.length >= 10 ? '✓' : 'Minimum 10 characters'}
              </span>
              <span className="text-xs text-muted-foreground">
                {websiteIdea.length}/1000
              </span>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-birthday-gold to-birthday-purple hover:from-birthday-gold/90 hover:to-birthday-purple/90 text-white font-medium py-3"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Submitting Idea...
                </>
              ) : (
                'Submit Website Idea 🎆💻'
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Decorative sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-4 right-4 text-birthday-gold text-lg"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-birthday-pink text-lg"
            animate={{
              scale: [1.2, 0.8, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          >
            ✨
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};