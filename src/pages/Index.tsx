import { useState } from 'react';
import { BirthdayGreeting } from '@/components/BirthdayGreeting';
import { WishingCoin } from '@/components/WishingCoin';
import { WishForm } from '@/components/WishForm';
import { SuccessAnimation } from '@/components/SuccessAnimation';

type AppState = 'greeting' | 'coin' | 'form' | 'success';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('greeting');

  const handleGreetingComplete = () => {
    setCurrentState('coin');
  };

  const handleCoinDrop = () => {
    setCurrentState('form');
  };

  const handleFormSuccess = () => {
    setCurrentState('success');
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'greeting':
        return <BirthdayGreeting onAnimationComplete={handleGreetingComplete} />;
      case 'coin':
        return <WishingCoin onCoinDrop={handleCoinDrop} />;
      case 'form':
        return <WishForm onSuccess={handleFormSuccess} />;
      case 'success':
        return <SuccessAnimation />;
      default:
        return <BirthdayGreeting onAnimationComplete={handleGreetingComplete} />;
    }
  };

  return <div className="min-h-screen">{renderCurrentState()}</div>;
};

export default Index;
