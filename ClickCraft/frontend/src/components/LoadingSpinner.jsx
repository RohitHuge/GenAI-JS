import { useState, useEffect } from 'react';

const LoadingSpinner = ({ messages, currentMessageIndex = 0, title = "Processing..." }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const getStepColor = (step) => {
    return step <= currentStep ? 'bg-neon-orange' : 'bg-dark-border';
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* Title */}
      <h3 className="text-2xl font-bold text-dark-text text-center">
        {title}
      </h3>
      
      {/* Progress Steps */}
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${getStepColor(step)} ${
              step <= currentStep ? 'shadow-[0_0_8px] shadow-neon-orange/60' : ''
            }`}
          />
        ))}
      </div>
      
      {/* Current Message */}
      <div className="text-center">
        <p className="text-lg text-dark-text-secondary font-medium">
          {messages[currentMessageIndex] || messages[messages.length - 1]}
        </p>
      </div>
      
      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dark-border rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-neon-orange rounded-full" />
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 bg-dark-border rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-1000 ease-out bg-neon-orange shadow-[0_0_8px] shadow-neon-orange/60"
          style={{ width: `${((currentMessageIndex + 1) / messages.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
