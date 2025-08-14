import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'birthday' | 'ocean' | 'forest' | 'sunset' | 'galaxy';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Record<Theme, {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    emoji: string;
  }>;
}

const themes = {
  birthday: {
    name: 'Birthday Celebration',
    colors: {
      primary: 'from-birthday-gold to-birthday-purple',
      secondary: 'from-birthday-pink to-birthday-blue',
      accent: 'birthday-gold',
      background: 'from-birthday-purple/20 via-birthday-pink/20 to-birthday-blue/20'
    },
    emoji: '🎂'
  },
  ocean: {
    name: 'Ocean Breeze',
    colors: {
      primary: 'from-blue-400 to-cyan-500',
      secondary: 'from-teal-400 to-blue-600',
      accent: 'blue-400',
      background: 'from-blue-400/20 via-cyan-400/20 to-teal-400/20'
    },
    emoji: '🌊'
  },
  forest: {
    name: 'Enchanted Forest',
    colors: {
      primary: 'from-green-400 to-emerald-500',
      secondary: 'from-lime-400 to-green-600',
      accent: 'green-400',
      background: 'from-green-400/20 via-emerald-400/20 to-lime-400/20'
    },
    emoji: '🌲'
  },
  sunset: {
    name: 'Golden Sunset',
    colors: {
      primary: 'from-orange-400 to-red-500',
      secondary: 'from-yellow-400 to-orange-600',
      accent: 'orange-400',
      background: 'from-orange-400/20 via-red-400/20 to-yellow-400/20'
    },
    emoji: '🌅'
  },
  galaxy: {
    name: 'Cosmic Galaxy',
    colors: {
      primary: 'from-purple-400 to-indigo-500',
      secondary: 'from-pink-400 to-purple-600',
      accent: 'purple-400',
      background: 'from-purple-400/20 via-indigo-400/20 to-pink-400/20'
    },
    emoji: '🌌'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('birthday');

  useEffect(() => {
    const savedTheme = localStorage.getItem('birthday-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('birthday-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
