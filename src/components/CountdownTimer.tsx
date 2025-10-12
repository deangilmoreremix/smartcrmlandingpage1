import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  variant?: 'full' | 'compact';
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete, variant = 'full' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Make sure the target date is correctly interpreted
    const target = new Date(targetDate).getTime();
    
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference <= 0) {
        if (onComplete) onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 p-4">
        <div className="text-center mb-3">
          <div className="text-white/80 text-xs font-semibold mb-1">Webinar Starts In:</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="bg-white/10 rounded-lg py-2 px-1 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-white">{timeLeft.days.toString().padStart(2, '0')}</div>
            </div>
            <div className="text-xs text-white/60 mt-1">Days</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-lg py-2 px-1 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
            </div>
            <div className="text-xs text-white/60 mt-1">Hours</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-lg py-2 px-1 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            </div>
            <div className="text-xs text-white/60 mt-1">Min</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-lg py-2 px-1 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            </div>
            <div className="text-xs text-white/60 mt-1">Sec</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-4 text-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl w-16 h-16 md:w-24 md:h-24 flex items-center justify-center border border-white/20 shadow-lg">
        <span className="text-2xl md:text-4xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs md:text-sm mt-2 text-white/70">{label}</span>
    </div>
  );
};

export default CountdownTimer;