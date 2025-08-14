import { useCallback, useRef, useState } from 'react';

type SoundType = 'click' | 'success' | 'error' | 'coin' | 'confetti' | 'sparkle';

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('birthday-sound');
    return saved !== 'false';
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context on first interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && soundEnabled) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [soundEnabled]);

  // Generate different sound effects using Web Audio API
  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabled) return;
    
    initAudioContext();
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sound configurations
    const soundConfig = {
      click: {
        frequency: 800,
        duration: 0.1,
        type: 'square' as OscillatorType,
        volume: 0.3
      },
      success: {
        frequency: [523, 659, 784], // C, E, G major chord
        duration: 0.6,
        type: 'sine' as OscillatorType,
        volume: 0.4
      },
      error: {
        frequency: 200,
        duration: 0.3,
        type: 'sawtooth' as OscillatorType,
        volume: 0.2
      },
      coin: {
        frequency: [880, 1047], // A, C
        duration: 0.4,
        type: 'sine' as OscillatorType,
        volume: 0.5
      },
      confetti: {
        frequency: [1047, 1319, 1568], // C, E, G (high octave)
        duration: 0.8,
        type: 'sine' as OscillatorType,
        volume: 0.3
      },
      sparkle: {
        frequency: 2093, // Very high C
        duration: 0.2,
        type: 'sine' as OscillatorType,
        volume: 0.2
      }
    };

    const config = soundConfig[type];
    const frequencies = Array.isArray(config.frequency) ? config.frequency : [config.frequency];

    frequencies.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.type = config.type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
      
      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(config.volume, audioContext.currentTime + index * 0.1 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + index * 0.1 + config.duration);
      
      osc.start(audioContext.currentTime + index * 0.1);
      osc.stop(audioContext.currentTime + index * 0.1 + config.duration);
    });
  }, [soundEnabled, initAudioContext]);

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('birthday-sound', String(newState));
    
    // Play a test sound when enabling
    if (newState) {
      setTimeout(() => playSound('click'), 100);
    }
  }, [soundEnabled, playSound]);

  return {
    soundEnabled,
    toggleSound,
    playSound
  };
};
