import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WishFormProps {
  onSuccess: () => void;
}

export const WishForm = ({ onSuccess }: WishFormProps) => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [siteIdea, setSiteIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !wish.trim() || !siteIdea.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('wishes')
        .insert({
          name: name.trim(),
          wish: wish.trim(),
          site_idea: siteIdea.trim()
        });

      if (error) {
        throw error;
      }

      toast.success('Your wish has been saved! 🎉');
      onSuccess();
    } catch (error) {
      console.error('Error saving wish:', error);
      toast.error('Failed to save your wish. Please try again.');
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-birthday-gold via-birthday-purple to-birthday-pink bg-clip-text text-transparent mb-2">
            Make a Birthday Wish! 🌟
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter your website idea and it will be delivered as a birthday wish
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="wish" className="block text-sm font-medium text-foreground mb-2">
              Birthday Wish
            </label>
            <Textarea
              id="wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="What's your birthday wish for your mentor?"
              disabled={isSubmitting}
              className="w-full min-h-[80px]"
            />
          </div>

          <div>
            <label htmlFor="siteIdea" className="block text-sm font-medium text-foreground mb-2">
              Website Idea
            </label>
            <Textarea
              id="siteIdea"
              value={siteIdea}
              onChange={(e) => setSiteIdea(e.target.value)}
              placeholder="Describe your website idea that you'd like to build..."
              disabled={isSubmitting}
              className="w-full min-h-[100px]"
            />
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
                  Sending Wish...
                </>
              ) : (
                'Submit Birthday Wish 🎂'
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